import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppLayout from "../App/index.layout";

function EmployeePublicLayout() {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState("");

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  return (
    <>
      <main className="nk-body npc-default pg-auth">
        <div className="nk-app-root">
          <div className="nk-main">
            <div className="nk-wrap nk-wrap-nosidebar">
              <div className="nk-content">
                <AppLayout setRedirectPath={setRedirectPath}>
                  <Outlet />
                </AppLayout>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EmployeePublicLayout;
