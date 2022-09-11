import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/antd.css";
import "./index.sass";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./state/StateProvider";
import reducer, { initialState } from "./state/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<Router>
				<App />
			</Router>
		</StateProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
