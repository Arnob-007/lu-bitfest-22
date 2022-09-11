import "./App.sass";
import { useEffect, useState } from "react";
import Spinner from "./utils/Spinner";
import ProtectedRoutes from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useStateValue } from "./state/StateProvider";
import Layout from "./components/Layout";

function App() {
	const [loading, setLoading] = useState(true);
	const [{ user }, action] = useStateValue();

	useEffect(() => {
		//check if user exists
		setLoading(false);
	}, []);

	return (
		<Layout>
			{loading ? (
				<Spinner />
			) : (
				<>
					{user && <ProtectedRoutes />}
					<PublicRoutes />
				</>
			)}
		</Layout>
	);
}

export default App;
