import { Icon } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import icon from "../components/map/icon.svg";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Select } from "antd";
import moment from "moment";

const Live = () => {
	const [buses, setBuses] = useState([]);
	const [selectedBus, setSelectedBus] = useState();
	const [position, setPosition] = useState(null);
	const [snap, setSnap] = useState(null);

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
		if (selectedBus) {
			onSnapshot(doc(db, "buses", selectedBus.toString()), (snapshot) => {
				const data = snapshot.data();
				setSnap(data);
				data.liveLocation ? setPosition(data.liveLocation) : setPosition(null);
			});
		}
	}, [selectedBus]);

	console.log(snap, position);

	return (
		<div className='w-screen h-screen grid grid-cols-2'>
			<div className='w-full overflow-x-hidden'>
				<div>
					<div className='flex justify-between items-center px-6 py-1 header fixed w-6/12 h-[60px] top-0 z-50 bg-white'>
						<h1 className='font-bold text-primary mb-0'>PickMe</h1>
					</div>
					<h2 className=' font-bold text-primary mt-[80px] mx-12 flex gap-2 items-center'>
						<div className='live_loading'></div> LIVE
					</h2>
					<div className='flex mt-8 gap-5 mx-12'>
						<div>Select bus: </div>
						<Select onChange={(e) => setSelectedBus(e)} className='w-6/12'>
							{buses.map((b) => (
								<Select.Option value={b.id}>{b.name || b.id}</Select.Option>
							))}
						</Select>
					</div>
					{snap?.liveTime && (
						<div className='mt-4 flex gap-6 mx-12'>
							Last seen:{" "}
							<div>{moment.unix(snap.liveTime.seconds).format("HH:mm a")}</div>
						</div>
					)}
				</div>
			</div>
			<div className='h-full col-start-2 col-span-1'>
				{position && (
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
						<Marker position={position} icon={markerIcon}></Marker>
					</MapContainer>
				)}
			</div>
		</div>
	);
};

export default Live;
