import "./App.sass";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import Spinner from "./utils/Spinner";
import ProtectedRoutes from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useStateValue } from "./state/StateProvider";

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
