import React, { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import App from "./components/App";

function Main() {
    return (
        <App />
    )
}

const root = createRoot(document.getElementById("root"));
root.render(
<StrictMode>
    <Main />
</StrictMode>);
