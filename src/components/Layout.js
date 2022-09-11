import React from "react";
import { useStateValue } from "../state/StateProvider";
import ProfileModal from "./ProfileModal";

const Layout = ({ children }) => {
	const [{ user }] = useStateValue();

	return (
		<div>
			{user && <ProfileModal />}
			<div>{children}</div>
		</div>
	);
};

export default Layout;
