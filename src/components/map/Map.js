import React, { useContext, useEffect, useRef } from "react";
import { Input } from "antd";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, click, locationfound, Polyline } from "react-leaflet";
import "./map.css"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import icon from './icon.svg'
import { ADD_STOPPAGE, SET_BUS_ROUTE, SET_STOPPAGE } from "../../state/Constants";
import { ADDING_NEW_STOPPAGE, EDITING_BUS, SET_LOADING } from "./constants";
import { Button, Form } from "antd";
import { useStateValue } from "../../state/StateProvider";
import { mapPageContext } from "../../pages/leaflet"
import { db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";


export default () => {

    const [ { buses, stoppages, map : mapData } , dispatch] = useStateValue();
    const [ pageState, pageDispatch ] = useContext(mapPageContext)


    // potential bug, where is map defined? did we make sure of that?
    useEffect( () => {
        if( mapData.position ) {
            map.setView( mapData.position, 13 )
        }
    }, [] )

    if( stoppages ) console.log( stoppages );

    const map = useMapEvents({
        click(e) {
            pageState.state == ADDING_NEW_STOPPAGE && addStoppage( [e.latlng.lat, e.latlng.lng] );
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

    const addStoppage = async ( position ) => {
        
        pageDispatch({
            type: SET_LOADING,
            payload: true
        })

        const stoppage = {
            id: new Date().getTime(),
            position,
            name: "default"
        }

        console.log("asdasdasdsa")

        await setDoc(doc(db, "stoppages", stoppage.id.toString()), stoppage);
        
        // dispatch( {
        //     type: ADD_STOPPAGE,
        //     payload: 
        // } 
        
        pageDispatch({
            type: SET_LOADING,
            payload: false
        })
    }

    const handleStoppageClick = (stoppage, add) => {
        console.log(stoppage);
        if( pageState.state == EDITING_BUS ) {
            if( add ) {
                // add stoppage to bus
                dispatch( {
                    type: SET_BUS_ROUTE,
                    payload: {
                        id: pageState.stateData.bus_id,
                        route: [
                            ...buses
                                .find( bus => bus.id == pageState.stateData.bus_id).route,  
                            stoppage.id,
                        ]
                    }
                } )
            } else {
                // remove stoppage from bus
                
                dispatch( {
                    type: SET_BUS_ROUTE,
                    payload: {
                        id: pageState.stateData.bus_id,
                        route: [
                            ...buses
                                .find( bus => bus.id == pageState.stateData.bus_id).route
                                .filter( st_id => st_id != stoppage.id )  
                        ]
                    }
                } )
            }
        }
    }

    const handleStoppageUpdate = async (stoppage) => {
        pageDispatch({
            type: SET_LOADING,
            payload: true
        })

        await updateDoc(doc(db, "stoppages", stoppage.id.toString()), stoppage);

        dispatch( {
            type: SET_STOPPAGE,
            payload: {
                ...stoppages.find( st => st.id == stoppage.id),
                name: stoppage.name
            }
        } )

        pageDispatch({
            type: SET_LOADING,
            payload: false
        })
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
                    positions={buses
                        .find( bus => bus.id == pageState.stateData.bus_id)?.route
                        .map( stoppage_id => stoppages.find(st => st.id == stoppage_id ).position )}
                />
            }

            { stoppages.map( stoppage => (
                <Marker position={stoppage.position} icon={markerIcon} >
                    <Popup >
                        <div className="px-2 py-4 min-w-[200px]">
                            <Form 
                                initialValues={{
                                    ...stoppage,
                                }}
                                onFinish={handleStoppageUpdate}
                                className="flex mb-8 flex-col"
                            >
                                <Form.Item name="id" hidden>
                                </Form.Item>
                                <Form.Item label="Name:" name="name">
                                    <Input />
                                </Form.Item>
                                <Button className="self-stretch" htmlType='submit' type='primary'>
                                    Update
                                </Button>
                            </Form>

                            <hr></hr>
                            
                            { 
                                pageState.state == EDITING_BUS 
                                && ( buses.find( bus => bus.id == pageState.stateData.bus_id).route.indexOf( stoppage.id ) == -1 
                                    ?   <Button className="mt-4" type="secondary" onClick={() => handleStoppageClick(stoppage, true)} > 
                                            Add to selected bus 
                                        </Button>
                                    :   <Button className="mt-4" type="secondary" onClick={() => handleStoppageClick(stoppage, false)} > 
                                            Remove from selected bus 
                                        </Button>
                                )
                            }
                        </div>
                    </Popup>
                </Marker>
            ) ) }
            
        </>
	)
};

