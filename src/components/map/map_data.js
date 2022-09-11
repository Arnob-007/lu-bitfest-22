import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default () => {
	const position = [51.505, -0.09]
	return (
        <MapContainer className='w-full h-full' center={position} zoom={18}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={"https://raw.githubusercontent.com/Arnob-007/ip-tracker/master/src/Components/Map/icon-location.svg"}>
                <Popup>
                    <h1>gg</h1>
                </Popup>
            </Marker>
        </MapContainer>
	)
};

