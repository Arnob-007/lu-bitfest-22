import { Button, Form, Input, message, Select } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const ConsumerRegistrationForm = () => {
	const [loading, setLoading] = useState(false);
	const [codeSent, setCodeSent] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			"sign-in-button",
			{
				size: "invisible",
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					handleRegister();
				},
			},
			auth
		);
	}, []);

	const handleRegister = async () => {
		const { phone } = form.getFieldsValue();
		if (!phone || phone.length !== 10) {
			message.error("Invalid contact number");
			return;
		}
		const phoneNumber = "+880" + phone;
		const appVerifier = window.recaptchaVerifier;
		console.log("Running handleRegister");
		console.log(phoneNumber);
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
		const formData = form.getFieldsValue();
		if (!formData.otp) return;

		try {
			setLoading(true);
			const result = await window.confirmationResult.confirm(formData.otp);
			const user = result.user;
			if (result._tokenResponse.isNewUser) {
				const userData = {
					...formData,
					_id: user.uid,
					type: "consumer",
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				console.log("USERDATA", userData);
				await setDoc(doc(db, "members", user.uid), userData);
				message.success("Welcome to the app!");
			}
			console.log("RESULT", result);
			console.log("USER", user);
		} catch (e) {
			console.log(e);
			message.error("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Form
				name='otpForm'
				form={form}
				onFinish={codeSent ? handleConfirm : handleRegister}
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
						name='name'
						rules={[{ required: true, message: "Please input your full name" }]}
					>
						<Input
							className='py-2 px-5 w-[100%]'
							type='text'
							placeholder='Full name'
						/>
					</Form.Item>
					<div className='flex gap-2'>
						<Form.Item
							name='phone'
							rules={[
								{ required: true, message: "Please input your phone number" },
							]}
						>
							<Input
								className='py-2 px-5 w-[100%]'
								type='text'
								placeholder='Phone without +880'
							/>
						</Form.Item>
						<Form.Item name='cardId'>
							<Input
								className='py-2 px-5 w-[100%]'
								type='text'
								placeholder='ID card no'
							/>
						</Form.Item>
					</div>
					<Form.Item
						name='role'
						initialValue='Student'
						rules={[{ required: true, message: "Please select a role" }]}
					>
						<Select
							className='w-[100%]'
							type='text'
							placeholder='Role'
							defaultValue='Student'
						>
							<Select.Option value='Student'>Student</Select.Option>
							<Select.Option value='Teacher'>Teacher</Select.Option>
							<Select.Option value='Staff'>Staff</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name='stoppage'>
						<Select className='w-[100%]' type='text' placeholder='Stoppage'>
							<Select.Option value='stoppage 1'>Stoppage 1</Select.Option>
							<Select.Option value='stoppage 2'>Stoppage 2</Select.Option>
						</Select>
					</Form.Item>
					<Button
						id='sign-in-button'
						loading={loading}
						className='py-2 px-5 w-[100%] h-auto'
						type='primary'
						htmlType='submit'
					>
						Register
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default ConsumerRegistrationForm;
