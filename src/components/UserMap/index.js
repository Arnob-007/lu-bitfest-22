import React from "react";
import { TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const UserMap = () => {
	return (
		<>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
		</>
	);
};

export default UserMap;
