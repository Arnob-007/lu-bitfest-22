import { Tabs } from "antd";
import React from "react";
import { MapContainer } from "react-leaflet";
import AvailableBuses from "../components/AvailableBuses";
import BusRequest from "../components/BusRequest";
import UserMap from "../components/UserMap";

const AddRequest = () => {
	return (
		<div className='w-screen h-screen grid grid-cols-2'>
			<div className='w-full mt-[70px]  overflow-x-hidden'>
				<div className='flex justify-between items-center px-6 py-1 header fixed w-6/12 h-[60px] top-0 z-50 bg-white'>
					<h1 className='font-bold text-primary mb-0'>PickMe</h1>
				</div>
				<div className='pl-5'>
					<BusRequest official={true} />
				</div>
			</div>
			<div className='h-full col-start-2 col-span-1'>
				<MapContainer className='w-full h-full'>
					<UserMap />
				</MapContainer>
			</div>
		</div>
	);
};

export default AddRequest;
