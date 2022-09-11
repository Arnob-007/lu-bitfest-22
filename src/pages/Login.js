import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
	return (
		<div className='flex w-full h-full min-h-screen'>
			<div className='shadow mx-auto my-auto w-8/12 flex rounded justify-center'>
				<div className='flex flex-col justify-center items-center bg-primary px-3 py-5 rounded-l w-6/12 text-center'>
					<h1 className='text-white font-bold'>Pickme</h1>
					<div className='text-white'>Manage your transportation</div>
				</div>
				<div className='py-20 px-24 w-6/12 text-center border-solid border-primary rounded-r'>
					<h2 className='text-primary '>Welcome back!</h2>
					<div className='mb-12'>Please sign into your account</div>
					<LoginForm />
					<div className='mt-2 text-xs'>
						Don't have an account?{" "}
						<Link
							to='register'
							className='cursor-pointer underline text-primary'
						>
							Register
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
