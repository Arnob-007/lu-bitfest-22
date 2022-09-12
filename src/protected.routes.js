import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./utils/Spinner";

const Profile = React.lazy(() => import("./pages/Profile"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Live = React.lazy(() => import("./pages/Live"));
const Simulation = React.lazy(() => import("./pages/Simulation"));

const ProtectedRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/simulation' element={<Simulation />} />
				<Route path='/live' element={<Live />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
		</Suspense>
	);
};

export const PROTECTED_ROUTES = ["/profile", "/dashboard"];

export default ProtectedRoutes;
