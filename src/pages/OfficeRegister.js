import React from "react";
import OfficeRegisterForm from "../components/OfficeRegisterForm";

const OfficeRegister = () => {
	return (
		<div className='flex w-full h-full min-h-screen'>
			<div className='shadow mx-auto my-auto w-8/12 flex rounded justify-center'>
				<div className='flex flex-col justify-center items-center bg-primary px-3 py-5 rounded-l w-6/12 text-center'>
					<h1 className='text-white font-bold'>Pickme</h1>
					<div className='text-white'>
						Register as a Transport Dept. official
					</div>
				</div>
				<div className='border-solid border-primary rounded-r py-20 px-24 w-6/12'>
					<h2 className='text-primary text-center mb-12'>Welcome!</h2>
					<OfficeRegisterForm />
				</div>
			</div>
		</div>
	);
};

export default OfficeRegister;
