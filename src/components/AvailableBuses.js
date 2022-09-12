import {
	ArrowRightOutlined,
	ArrowsAltOutlined,
	MonitorOutlined,
} from "@ant-design/icons";
import { Button, Divider, Tag } from "antd";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const AvailableBuses = () => {
	const [buses, setBuses] = useState([]);
	const [stoppages, setStoppages] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBuses = async () => {
			const querySnapshot = await getDocs(collection(db, "buses"));
			const temp = [];
			querySnapshot.forEach((doc) => {
				temp.push(doc.data());
			});
			setBuses(temp);
		};
		const fetchStoppages = async () => {
			const querySnapshot = await getDocs(collection(db, "stoppages"));
			const temp = [];
			querySnapshot.forEach((doc) => {
				temp.push(doc.data());
			});
			setStoppages(temp);
		};

		fetchStoppages();
		fetchBuses();
	}, []);
	return (
		<div className='flex flex-col'>
			<Button
				onClick={() => navigate("/live")}
				icon={<MonitorOutlined />}
				className='self-end mr-10'
				type='primary'
			>
				Live tracking
			</Button>
			{buses.map((bus) => (
				<div
					className={`border-solid border-primary border-b-[10px] border-y-0 border-x-0 mx-8 my-4 px-4 py-2 rounded-md pl-8 shadow-lg cursor-pointer`}
				>
					<div className='flex justify-between items-center'>
						<h2 className='col-start-1 col-span-3 self-center text-xl text-primary font-bold'>
							{bus.name || "Bus name"}
						</h2>
						<div className='text-xs'>#{bus.license}</div>
					</div>
					<Divider className='mt-0' />
					<div className='flex justify-between'>
						<div>
							<span className='text-[18px]'>Route </span>
							<div className='py-2'>
								{bus.route.map((stoppage_id, _i) => (
									<>
										<Tag>
											{stoppages.find((st) => st.id === stoppage_id)?.name}
										</Tag>
										{_i !== bus?.route.length - 1 && (
											<ArrowRightOutlined className='mr-2' />
										)}
									</>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AvailableBuses;
