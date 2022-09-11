import { Button, Form, Input, message } from "antd";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";

const AddBus = ({ handleClose }) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const handleSubmit = async () => {
		setLoading(true);
		try {
			const formData = form.getFieldsValue();
			Object.keys(formData).forEach((key) =>
				formData[key] === undefined ? (formData[key] = null) : {}
			);
			const bus = {
				id: new Date().getTime(),
				route: [],
				color: "#369",
				...formData,
			};
			await setDoc(doc(db, "buses", bus.id.toString()), { ...bus });
			message.success("Successfully added");
			form.resetFields();
			handleClose();
		} catch (e) {
			console.log(e);
			message.error("Couldn't add bus");
		} finally {
			setLoading(false);
		}
	};
	return (
		<Form form={form} name='addBus' onFinish={handleSubmit} layout='vertical'>
			<div className='flex justify-between'>
				<Form.Item className='' label='Name' name='name'>
					<Input type='text' placeholder='Bus name' />
				</Form.Item>
				<Form.Item className='' label='Code Name' name='codeName'>
					<Input type='text' placeholder='Code name' />
				</Form.Item>
			</div>
			<div className='flex justify-between'>
				<Form.Item className='' label='License No' name='license'>
					<Input type='text' placeholder='License no' />
				</Form.Item>
				<Form.Item className='' label='Capacity' name='capacity'>
					<Input type='number' placeholder='Capacity' />
				</Form.Item>
			</div>
			<div className='flex justify-between'>
				<Form.Item className='' label='Driver Name' name='driverName'>
					<Input type='text' placeholder='Full name' />
				</Form.Item>
				<Form.Item className='' label='Driver phone' name='driverPhone'>
					<Input type='text' placeholder='Contact no' />
				</Form.Item>
			</div>
			<div className='flex justify-end gap-3'>
				<Button onClick={handleClose} className='text-red-600' type='default'>
					Cancel
				</Button>
				<Button loading={loading} htmlType='submit' type='primary'>
					Save
				</Button>
			</div>
		</Form>
	);
};

export default AddBus;
