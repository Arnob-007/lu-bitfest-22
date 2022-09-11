import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, click, locationfound } from "react-leaflet";
import { mapContext } from "../../pages/leaflet";
import "./map.css"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import icon from './icon.svg'
import { ADD_MARKER } from "./actions";

export default () => {

    const [mapData, dispatch] = useContext(mapContext)

    console.log( mapData );


    // potential bug, where is map defined? did we make sure of that?
    useEffect( () => {
        if( mapData.position ) {
            map.setView( mapData.position, 13 )
        }
    }, [] )

    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
            dispatch( {
                type: ADD_MARKER,
                payload: {
                    position: e.latlng,
                    bus_id: 8
                }
            } )
        //   map.locate()
        },
        locationfound(e) {
            console.log(e);
        //   setPosition(e.latlng)
        //   map.flyTo(e.latlng, map.getZoom())
        },
    })

    const markerIcon = new Icon({
		iconUrl: icon,
		iconSize: [50, 60],
	});

    return (
        <>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            { mapData.stoppages.map( stoppage => (
                <Marker position={stoppage.position} icon={markerIcon} >
                    <Popup>
                        <h1>gg</h1>
                    </Popup>
                </Marker>
            ) ) }
            
        </>
	)
};

