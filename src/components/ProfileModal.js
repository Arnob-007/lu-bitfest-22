import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, message, Modal } from "antd";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { SET_USER } from "../state/Constants";
import { useStateValue } from "../state/StateProvider";

const ProfileModal = () => {
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [{ user }, action] = useStateValue();
	const [form] = Form.useForm();

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const data = form.getFieldsValue();
			Object.keys(data).forEach((key) =>
				data[key] === undefined ? delete data[key] : {}
			);
			await updateDoc(doc(db, "members", user._id), { data });

			const userData = (await getDoc(doc(db, "members", user._id))).data();
			action({ type: SET_USER, payload: { user: userData } });
			message.success("Successfully updated!");
			setShowModal(false);
		} catch (e) {
			console.log(e);
			message.error("Update failed");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		form.setFieldsValue(user);
	}, [user]);

	return (
		<div className='absolute top-3 right-6 cursor-pointer'>
			<Avatar onClick={() => setShowModal(!showModal)} size='large'>
				<UserOutlined className='text-xl' />
			</Avatar>
			<Modal
				className='absolute top-16 right-6 rounded justify-center items-center text-center max-w-[400px]'
				open={showModal}
				footer={null}
				title={null}
				onCancel={() => setShowModal(false)}
			>
				<Avatar
					size='large'
					className='w-[100px] h-[100px] flex justify-center items-center mb-5 mx-auto'
				>
					<UserOutlined className='text-[80px]' />
				</Avatar>
				<h2>{user?.name}</h2>
				<div className='text-xs'>+880 {user?.phone}</div>
				<Form
					className='mt-8'
					form={form}
					name='updateForm'
					onFinish={handleSubmit}
				>
					<Form.Item className='' label='Full Name' name='name'>
						<Input
							className=' border-none'
							type='text'
							placeholder='Full name'
						/>
					</Form.Item>
					{user.role === "Student" ? (
						<>
							<Form.Item label='Student ID' name='cardId'>
								<Input
									disabled
									className='w-[100%] border-none'
									type='text'
									placeholder='Student ID'
								/>
							</Form.Item>
							<Form.Item label='Batch' name='batch'>
								<Input
									className='w-[100%] border-none'
									type='text'
									placeholder='Session'
								/>
							</Form.Item>
							<Form.Item label='Section' name='section'>
								<Input
									className='w-[100%] border-none'
									type='text'
									placeholder='A/B'
								/>
							</Form.Item>
						</>
					) : (
						<>
							<Form.Item label='Department' name='department'>
								<Input
									className='w-[100%] border-none'
									type='text'
									placeholder='Department name'
								/>
							</Form.Item>
							<Form.Item label='Code name' name='codeName'>
								<Input
									className='w-[100%] border-none'
									type='text'
									placeholder='Identifier code'
								/>
							</Form.Item>
							<Form.Item label='Designation' name='designation'>
								<Input
									className='w-[100%] border-none'
									type='text'
									placeholder='Designation'
								/>
							</Form.Item>
						</>
					)}
					<div className='flex justify-between'>
						<Button
							onClick={() => auth.signOut()}
							className='text-red-600'
							type='text'
						>
							Log out
						</Button>
						<Button loading={loading} htmlType='submit' type='primary'>
							Update
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};

export default ProfileModal;
