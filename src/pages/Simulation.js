import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import icon from "../components/map/icon.svg";
import { Icon } from "leaflet";
import { message, Select } from "antd";

const Simulation = () => {
	const [buses, setBuses] = useState([]);
	const [selectedBus, setSelectedBus] = useState();
	const [position, setPosition] = useState(null);

	const markerIcon = new Icon({
		iconUrl: icon,
		iconSize: [50, 60],
	});

	useEffect(() => {
		const fetchBuses = async () => {
			const querySnapshot = await getDocs(collection(db, "buses"));
			const temp = [];
			querySnapshot.forEach((doc) => {
				temp.push(doc.data());
			});
			setBuses(temp);
		};

		fetchBuses();
	}, []);

	useEffect(() => {
		navigator.geolocation.watchPosition(function (position) {
			setPosition([position.coords.latitude, position.coords.longitude]);
		});
	}, []);

	const handleSimulate = async () => {
		try {
			await updateDoc(doc(db, "buses", selectedBus.toString()), {
				liveLocation: position,
				liveTime: new Date(),
			});
			message.success("Sharing live location");
		} catch (e) {
			console.log(e);
			message.error("Couldn't share live location");
		}
	};

	useEffect(() => {
		position && selectedBus && handleSimulate();
	}, [position, selectedBus]);

	console.log(position);

	return (
		<div className='w-screen h-screen grid grid-cols-2'>
			<div className='w-full overflow-x-hidden'>
				<div>
					<div className='flex justify-between items-center px-6 py-1 header fixed w-6/12 h-[60px] top-0 z-50 bg-white'>
						<h1 className='font-bold text-primary mb-0'>PickMe</h1>
					</div>
					<div className='mt-[100px] flex gap-5 mx-12'>
						<div>Select bus: </div>
						<Select onChange={(e) => setSelectedBus(e)} className='w-6/12'>
							{buses.map((b) => (
								<Select.Option value={b.id}>{b.name || b.id}</Select.Option>
							))}
						</Select>
					</div>
				</div>
			</div>
			<div className='h-full col-start-2 col-span-1'>
				{position && (
					<MapContainer
						className='w-full h-full'
						center={position}
						zoom={13}
						scrollWheelZoom={true}
					>
						<TileLayer
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>
						{position && (
							<Marker position={position} icon={markerIcon}>
								{/* <Tooltip>{stoppage?.name}</Tooltip> */}
							</Marker>
						)}
					</MapContainer>
				)}
			</div>
		</div>
	);
};

export default Simulation;
