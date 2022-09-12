import {
	ArrowRightOutlined,
	EditOutlined,
	EditTwoTone,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Divider, Form, message, Modal, Tag } from "antd";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../firebase";
import { mapPageContext } from "../../pages/Leaflet";
import { useStateValue } from "../../state/StateProvider";
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
			<div className='m-8 flex gap-x-4'>
				<Button type='primary' size='large' onClick={handleAddNewBus}>
					{" "}
					Add New Bus{" "}
				</Button>
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
