import { Button } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { mapPageContext } from "../../pages/leaflet";
import { useStateValue } from "../../state/StateProvider";
import { SET_EDITING_BUS } from "./constants";

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


    return (
        <div className="w-full flex flex-col" >
            { buses && buses.map( bus => (
                <div className="grid grid-rows-2 grid-cols-6 mx-8 my-4 px-4 py-2 rounded-md  shadow-lg" >
                    <div className="col-start-1 col-span-1">
                        id: { bus.id }
                    </div>
                    <Button className="col-start-6" onClick={ () => handleEdit(bus.id) } > Edit </Button>
                    <ul className="row-start-2 col-start-1 col-span-6">
                        { bus.route.map( stoppage => (
                            <li>{stoppage.position[0]} {stoppage.position[1]}</li>
                        ) ) }    
                    </ul>
                </div>
            ) ) }
        </div>
	)
};

