import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const UserMap = () => {
	const position = [24.8949, 91.8687];
	return (
		<MapContainer
			className='w-full h-full'
			center={position}
			zoom={13}
			scrollWheelZoom={false}
		>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
		</MapContainer>
	);
};

export default UserMap;
