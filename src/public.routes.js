import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./utils/Spinner";

const OfficeRegister = React.lazy(() => import("./pages/OfficeRegister"));
const ConsumerRegister = React.lazy(() => import("./pages/ConsumerRegister"));
const Login = React.lazy(() => import("./pages/Login"));

const PublicRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/register/staff' element={<OfficeRegister />} />
				<Route path='/register' element={<ConsumerRegister />} />
				<Route path='/' element={<Login />} />
			</Routes>
		</Suspense>
	);
};

export const PUBLIC_ROUTES = ["/", "/register", "/register/staff", "/leaflet"];

export default PublicRoutes;
