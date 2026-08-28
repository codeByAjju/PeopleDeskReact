import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppLayout from "../App/index.layout";

function PublicLayout() {
    const [redirectPath, setRedirectPath] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath, { replace: true });
        }
    }, [navigate, redirectPath]);

    return <>
        <AppLayout setRedirectPath={setRedirectPath}>
            <Outlet />
        </AppLayout>
    </>
}

export default PublicLayout;
