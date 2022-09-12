import "./App.sass";
import { useEffect, useState } from "react";
import Spinner from "./utils/Spinner";
import { ProtectedOfficeRoutes, ProtectedUserRoutes } from "./protected.routes";
import PublicRoutes, { PUBLIC_ROUTES } from "./public.routes";
import { useStateValue } from "./state/StateProvider";
import Layout from "./components/Layout";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { SET_USER } from "./state/Constants";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const [{ user }, action] = useStateValue();
	const [mother_state, action_mother] = useStateValue();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => console.log(mother_state), [mother_state]);

	useEffect(() => {
		//check if user exists
		auth.onAuthStateChanged(async (userCredenetials) => {
			if (userCredenetials) {
				setLoading(true);
				const userData = (
					await getDoc(doc(db, "members", userCredenetials.uid))
				).data();

				console.log(userData);

				action({ type: SET_USER, payload: { user: userData } });
				if (
					location.pathname === "/" ||
					location.pathname === "/register" ||
					location.pathname === "/register/staff"
				)
					navigate("/dashboard");
			} else {
				console.log(location.pathname);
				action({ type: SET_USER, payload: { user: null } });
				if (!PUBLIC_ROUTES.includes(location.pathname)) navigate("/");
			}
			setLoading(false);
		});
	}, []);

	return (
		<Layout>
			{loading ? (
				<Spinner />
			) : (
				<>
					{user ? (
						user.type === "official" ? (
							<ProtectedOfficeRoutes />
						) : (
							<ProtectedUserRoutes />
						)
					) : null}
					<PublicRoutes />
				</>
			)}
		</Layout>
	);
}

export default App;
