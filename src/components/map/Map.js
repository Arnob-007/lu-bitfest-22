import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, click, locationfound, Polyline } from "react-leaflet";
import "./map.css"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import icon from './icon.svg'
import { ADD_MARKER, REMOVE_MARKER, SET_BUS_ROUTE } from "../../state/Constants";
import { EDITING_BUS } from "./constants";
import { Button } from "antd";
import { useStateValue } from "../../state/StateProvider";
import { mapPageContext } from "../../pages/leaflet"


export default () => {

    const [ { buses, stoppages, map : mapData } , dispatch] = useStateValue();
    const [ pageState, pageDispatch ] = useContext(mapPageContext)


    // potential bug, where is map defined? did we make sure of that?
    useEffect( () => {
        if( mapData.position ) {
            map.setView( mapData.position, 13 )
        }
    }, [] )

    useEffect( () => {
        if( stoppages ) console.log( stoppages );
    }, [mapData] )

    const map = useMapEvents({
        click(e) {
            dispatch( {
                type: ADD_MARKER,
                payload: {
                    id: new Date().getTime(),
                    position: e.latlng,
                    bus_id: 8
                }
            } )
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

    console.log( pageState, mapData );

    const handleStoppageClick = (stoppage) => {
        console.log(stoppage);
        if( pageState.state == EDITING_BUS ) {
            dispatch( {
                type: SET_BUS_ROUTE,
                payload: {
                    id: pageState.stateData.bus_id,
                    route: [
                        ...buses
                            .find( bus => bus.id == pageState.stateData.bus_id).route,  
                        stoppage,
                    ]
                }
            } )
        }
        // dispatch( {
        //     type: REMOVE_MARKER,
        //     payload: {
        //         id: stoppage.id
        //     }
        // } )
    }

    return (
        <>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            /> 
            
            { 
                pageState.state == EDITING_BUS && buses?.length > 0 &&
                <Polyline 
                    pathOptions={{color: 'lime'}} 
                    positions={buses.find( bus => bus.id == pageState.stateData.bus_id)?.route.map( st => st.position )}
                />
            }

            { stoppages.map( stoppage => (
                <Marker position={stoppage.position} icon={markerIcon} >
                    <Popup>
                        <div className="h-64 w-64">
                            <Button onClick={() => handleStoppageClick(stoppage)} > Add to selected bus </Button>
                        </div>
                    </Popup>
                </Marker>
            ) ) }
            
        </>
	)
};

