import { SET_BUS_DATA, SET_BUS_ROUTE, SET_USER, REMOVE_STOPPAGE, ADD_STOPPAGE, SET_STOPPAGE }	 from "./Constants";

export const initialState = {
	user: null,
	map: {
		position: [24.8949, 91.8687],
	},
	stoppages: [{
		name: "initial",
		id: new Date().getTime(),
		position: [24.8949, 91.8687],
	}],
	buses: [{
		id: 0,
		route: [],
		color: '#369'
	}]
};

const reducer = (state, { type, payload } ) => {
	console.log( {type, payload} )
	switch (type) {
		case SET_USER:
			return {
				...state,
				user: payload.user,
			};
		case SET_STOPPAGE:
			return {
				...state,
				stoppages: state.stoppages.map( stoppage => {
					if( stoppage.id == payload.id ) return payload;
					else return stoppage;
				} )
			}
		case ADD_STOPPAGE:
			return {
				...state,
				stoppages: [
					...(state.stoppages?state.stoppages:[]),
					payload
				],
			};
		case REMOVE_STOPPAGE:
			if( !state.stoppages.length ) return state;
			return {
				...state,
				// TODO: filter stoppages only by selected bus_id
				stoppages: state.stoppages.filter( stoppage => {
					if( stoppage.id == payload.id ) {
						return false;
					} else return true;
				} )
			}
		case SET_BUS_ROUTE:
			return {
				...state,
				buses: state.buses.map( bus => {
					if( bus.id == payload.id ) return ({
						...bus,
						route: payload.route
					})
				} )
			}
		case SET_BUS_DATA: 
			return {
				...state,
				buses: state.buses.map( bus => {
					if( bus.id == payload.id ) return payload;
					else return bus;
				} )
			}
		default:
			return state;
	}
};

export default reducer;
