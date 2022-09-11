import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./utils/Spinner";

const Profile = React.lazy(() => import("./pages/Profile"));

const ProtectedRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/profile' element={<Profile />} />
			</Routes>
		</Suspense>
	);
};

export const PROTECTED_ROUTES = ["/profile"];

export default ProtectedRoutes;
