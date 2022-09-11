import { Button, Spin } from "antd";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { db } from "../../firebase";
import { mapPageContext } from "../../pages/leaflet";
import { useStateValue } from "../../state/StateProvider";
import Spinner from "../../utils/Spinner";
import { LOADING, SET_ADDING_NEW_STOPPAGE, SET_EDITING_BUS, SET_LOADING } from "./constants";

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

    const save = async (bus_id) => {
        pageDispatch({
            type: SET_LOADING,
            payload: true
        })
        await setDoc(doc(db, "buses", bus_id.toString()), {
            ...buses.find( bus => bus.id == bus_id )
        });
        pageDispatch({
            type: SET_LOADING,
            payload: false
        })
    }

    const handleAddNewStoppage = () => {
        pageDispatch( {
            type: SET_ADDING_NEW_STOPPAGE,
            payload: true
        } )
    }


    const handleAddNewBus = async () => {
        pageDispatch({
            type: SET_LOADING,
            payload: true
        })
        const bus = {
            id: new Date().getTime(),
            route: [],
            color: '#369'
        }
        await setDoc(doc(db, "buses", bus.id.toString()), { ...bus });
        pageDispatch({
            type: SET_LOADING,
            payload: false
        })
    }


    return (
        <div className="w-full min-h-full flex flex-col relative" >
            { pageState.state == LOADING 
            && <div className="absolute w-full h-full z-10" style={{background: 'rgba(0,0,0,0.1)'}}><Spinner /></div> }
            { buses && buses.map( bus => (
                <div className="mx-8 my-4 px-4 py-2 rounded-md pl-8 shadow-lg">
                    <div className="grid grid-cols-6" >
                        <div className="col-start-1 col-span-3 self-center text-xl">
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
            <div className="absolute bottom-0 right-0 m-8 flex gap-x-4">
                <Button type="primary" size="large" onClick={handleAddNewBus} > Add New Bus </Button>
                <Button type="primary" size="large" onClick={handleAddNewStoppage} > Add new stoppage </Button>
            </div>
        </div>
	)
};

