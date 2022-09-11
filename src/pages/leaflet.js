import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ADD_MARKER } from "../components/map/actions";
import Map from '../components/map/Map'


const initialState = {
	position: [51.505, -0.09],
	stoppages: [{
		position: [51.505, -0.09],
		bus_id: 0
	}]
}

const mapContext = createContext({});

const mapContextReducer = (state, action) => {
	switch (action.type) {
		case ADD_MARKER:
			return {
				...state,
				stoppages: [
					...(state.stoppages?state.stoppages:[]),
					action.payload
				],
			};
		default:
			return state;
	}
};


export default () => {

	const [ mapData, setMapData ] = useState();

	return (
		<mapContext.Provider value={useReducer(mapContextReducer, initialState)}>
			<div className="w-screen h-screen grid grid-cols-2">
				<div className="h-full col-start-2 col-span-1"  >
					<MapContainer className='w-full h-full' >
						<Map />
					</MapContainer>
				</div>
			</div>
		</mapContext.Provider>
	)
};


export { mapContext }