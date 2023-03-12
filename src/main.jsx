/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

//  https://forum.freecodecamp.org/t/react-18-destroys-25-5-clock-tests-front-end-development-libraries-projects-build-a-25-5-clock/528192
//  Known issue with React 18 and ReactDOM.createRoot with this specific project, need to use the following instead:
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
