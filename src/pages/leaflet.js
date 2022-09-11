import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ADD_MARKER, REMOVE_MARKER } from "../state/Constants";
import { SET_EDITING_BUS, DEFAULT, EDITING_BUS } from "../components/map/constants"
import Map from '../components/map/Map'
import { compareCoordinates } from "../utils/mapUtils";
import MapData from "../components/map/MapData";


const initialState = {
	state: DEFAULT,
	stateData: {}
}

const mapPageContext = createContext({});

const mapPageContextReducer = (state, { type, payload }) => {
	switch (type) {
		case SET_EDITING_BUS:
			return {
				...state,
				state: EDITING_BUS,
				stateData: {
					bus_id: payload.id
				}
			};
		default:
			return state;
	}
};


export default () => {


	return (
		<mapPageContext.Provider value={useReducer(mapPageContextReducer, initialState)}>
			<div className="w-screen h-screen grid grid-cols-2">
				<div className="w-full">
					<MapData />
				</div>
				<div className="h-full col-start-2 col-span-1"  >
					<MapContainer className='w-full h-full' >
						<Map />
					</MapContainer>
				</div>
			</div>
		</mapPageContext.Provider>
	)
};


export { mapPageContext }