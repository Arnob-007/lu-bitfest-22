export const generateRoutes = (stoppages, buses_main, times) => {
	console.log(buses_main);
	buses_main = buses_main.map((bus) => {
		return { ...bus, capacity: parseInt(bus.capacity) };
	});
	console.log("Buses", buses_main);
	let time_demand = stoppages.reduce(
		(prev, curr) => {
			console.log("CURRENT", curr);
			Object.keys(curr.weight).forEach((time) => {
				prev[time] += curr.weight[time];
			});
			return prev;
		},
		times.reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {})
	);

	time_demand = Object.keys(time_demand).map((time) => ({
		time,
		demand: time_demand[time],
	}));

	const generate_paths = (st_i, bus, time) => {
		console.log("gg");
		if (stoppages[st_i].weight[time] <= 0 || stoppages[st_i].disabled)
			return [];
		let routes = [];
		const passenger_taken = Math.min(
			stoppages[st_i].weight[time],
			bus.capacity
		);

		if (bus.capacity <= passenger_taken) {
			return [[{ i: st_i, p: passenger_taken }]];
		}

		// stoppages[st_i].disabled = true;
		bus.capacity -= passenger_taken;
		stoppages[st_i].weight[time] -= passenger_taken;

		for (let st_ix = 0; st_ix < stoppages.length; st_ix++) {
			const ret = generate_paths(st_ix, { ...bus }, time);
			if (ret.length > 0) {
				routes.push(
					...ret.map((path) => {
						return [{ i: st_i, p: passenger_taken }, ...path];
					})
				);
			} else {
				routes.push([{ i: st_i, p: passenger_taken }]);
			}
		}

		// stoppages[st_i].disabled = false;
		bus.capacity += passenger_taken;
		stoppages[st_i].weight[time] += passenger_taken;

		// console.log("lol",stoppages[st_i].disabled[time]);

		return routes;
	};

	const calc_cost = (path) => {
		return path.reduce((prev, curr) => prev + curr.p, 0);
	};

	const chk = (bus_i, st_i, time, buses) => {
		let route_plan = {
			cost: 0,
			plan: [],
		};

		// if no bus as been allocated
		if (buses.length === 0) return route_plan;

		// console.log("buses", buses);

		const paths = generate_paths(st_i, buses[bus_i], time);

		paths.forEach((path) => {
			const passenger_taken = calc_cost(path);
			if (passenger_taken > route_plan.cost) {
				route_plan = {
					cost: passenger_taken,
					plan: [{ bus_id: buses[bus_i].id, path: path }],
				};
			}
			// console.log(bus_i, st_i, path)
			path.forEach((pd) => (stoppages[pd.i].weight[time] -= pd.p));
			for (let st_ix = 0; st_ix < stoppages.length; st_ix++) {
				for (let bus_ix = bus_i + 1; bus_ix < buses.length; bus_ix++) {
					const ret = chk(bus_ix, st_ix, time, buses);
					if (ret.cost + passenger_taken > route_plan.cost) {
						route_plan = {
							cost: ret.cost + passenger_taken,
							plan: [{ bus_id: buses[bus_i].id, path: path }, ...ret.plan],
						};
					}
				}
			}
			path.forEach((pd) => (stoppages[pd.i].weight[time] += pd.p));
		});

		return route_plan;
	};

	time_demand.sort((a, b) => (a.demand < b.demand ? 1 : -1));

	let allocated_bus = times.reduce(
		(prev, curr) => ({ ...prev, [curr]: [] }),
		{}
	);

	let bus_idx = 0;
	let time_demand_idx = 0;
	console.log("Time demand idx", time_demand);
	for (; bus_idx < buses_main.length; bus_idx++) {
		while (
			time_demand_idx < time_demand.length &&
			// time_demand[time_demand_idx].demand < buses_main[bus_idx].capacity
			time_demand[time_demand_idx].demand <= 0
		) {
			time_demand_idx++;
		}

		if (time_demand_idx >= time_demand.length) break;

		allocated_bus[time_demand[time_demand_idx].time].push(
			buses_main[bus_idx].id
		);
		time_demand[time_demand_idx].demand -= Math.min(
			time_demand[time_demand_idx].demand,
			buses_main[bus_idx].capacity
		);
	}

	console.log("Allocated bus", allocated_bus);

	const schedule = {};

	Object.keys(allocated_bus).forEach((time) => {
		const buses = buses_main.filter(
			(bus) => allocated_bus[time].indexOf(bus.id) !== -1
		);

		console.log("buses", allocated_bus[time]);

		const ret = chk(0, 0, time, buses);

		schedule[time] = ret.plan;
		console.log(ret.plan);
	});

	console.log(generate_paths(0, buses_main[0], 8));

	return schedule;
};
