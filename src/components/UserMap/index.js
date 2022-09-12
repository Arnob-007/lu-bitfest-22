import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import icon from "../map/icon.svg";

const UserMap = () => {
	const [stoppages, setStoppages] = useState([]);
	const position = [24.8949, 91.8687];

	const markerIcon = new Icon({
		iconUrl: icon,
		iconSize: [50, 60],
	});

	useEffect(() => {
		const fetchStoppages = async () => {
			const querySnapshot = await getDocs(collection(db, "stoppages"));
			const temp = [];
			querySnapshot.forEach((doc) => {
				temp.push(doc.data());
			});
			setStoppages(temp);
		};

		fetchStoppages();
	}, []);

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

			{stoppages.map((stoppage) => (
				<Marker position={stoppage.position} icon={markerIcon}>
					<Tooltip>{stoppage?.name}</Tooltip>
				</Marker>
			))}
		</MapContainer>
	);
};

export default UserMap;
