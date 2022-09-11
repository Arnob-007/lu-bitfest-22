import React, { createContext, useEffect, useReducer } from "react";
import { MapContainer } from "react-leaflet";
import { SET_BUSES, SET_STOPPAGES } from "../state/Constants";
import {
	SET_EDITING_BUS,
	DEFAULT,
	EDITING_BUS,
	LOADING,
	SET_LOADING,
	SET_ADDING_NEW_STOPPAGE,
	ADDING_NEW_STOPPAGE,
} from "../components/map/constants";
import Map from "../components/map/Map";
import MapData from "../components/map/MapData";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useStateValue } from "../state/StateProvider";

const initialState = {
	state: DEFAULT,
	stateData: {},
};

const mapPageContext = createContext({});

const mapPageContextReducer = (state, { type, payload }) => {
	switch (type) {
		case SET_EDITING_BUS:
			return {
				...state,
				state: EDITING_BUS,
				stateData: {
					bus_id: payload.id,
				},
			};
		case SET_LOADING:
			return {
				...state,
				state: payload ? LOADING : DEFAULT,
			};
		case SET_ADDING_NEW_STOPPAGE:
			return {
				...state,
				state: payload ? ADDING_NEW_STOPPAGE : DEFAULT,
			};
		default:
			return state;
	}
};

const Leaflet = () => {
	const [state, dispatch] = useReducer(mapPageContextReducer, initialState);
	const [rootState, rootDispatch] = useStateValue();

	useEffect(() => {
		onSnapshot(collection(db, "stoppages"), (querySnapshot) => {
			const stoppages = [];
			querySnapshot.forEach((doc) => {
				stoppages.push(doc.data());
			});

			rootDispatch({
				type: SET_STOPPAGES,
				payload: stoppages,
			});
		});

		onSnapshot(collection(db, "buses"), (querySnapshot) => {
			const buses = [];
			querySnapshot.forEach((doc) => {
				buses.push(doc.data());
			});

			rootDispatch({
				type: SET_BUSES,
				payload: buses,
			});
			console.log(buses);
		});
	}, []);

	return (
		<mapPageContext.Provider value={[state, dispatch]}>
			<div className='w-screen h-screen grid grid-cols-2'>
				<div className='w-full overflow-x-hidden'>
					<div className='flex justify-between items-center px-6 py-1 header fixed w-6/12 h-[60px] top-0 z-50 bg-white'>
						<h1 className='font-bold text-primary mb-0'>PickMe</h1>
					</div>
					<div className='mt-[70px]'>
						<MapData />
					</div>
				</div>
				<div className='h-full col-start-2 col-span-1'>
					<MapContainer className='w-full h-full'>
						<Map />
					</MapContainer>
				</div>
			</div>
		</mapPageContext.Provider>
	);
};

export default Leaflet;

export { mapPageContext };
