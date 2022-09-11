import React from "react";
import { Link } from "react-router-dom";
import ConsumerRegistrationForm from "../components/ConsumerRegistrationForm";

const ConsumerRegister = () => {
	return (
		<div className='flex w-full h-full min-h-screen'>
			<div className='shadow mx-auto my-auto w-9/12 flex rounded justify-center'>
				<div className='flex flex-col justify-center items-center bg-primary px-3 py-5 rounded-l w-6/12 text-center'>
					<h1 className='text-white font-bold'>Pickme</h1>
					<div className='text-white'>
						Register as a consumer (ie: student, teacher, staff)
					</div>
				</div>
				<div className='border-solid border-primary rounded-r py-20 px-8 w-6/12'>
					<h2 className='text-primary text-center mb-12'>Welcome!</h2>
					<ConsumerRegistrationForm />
					<div className='mt-2 text-xs text-center'>
						Already have an account?{" "}
						<Link to='/' className='cursor-pointer underline text-primary'>
							Log in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConsumerRegister;
