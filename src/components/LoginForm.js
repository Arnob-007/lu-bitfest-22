import { Button, Form, Input, message } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const [codeSent, setCodeSent] = useState(false);
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const handleSignIn = async () => {
		const { phone } = form.getFieldsValue();
		if (!phone || phone.length !== 10) {
			message.error("Invalid contact number");
			return;
		}
		const phoneNumber = "+880" + phone;
		const appVerifier = window.recaptchaVerifier;
		try {
			setLoading(true);
			const confirmationResult = await signInWithPhoneNumber(
				auth,
				phoneNumber,
				appVerifier
			);
			window.confirmationResult = confirmationResult;
			console.log(confirmationResult);
			setCodeSent(true);
		} catch (e) {
			message.error("Something went wrong");
			console.log(e);
		} finally {
			setLoading(false);
		}
	};
	const handleConfirm = async () => {
		const { otp } = form.getFieldsValue();
		if (!otp) return;

		try {
			setLoading(true);
			const result = await window.confirmationResult.confirm(otp);
			if (result._tokenResponse.isNewUser) {
				await auth.currentUser.delete();
				message.error("User not registered!");
				navigate("/register");
			}
		} catch (e) {
			console.log(e);
			message.error("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			"sign-in-button",
			{
				size: "invisible",
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					handleSignIn();
				},
			},
			auth
		);
	}, []);

	return (
		<div>
			<Form
				name='loginForm'
				form={form}
				onFinish={!codeSent ? handleSignIn : handleConfirm}
			>
				<div className={codeSent ? "block" : "hidden"}>
					<Form.Item
						name='otp'
						rules={[{ required: codeSent, message: "Please provide the OTP" }]}
					>
						<Input
							className='py-2 px-5 w-[100%]'
							type='text'
							placeholder='Enter OTP'
						/>
					</Form.Item>
					<Button
						id='otp-btn'
						loading={loading}
						className='py-2 px-5 w-[100%] h-auto'
						type='primary'
						htmlType='submit'
					>
						Submit
					</Button>
				</div>
				<div className={codeSent ? "hidden" : "block"}>
					<Form.Item
						name='phone'
						rules={[{ required: codeSent, message: "Please provide the OTP" }]}
					>
						<Input
							className='py-2 px-5 w-[100%]'
							type='text'
							placeholder='Contact number without +880'
						/>
					</Form.Item>
					<Button
						id='sign-in-button'
						loading={loading}
						className='py-2 px-5 w-[100%] h-auto'
						type='primary'
						htmlType='submit'
					>
						Sign in
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default LoginForm;
