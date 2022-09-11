import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./utils/Spinner";

const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));

const PublicRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route index element={<Register />} />
			</Routes>
		</Suspense>
	);
};

export const PUBLIC_ROUTES = ["/login", "/"];

export default PublicRoutes;
