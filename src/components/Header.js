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

	return (
		<div className='flex justify-between items-center px-6 py-1 header fixed w-full h-[50px] z-50 bg-white'>
			<div className='flex gap-1 items-center'>
				{/* <img className='w-5' src={Logo} alt='baton-logo' /> */}
				<h1 className='logo_text mb-0'>Pickme</h1>
			</div>
			<div className='flex gap-6 items-center'>
				{/* {user && !user?.plan && (
					<div className='px-6 py-2 bg-blue-50 flex gap-14 text-primary rounded'>
						<span>
							You have{" "}
							{3 - batons.filter((b) => b.createdBy._id === user._id).length}{" "}
							batons left.{" "}
						</span>
						<Link to='/settings/subscriptions' className='underline font-bold'>
							Upgrade now
						</Link>
					</div>
				)} */}
				{user && (
					<div>
						<Dropdown
							overlay={
								<Menu
									items={[
										{
											key: "1",
											label: "Profile",
											icon: <UserOutlined />,
											onClick: () => navigate("/settings/my-account"),
										},
										{
											key: "2",
											danger: true,
											label: "Logout",
											onClick: handleLogout,
											icon: <LogoutOutlined color='red' />,
										},
									]}
								/>
							}
							placement='bottom'
						>
							<div className='flex gap-3 cursor-pointer px-2 mr-2'>
								<span className='font-semibold'>
									{auth?.currentUser?.displayName || "Hi, user"}
								</span>
								<UserOutlined />
								<DownOutlined />
							</div>
						</Dropdown>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
