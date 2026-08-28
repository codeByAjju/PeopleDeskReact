import { Outlet, useNavigate } from "react-router-dom";
import AppLayout from "../App/index.layout";
import { useEffect, useState } from "react";
import { AdminSidebar, Navbar } from "../../components";

function SuperAdminPrivateLayout() {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState("");

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  return (
    <>
      <AppLayout setRedirectPath={setRedirectPath} >
        <main className="nk-body bg-lighter npc-default has-sidebar">
          <div className="nk-app-root">
            <div className="nk-main">
              <div className="admin-shell">
                <div className="sidebar-backdrop" data-sidebar-close></div>
                <AdminSidebar />
                <div className="admin-main">
                  <Navbar />
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </>
  );
}

export default SuperAdminPrivateLayout;
