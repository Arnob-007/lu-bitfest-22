import React from "react";
import { MapContainer } from "react-leaflet";
import BusRequest from "../components/BusRequest";
import UserMap from "../components/UserMap";

const Dashboard = () => {
	return (
		<div className='w-screen h-screen grid grid-cols-2'>
			<div className='w-full overflow-x-hidden'>
				<BusRequest />
			</div>
			<div className='h-full col-start-2 col-span-1'>
				<MapContainer className='w-full h-full'>
					<UserMap />
				</MapContainer>
			</div>
		</div>
	);
};

export default Dashboard;
