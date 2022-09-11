import { Button } from "antd";
import React from "react";
import { auth } from "../firebase";

const Profile = () => {
	return (
		<div>
			<Button type='primary' onClick={() => auth.signOut()}>
				Log out
			</Button>
		</div>
	);
};

export default Profile;
