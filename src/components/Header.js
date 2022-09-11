import { Dropdown, Menu } from "antd";
import React from "react";
import { auth } from "../firebase";
import { useStateValue } from "../state/StateProvider";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const [{ user }] = useStateValue();
	const navigate = useNavigate();

	const handleLogout = () => {
		auth.signOut();
		navigate("/");
	};

	return <div></div>;
};

export default Header;
