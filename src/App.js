import { React, useEffect, useState } from "react";

import { AuthenticatedApp } from "./routes/authenticated-app";
import { UnauthenticatedApp } from "./routes/unauthenticated-app";

import "./App.css";

const App = () => {
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(
        localStorage.getItem("hs-auth-token")
    );

    useEffect(() => {
        window.addEventListener("storage", () => {
            setUserIsAuthenticated(localStorage.getItem("hs-auth-token"));
        });
    }, []);

    return userIsAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
