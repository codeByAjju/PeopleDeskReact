import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../App/index.layout";
import { AdminSidebar, UserNavbar, UserSidebar} from "../../components";
import { useEffect, useState } from "react";

function PrivateLayout() {
  const [redirectPath, setRedirectPath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  return (
    <AppLayout setRedirectPath={setRedirectPath} >
      <main className="nk-body bg-lighter npc-default has-sidebar">
        <div className="nk-app-root">
          <div className="nk-main">
            <div className="admin-shell">
              <div className="sidebar-backdrop" data-sidebar-close></div>
              <UserSidebar />
              <div className="admin-main">
                <UserNavbar />
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default PrivateLayout;
