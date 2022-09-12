import {
	ArrowRightOutlined,
	EditOutlined,
	EditTwoTone,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Divider, Form, message, Modal, Table, Tag } from "antd";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { mapPageContext } from "../../pages/Leaflet";
import { SET_BUSES } from "../../state/Constants";
import { useStateValue } from "../../state/StateProvider";
import { generateRoutes } from "../../utils/generateRoutes";
import Spinner from "../../utils/Spinner";
import AddBus from "./AddBus";
import {
	ADDING_NEW_STOPPAGE,
	EDITING_BUS,
	LOADING,
	SET_ADDING_NEW_STOPPAGE,
	SET_EDITING_BUS,
	SET_LOADING,
} from "./constants";

const MapData = () => {
	const [showModal, setShowModal] = useState(false);
	const [{ buses, stoppages, map: mapData }, dispatch] = useStateValue();
	const [requests, setRequests] = useState([]);
	const [times, setTimes] = useState([]);
	const [stopsWithWeight, setStopsWithWeight] = useState([]);
	const [pageState, pageDispatch] = useContext(mapPageContext);

	console.warn(buses);

	const handleEdit = (id) => {
		pageDispatch({
			type: SET_EDITING_BUS,
			payload: {
				id: id,
			},
		});
	};

	const save = async (bus_id) => {
		pageDispatch({
			type: SET_LOADING,
			payload: true,
		});
		await setDoc(doc(db, "buses", bus_id.toString()), {
			...buses.find((bus) => bus.id === bus_id),
		});
		pageDispatch({
			type: SET_LOADING,
			payload: false,
		});
	};

	const handleAddNewStoppage = () => {
		message.info({
			content: "Click anywhere in the map to add a stoppage",
			style: {
				position: "absolute",
				top: 0,
				right: 150,
			},
		});
		pageDispatch({
			type: SET_ADDING_NEW_STOPPAGE,
			payload: true,
		});
	};

	const handleAddNewBus = async () => {
		pageDispatch({
			type: SET_LOADING,
			payload: true,
		});
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
		pageDispatch({
			type: SET_LOADING,
			payload: false,
		});
	};

	useEffect(() => {
		const fetchRequirements = async () => {
			const snap = await getDocs(collection(db, "requests"));
			const tempRequests = [];
			snap.docs.forEach((d) => {
				tempRequests.push({ id: d.id, ...d.data() });
			});

			const tempTimes = [] 
            tempRequests.forEach((r) => {
 				if( !tempTimes.includes(moment.unix(r.time.seconds).format("H")) ) 
                    tempTimes.push( moment.unix(r.time.seconds).format("H") )
            });

			let tempStopsWithWeight = [];
			stoppages.forEach((s) => {
				let d = { ...s, weight: {} };
				tempTimes.forEach((t) => (d.weight[t] = 0));
				const weights = tempRequests.filter((r) => r.stoppage === s.id);
				weights.forEach(
					(w) => (d.weight[moment.unix(w.time.seconds).format("H")] += 1)
				);
				tempStopsWithWeight.push(d);
			});
			setStopsWithWeight(tempStopsWithWeight);
			setTimes(tempTimes);
			setRequests(tempRequests);
		};
		fetchRequirements();
	}, [stoppages]);

	const handleRoutesGeneration = async () => {
		const res = generateRoutes(stopsWithWeight, buses, times);
		window.res = res;
        const buses_t = [...buses];
        Object.keys( res ).forEach( time => {
            res[time].forEach( ({bus_id, path}) => {
                buses_t.find( bus => bus.id == bus_id ).route = path.map( p => {
                    return stoppages[p.i].id;
                } )
                buses_t.find( bus => bus.id == bus_id ).route.push( "leading" )
            } )
        } )
        dispatch( {
            type: SET_BUSES,
            payload: buses_t
        } )
	};

	const getColumns = () => {
		const arr = [];
		arr.push({
			title: "Stoppage",
			dataIndex: "name",
			key: "name",
		});
		Object.keys(stopsWithWeight[0]?.weight).forEach((k) =>
			arr.push({
				title: `Time ${k}`,
				dataIndex: ["weight", k],
				key: "demand",
			})
		);
		return arr;
	};

	console.log(stopsWithWeight);


	return (
		<div className='w-full min-h-full flex flex-col'>
			{pageState.state === LOADING && (
				<div
					className='absolute w-full h-full z-10'
					style={{ background: "rgba(0,0,0,0.1)" }}
				>
					<Spinner />
				</div>
			)}
			{stopsWithWeight.length > 0 && (
				<div className='flex w-10/12 mx-10'>
					<Table
						pagination={{ pageSize: 5 }}
						className='w-full'
						dataSource={stopsWithWeight}
						columns={getColumns()}
					/>
				</div>
			)}
			{buses &&
				buses.map((bus) => (
					<div
						onClick={() => handleEdit(bus.id)}
						className={`${
							pageState.state === EDITING_BUS &&
							pageState.stateData.bus_id === bus.id &&
							"border-solid border-primary border-b-[10px] border-y-0 border-x-0 "
						} mx-8 my-4 px-4 py-2 rounded-md pl-8 shadow-lg cursor-pointer`}
					>
						<div className='flex justify-between items-center'>
							<h2 className='col-start-1 col-span-3 self-center text-xl text-primary font-bold'>
								{bus.name || "Bus name"}
							</h2>
							<div className='text-xs'>#{bus.id}</div>
						</div>
						<Divider className='mt-0' />
						<div className='flex justify-between'>
							<div>
								<span className='text-[18px]'>Route </span>
                                {/* { times.map( time => ( */}
                                    <div className='py-2'>
                                        {bus.route.map((stoppage_id, _i) => (
                                            <>
                                                <Tag>
                                                    {stoppages.find((st) => st.id === stoppage_id)?.name}
                                                </Tag>
                                                {_i !== bus?.route.length - 1 && (
                                                    <ArrowRightOutlined className='mr-2' />
                                                )}
                                            </>
                                        ))}
                                    </div>
                                // ) ) }
							</div>
							{pageState.state === EDITING_BUS &&
								pageState.stateData.bus_id === bus.id && (
									<div className='col-start-6 flex flex-col gap-y-2'>
										<Button onClick={() => save(bus.id)} type='primary'>
											{" "}
											Update{" "}
										</Button>
									</div>
								)}
						</div>
					</div>
				))}
			<div className='m-8 flex gap-x-4 justify-between'>
				<Button type='primary' size='large' onClick={handleAddNewBus}>
					{" "}
					Add New Bus{" "}
				</Button>
				<div className='flex justify-end'>
					<Button type='primary' size='large' onClick={handleRoutesGeneration}>
						{" "}
						Auto generate routes
					</Button>
				</div>
				<Button
					className='absolute bottom-8 right-8 z-[1000] rounded-full'
					type='primary'
					size='large'
					onClick={handleAddNewStoppage}
				>
					{" "}
					<PlusCircleOutlined /> Add new stoppage{" "}
				</Button>
			</div>
			<Modal
				width={450}
				open={showModal}
				footer={null}
				title='Add new bus'
				onCancel={handleClose}
			>
				<AddBus handleClose={handleClose} />
			</Modal>
		</div>
	);
};

export default MapData;
