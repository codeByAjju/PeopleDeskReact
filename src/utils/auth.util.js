import { baseRoutes } from "../helpers/baseRoutes";
import { GetLocalStorageToken } from "./common.util";

/**
 * Normalize role so that:
 * Admin / ADMIN / admin => admin
 * User / USER / user    => user
 */
const normalizeRole = (role) => {
  if (!role) return null;

  const normalizedRole = String(role).trim().toLowerCase();

  if (normalizedRole === "admin") return "admin";
  if (normalizedRole === "user") return "user";

  return null;
};

/**
 * Check whether the current user is authorized
 * to access the requested route.
 *
 * Route configuration expected:
 *
 * {
 *   path: "/admin/dashboard",
 *   private: true,
 *   adminAccess: true,
 *   commonRoute: false
 * }
 *
 * OR
 *
 * {
 *   path: "/user/dashboard",
 *   private: true,
 *   adminAccess: false,
 *   commonRoute: true
 * }
 */
const authDriver = (route, userData, pathname) => {
  try {
    if (!route) {
      return false;
    }

    const token = GetLocalStorageToken();

    /**
     * Normalize current user role.
     *
     * Your actual userData is:
     *
     * userData.role = "admin"
     */
    const role = normalizeRole(userData?.role);

    /**
     * Determine whether current URL belongs
     * to admin section.
     */
    const adminBaseRoute =
      baseRoutes?.adminBaseRoute?.replace(/^\/+/, "") || "";

    const isAdminPath =
      adminBaseRoute &&
      pathname?.replace(/^\/+/, "").startsWith(adminBaseRoute);

    /**
     * =========================================================
     * NOT LOGGED IN
     * =========================================================
     */
    if (!token || !role) {
      /**
       * Public route:
       * Login, forgot password, signup etc.
       */
      if (route.private === false) {
        return true;
      }

      /**
       * Private route:
       * User is not authenticated.
       */
      return false;
    }

    /**
     * =========================================================
     * LOGGED IN USER
     * =========================================================
     */
    if (role === "user") {
      /**
       * User should NEVER access admin routes.
       */
      if (isAdminPath || route.adminAccess === true) {
        return false;
      }

      /**
       * User should NOT access public authentication pages
       * such as /login once already authenticated.
       *
       * commonRoute = true means route belongs to
       * normal/user application.
       */
      if (route.private === false) {
        return false;
      }

      /**
       * User can access only user/private routes.
       */
      if (route.commonRoute === true) {
        return true;
      }

      return false;
    }

    /**
     * =========================================================
     * LOGGED IN ADMIN / SUPER ADMIN
     * =========================================================
     */
    if (role === "admin") {
      /**
       * Admin should NEVER access normal user routes.
       */
      if (route.commonRoute === true && route.adminAccess !== true) {
        return false;
      }

      /**
       * Admin should NOT access public authentication pages
       * such as /login once already authenticated.
       */
      if (route.private === false) {
        return false;
      }

      /**
       * Admin can access only admin routes.
       */
      if (route.adminAccess === true) {
        return true;
      }

      return false;
    }

    /**
     * Unknown role
     */
    return false;
  } catch (error) {
    console.error("authDriver error:", error);
    return false;
  }
};

export default authDriver;