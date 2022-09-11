import { CarTwoTone, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, message, Select, TimePicker } from "antd";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { db } from "../firebase";
import { useStateValue } from "../state/StateProvider";

const BusRequest = () => {
	console.log(moment().hour());
	return (
		<div>
			<div className='flex justify-between items-center px-6 py-1 header fixed w-6/12 h-[60px] top-0 z-50 bg-white'>
				<h1 className='font-bold text-primary mb-0'>PickMe</h1>
			</div>
			<div className='py-6 mx-16 mt-[70px] flex flex-col gap-5'>
				<Request key='incoming' type='incoming' />
				<Request key='outgoing' type='outgoing' />
			</div>
		</div>
	);
};

const Request = ({ type }) => {
	const [loading, setLoading] = useState(false);
	const [{ user }] = useStateValue();
	const [form] = Form.useForm();

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const formData = form.getFieldsValue();
			const data = {
				date: formData.date.toDate(),
				time: formData.time.toDate(),
				stoppage: formData.stoppage,
				type,
				userId: user._id,
			};

			await addDoc(collection(db, "requests"), data);
			message.success("Request submitted");
			console.log(data);
		} catch (e) {
			console.log(e);
			message.error("Something went wrong. Please try again");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='border-solid border-[1px] rounded border-gray-200 shadow py-2 px-6'>
			<h2 className='font-bold text-primary flex gap-2 items-center mb-5'>
				<CarTwoTone twoToneColor='primary' />
				{type === "incoming" ? "Way to UNI" : "Back to home"}
			</h2>
			<Form
				className='flex flex-col'
				form={form}
				name='incomingForm'
				onFinish={handleSubmit}
			>
				<Form.Item
					label='Journey date'
					initialValue={moment().add(1, "day")}
					name='date'
					rules={[{ required: true, message: "Please choose a date" }]}
				>
					<DatePicker disabled className='py-2 px-5 w-[100%]' type='text' />
				</Form.Item>
				<Form.Item
					label='Pick up time'
					name='time'
					rules={[{ required: true, message: "Please choose a time" }]}
				>
					<TimePicker
						className='py-2 px-5 w-[100%]'
						placeholder='Select time'
						format='HH a'
						showNow={false}
						disabledHours={() =>
							type === "incoming"
								? Array.from(Array(24).keys()).filter((i) => i < 8 || i > 10)
								: Array.from(Array(24).keys()).filter((i) => i < 15 || i > 17)
						}
					/>
				</Form.Item>
				<Form.Item
					name='stoppage'
					label='Pick up point'
					initialValue='Stoppage 1'
					rules={[
						{ required: true, message: "Please select your pick up point" },
					]}
				>
					<Select className='w-[100%]' type='text' placeholder='Stoppage'>
						<Select.Option value='Stoppage 1'>Stoppage 1</Select.Option>
						<Select.Option value='Stoppage 2'>Stoppage 2</Select.Option>
					</Select>
				</Form.Item>
				<div className='flex mt-2 ml-auto gap-2'>
					<Button icon={<DeleteOutlined />} onClick={() => form.resetFields()}>
						Reset
					</Button>
					<Button
						loading={loading}
						icon={<SaveOutlined />}
						type='primary'
						htmlType='submit'
					>
						Request
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default BusRequest;
