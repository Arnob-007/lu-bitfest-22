import { Button, Spin } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { db } from "../../firebase";
import { mapPageContext } from "../../pages/leaflet";
import { useStateValue } from "../../state/StateProvider";
import Spinner from "../../utils/Spinner";
import { LOADING, SET_EDITING_BUS } from "./constants";

export default () => {

    const [ { buses, stoppages, map : mapData } , dispatch ] = useStateValue(); 
    const [ pageState, pageDispatch ] = useContext( mapPageContext );

    const handleEdit = ( id ) => {
        pageDispatch( {
            type: SET_EDITING_BUS,
            payload: {
                id: id
            }
        } )
    }

    const save = (bus_id) => {
        db.collection("buses").doc( bus_id ).set({
            ...buses.find( bus => bus.id == bus_id )
        })
    }


    return (
        <div className="w-full min-h-full flex flex-col relative" >
            { pageState.state == LOADING 
            && <div className="absolute w-full h-full z-10" style={{background: 'rgba(0,0,0,0.1)'}}><Spinner /></div> }
            { buses && buses.map( bus => (
                <div className="mx-8 my-4 px-4 py-2 rounded-md pl-8 shadow-lg">
                    <div className="grid grid-cols-6" >
                        <div className="col-start-1 col-span-1 self-center text-xl">
                            Bus no. { bus.id }
                        </div>
                        <div className="col-start-6 flex flex-col gap-y-2" >
                            <Button onClick={ () => handleEdit(bus.id) } > Edit </Button>
                            <Button onClick={ () => save(bus.id) } type="primary" > Save </Button>
                        </div>
                    </div>
                    
                    <div>
                        <span className="text-xl">Stoppages:</span>
                        <ul className="p-4 px-8 row-start-2 col-start-1 col-span-6">
                        { bus.route.map( stoppage_id => (
                            <li>{stoppages.find( st => st.id == stoppage_id )?.name}</li>
                        ) ) }       
                        </ul>
                    </div>
                </div>
            ) ) }
            <div className="absolute bottom-0 right-0 m-8">
                <Button type="primary" size="large" > Save Route Data </Button>
            </div>
        </div>
	)
};

