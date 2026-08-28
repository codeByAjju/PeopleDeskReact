import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import './App.css'
import './index.css'
import { AdminSidebar, Navbar } from "./components";

import { Unknown } from "./components";
import { routes } from "./route/index";
import { Suspense } from "react";
import { Toaster } from "./components/UiElement/Toaster";

function RouteLayout({ path }) {
    const element = useRoutes(path);
    if (!element) {
        return <Unknown />;
    }
    return element;
}
function App() {

    return <>
        <Suspense fallback={<div className="js-preloader"><div className="loading-animation tri-ring"></div></div>}>
            <Router>
                <div className="App">
                    <RouteLayout path={routes()} />
                </div>
            </Router>
            <Toaster />
        </Suspense>
    </>
}

export default App
