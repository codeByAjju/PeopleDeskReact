import PropTypes from "prop-types";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import {
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";

import { baseRoutes } from "../../helpers/baseRoutes";
import { getUserAuthData } from "../../redux/AuthSlice";
import { getCompletePathList } from "../../route";

import authDriver from "../../utils/auth.util";
import logger from "../../utils/logger";

import userAccessRoute from "../../routeControl/userRoutMap";
import SuperAdminAccessRoute from "../../routeControl/superAdminRoutMap";
import EmployeeAccessRoute from "../../routeControl/employeeRoutMap";

const roleRedirectMap = {
  admin: SuperAdminAccessRoute.DASHBOARD.path,
  employee: EmployeeAccessRoute.EMPLOYEE_DASHBOARD.path,
  user: userAccessRoute.DASHBOARD.path,
};

function AppLayout({ setRedirectPath, children }) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const userData = useSelector(getUserAuthData);
  const role = userData?.role?.toLowerCase() || null;

  /**
   * ---------------------------------------------------------
   * Find active route (memoized across location & params)
   * ---------------------------------------------------------
   */
  const activeRoute = useMemo(() => {
    const completePaths = getCompletePathList();
    return completePaths.find((route) => {
      if (!route?.key) {
        return false;
      }

      try {
        let generatedPath = route.key;
        try {
          generatedPath = generatePath(route.key, params);
        } catch (err) {
          logger(err);
          generatedPath = route.key;
        }

        if (generatedPath === location.pathname) {
          return true;
        }

        return Boolean(
          matchPath(
            {
              path: route.key,
              end: true,
            },
            location.pathname
          )
        );
      } catch (error) {
        logger(error);
        return false;
      }
    });
  }, [location.pathname, params]);

  const isPrivate = activeRoute?.private;

  const isValid = useMemo(() => {
    return authDriver(activeRoute, userData, location.pathname);
  }, [activeRoute, userData, location.pathname]);

  const isAdminRoute = useMemo(() => {
    return (
      activeRoute?.adminAccess === true ||
      location.pathname
        .replace(/^\/+/, "")
        .startsWith(baseRoutes.superAdminBaseRoute.replace(/^\/+/, ""))
    );
  }, [activeRoute, location.pathname]);

  const isEmployeeRoute = useMemo(() => {
    return (
      activeRoute?.employeeAccess === true ||
      location.pathname
        .replace(/^\/+/, "")
        .startsWith(baseRoutes.employeeBaseRoute.replace(/^\/+/, ""))
    );
  }, [activeRoute, location.pathname]);

  // Guard against duplicate toast/redirect execution on re-renders & React StrictMode
  const redirectedRef = useRef(null);

  useEffect(() => {
    if (!activeRoute) {
      return;
    }

    if (isValid) {
      redirectedRef.current = null;
      return;
    }

    const currentKey = `${location.pathname}_${role}_${userData?.token ? "auth" : "unauth"}`;
    if (redirectedRef.current === currentKey) {
      return;
    }
    redirectedRef.current = currentKey;

    /**
     * Logged-in user/admin trying to access unauthorized route
     */
    if (userData?.token && role && roleRedirectMap[role]) {
      // Admin trying to access user or employee route
      if (
        role === "admin" &&
        activeRoute?.commonRoute === true &&
        activeRoute?.adminAccess !== true
      ) {
        toast.warning("You are not authorized to access this page.", {
          toastId: "unauthorized-access",
        });

        const target = roleRedirectMap.admin;
        if (typeof setRedirectPath === "function") {
          setRedirectPath(target);
        }
        navigate(target, { replace: true });
        return;
      }

      // User trying to access admin or employee route
      if (
        role === "user" &&
        (activeRoute?.adminAccess === true || activeRoute?.employeeAccess === true)
      ) {
        toast.warning("You are not authorized to access this page.", {
          toastId: "unauthorized-access",
        });

        const target = roleRedirectMap.user;
        if (typeof setRedirectPath === "function") {
          setRedirectPath(target);
        }
        navigate(target, { replace: true });
        return;
      }

      // Employee trying to access admin or user route
      if (
        role === "employee" &&
        (activeRoute?.adminAccess === true ||
          (activeRoute?.commonRoute === true && activeRoute?.employeeAccess !== true))
      ) {
        toast.warning("You are not authorized to access this page.", {
          toastId: "unauthorized-access",
        });

        const target = roleRedirectMap.employee;
        if (typeof setRedirectPath === "function") {
          setRedirectPath(target);
        }
        navigate(target, { replace: true });
        return;
      }

      // Logged-in user trying to access login/public page
      if (activeRoute?.private === false) {
        const target = roleRedirectMap[role];
        if (typeof setRedirectPath === "function") {
          setRedirectPath(target);
        }
        navigate(target, { replace: true });
        return;
      }

      // Any other unauthorized private route
      const target = roleRedirectMap[role];
      if (typeof setRedirectPath === "function") {
        setRedirectPath(target);
      }
      navigate(target, { replace: true });
      return;
    }

    /**
     * User is NOT logged in and trying to access private route
     */
    if (isPrivate === true) {
      toast.warning("Please login to continue.", {
        toastId: "login-required",
      });

      let target;
      if (isAdminRoute) {
        target = SuperAdminAccessRoute.LOGIN.path;
      } else if (isEmployeeRoute) {
        target = EmployeeAccessRoute.EMPLOYEE_PUBLIC_HOMEPAGE.path;
      } else {
        target = userAccessRoute.LOGIN.path;
      }

      if (typeof setRedirectPath === "function") {
        setRedirectPath(target);
      }
      navigate(target, { replace: true });
    }
  }, [
    activeRoute,
    isAdminRoute,
    isEmployeeRoute,
    isPrivate,
    isValid,
    location.pathname,
    navigate,
    role,
    setRedirectPath,
    userData?.token,
  ]);

  /**
   * Render only authorized routes
   */
  return <>{isValid ? children : null}</>;
}

AppLayout.propTypes = {
  setRedirectPath: PropTypes.func,
  children: PropTypes.node,
};

export default AppLayout;
