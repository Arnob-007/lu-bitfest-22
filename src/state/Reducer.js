import { SET_BUS_DATA, SET_BUS_ROUTE, SET_USER, REMOVE_STOPPAGE, ADD_STOPPAGE, SET_STOPPAGE, SET_STOPPAGES, SET_BUSES }	 from "./Constants";

export const initialState = {
	user: null,
	map: {
		position: [24.8949, 91.8687],
	},
	stoppages: [],
	buses: []
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
		case SET_STOPPAGES:

			return {
				...state,
				stoppages: [...payload]
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
					else return bus
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
		case SET_BUSES:
			return {
				...state,
				buses: payload
			}
		default:
			return state;
	}
};

export default reducer;
