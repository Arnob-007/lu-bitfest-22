const times = [6,7,8,9,10];


let stoppages = JSON.parse(`[{"position":[24.919133681468658,91.87591552734376],"id":1662914534205,"name":"default"},{"position":[24.913996125238643,91.84546876096438],"name":"default","id":1662918432113},{"name":"default","position":[24.91960072142321,91.85560544603804],"id":1662918785532},{"id":1662918845104,"name":"default","position":[24.91384043837595,91.85251289804947]},{"position":[24.911660801667054,91.8999481201172],"name":"default","id":1662919018628},{"name":"default4545","id":1662919073686,"position":[24.914774556604627,91.8760506244069]},{"position":[24.893288048031646,91.85440278848694],"name":"default8888888","id":1662919139331},{"id":1662919141826,"position":[24.881920483870495,91.88927985746909],"name":"default"},{"position":[24.88005174305999,91.8285369873047],"id":1662919327599,"name":"default"},{"name":"default123","id":1662919892769,"position":[24.894689456089782,91.82287216186525]},{"id":1662922039083,"position":[24.927073120131514,91.8240737915039],"name":"default"},{"position":[24.898426466475684,91.84141159057619],"name":"default","id":1662925900837}]`)

stoppages = [
    {
        "id":1,
        "name": "Airport",
        "position":[24.963851,91.861224],
        "weight": 5
    },
    {
        "id":2,
        "name": "Ambarkhana",
        "position":[24.903560,91.873610],
        "weight": 12
    },
    {
        "id":3,
        "name": "Modina market",
        "position":[24.823123,91.885210],
        "weight": 24
    },
    {
        "id":4,
        "name": "SUST",
        "position":[24.932560,91.891210],
        "weight": 15
    },
    {
        "id":5,
        "name": "Temukhi",
        "position":[24.912560,91.912810],
        "weight": 7
    },
    {
        "id":6,
        "name": "Tilagor",
        "position":[24.883560,91.873610],
        "weight": 20
    },
    {
        "id":7,
        "name": "Shah Poran",
        "position":[24.922260,91.873610],
        "weight": 3

    }
]

stoppages = stoppages.map( stoppage => {
    const stoppage_t = {...stoppage};
    stoppage_t.weight = {};
    times.forEach( time => {
        stoppage_t.weight[time] = stoppage.weight*5;
    } )
    return stoppage_t;
} )

let buses = JSON.parse(`[{"route":[1662918432113,1662918845104,1662919073686],"color":"#369","id":0},{"route":[1662918845104],"id":1662920502492,"color":"#369"},{"color":"#369","route":[],"id":1662922838172},{"route":[],"id":1662922852170,"color":"#369"}]`);

buses = [
    {
        "id": "1",
        "license": "432sdf5",
        "code": "SP1",
        "cap": "60",
        "driver":{
            "name": "Adam",
            "contact": "1234567891"
        },
        "isActive": "true"
    },
    {
        "id": "2",
        "license": "2343b5",
        "code": "AP1",
        "cap": "60",
        "driver":{
            "name": "John",
            "contact": "1234567892"
        },
        "isActive": "true"
    },
    {
        "id": "3",
        "license": "jasdbf7",
        "code": "CM1",
        "cap": "60",
        "driver":{
            "name": "Doe",
            "contact": "1234567893"
        },
        "isActive": "true"
    },
    {
        "id": "4",
        "license": "agsd63",
        "code": "KT1",
        "cap": "60",
        "driver":{
            "name": "Wood",
            "contact": "1234567894"
        },
        "isActive": "true"
    },
    {
        "id": "5",
        "license": "vw5vw34",
        "code": "AP2",
        "cap": "50",
        "driver":{
            "name": "Chris",
            "contact": "1234567895"
        },
        "isActive": "true"
    },
    {
        "id": "6",
        "license": "jw39nks",
        "code": "AP3",
        "cap": "50",
        "driver":{
            "name": "Biju",
            "contact": "1234567896"
        },
        "isActive": "true"
    },
    {
        "id": "7",
        "license": "ia4928d",
        "code": "CM2",
        "cap": "50",
        "driver":{
            "name": "Das",
            "contact": "1234567897"
        },
        "isActive": "false"
    },
    {
        "id": "8",
        "license": "34kjhgv2",
        "code": "SP2",
        "cap": "50",
        "driver":{
            "name": "Paul",
            "contact": "1234567898"
        },
        "isActive": "true"
    },
    {
        "id": "9",
        "license": "oia8329d",
        "code": "KT2",
        "cap": "50",
        "driver":{
            "name": "Deb",
            "contact": "1234567899"
        },
        "isActive": "true"
    },
    {
        "id": "10",
        "license": "ajih46278",
        "code": "CM3",
        "cap": "50",
        "driver":{
            "name": "Bir",
            "contact": "1234567900"
        },
        "isActive": "true"
    },
    {
        "id": "11",
        "license": "pa77w8s",
        "code": "CM3",
        "cap": "50",
        "driver":{
            "name": "Kuddus",
            "contact": "1234567901"
        },
        "isActive": "false"
    },
    {
        "id": "12",
        "license": "qfc6s823",
        "code": "KT3",
        "cap": "50",
        "driver":{
            "name": "Rahim",
            "contact": "1234567902"
        },
        "isActive": "true"
    },
    {
        "id": "13",
        "license": "sodbis783",
        "code": "AP4",
        "cap": "50",
        "driver":{
            "name": "Karim",
            "contact": "1234567903"
        },
        "isActive": "true"
    },
    {
        "id": "14",
        "license": "sdihf3q3",
        "code": "SP3",
        "cap": "50",
        "driver":{
            "name": "Abdul",
            "contact": "1234567904"
        },
        "isActive": "true"
    }
]

buses_main = buses.map( bus => {
    return { ...bus, capacity: parseInt(bus.cap) };
} )






// console.log(stoppages);

// console.log( "paths", generate_paths(0, buses_main[1], times[0]) )



// [
//     {bus_id: 1, path: [4,7,5,8], starting_time: 8},
//     {bus_id: 2, path: [3,6,1,9], starting_time: 9}
// ]


const findRoutes = ( stoppages, buses_main ) => {

    const times = [6,7,8,9,10];

    let time_demand = stoppages.reduce( (prev, curr) => {
        Object.keys( curr.weight ).forEach( time => {
            prev[time] += curr.weight[time]
        } )
        return prev;
    }, times.reduce( (prev, curr) => ({...prev, [curr]: 0}), {} ) );
    
    time_demand = Object.keys( time_demand ).map( time => (
        {time, demand: time_demand[time]}
    ) )

    const generate_paths = (st_i, bus, time) => {
        if( stoppages[st_i].weight[time] <= 0 || stoppages[st_i].disabled ) return [];
        let routes = [];
        const passenger_taken = Math.min( stoppages[st_i].weight[time], bus.capacity );
        
        if( bus.capacity <= passenger_taken ) {
            return [ [ {i: st_i, p: passenger_taken} ] ];
        }
    
        stoppages[st_i].disabled = true;
        bus.capacity -= passenger_taken;
        stoppages[st_i].weight[time] -= passenger_taken;
        
        for( let st_ix=0; st_ix<stoppages.length; st_ix++ ) {
            
            const ret = generate_paths(st_ix, {...bus}, time);
            if( ret.length > 0 ) {
                routes.push( ...ret.map( path => {
                    return [ { i: st_i, p: passenger_taken }, ...path ]
                }) );
            }
        }
    
        stoppages[st_i].disabled = false;
        bus.capacity += passenger_taken;
        stoppages[st_i].weight[time] += passenger_taken;
    
        // console.log("lol",stoppages[st_i].disabled[time]);
    
        return routes;
    }
    
    const calc_cost = (path) => {
        return path.reduce( (prev, curr) => prev + curr.p, 0 );
    }
    
    
    const chk = (bus_i, st_i, time, buses) => {
    
        let route_plan = {
            cost: 0,
            plan: []
        };
    
        // if no bus as been allocated
        if( buses.length == 0 ) return route_plan;
    
        // console.log("buses", buses);
    
        const paths = generate_paths( st_i, buses[bus_i], time );
    
        paths.forEach( path => {
            const passenger_taken = calc_cost(path);
            if( passenger_taken > route_plan.cost ) {
                route_plan = {
                    cost: passenger_taken,
                    plan: [ 
                        { bus_id: buses[bus_i].id, path: path },
                    ]
                }
            }
            // console.log(bus_i, st_i, path)
            path.forEach( pd => stoppages[pd.i].weight[time] -= pd.p );
            for( let st_ix=0; st_ix < stoppages.length; st_ix++  ) {
                for( let bus_ix=bus_i+1; bus_ix < buses.length; bus_ix++ ) {
                    const ret = chk( bus_ix, st_ix, time, buses );
                    if( ret.cost + passenger_taken > route_plan.cost ) {
                        route_plan = {
                            cost: ret.cost + passenger_taken,
                            plan: [ 
                                { bus_id: buses[bus_i].id, path: path },
                                ...ret.plan
                            ]
                        }
                    }
                }
            }
            path.forEach( pd => stoppages[pd.i].weight[time] += pd.p );
        } )
        
    
        return route_plan;
    
    }
    
    
    time_demand.sort( (a,b) => a.demand < b.demand ? 1 : -1 );
    
    let allocated_bus = times.reduce( (prev, curr) => ({...prev, [curr]: []}), {} );
    
    let bus_idx = 0;
    let time_demand_idx = 0;
    for( ; bus_idx < buses_main.length; bus_idx++ ) {
        while( time_demand_idx < time_demand.length && time_demand[time_demand_idx].demand < buses_main[bus_idx].capacity ) {
            time_demand_idx++;
            // console.log(time_demand_idx)
        }
        
        if( time_demand_idx >= time_demand.length ) break; 
    
        allocated_bus[time_demand[time_demand_idx].time].push( buses_main[bus_idx].id );
        time_demand[time_demand_idx].demand -= buses_main[bus_idx].capacity;
    }
    
    // console.log(allocated_bus);

    const schedule = {}
    
    Object.keys( allocated_bus ).map( time => {
    
        buses = buses_main
            .filter( bus => allocated_bus[time].indexOf( bus.id ) != -1 )
    
        console.log("buses",allocated_bus[time]);

        const ret = chk( 0, 0, time, buses );

        schedule[time] = ret.plan;
        console.log( ret.plan );
    
    } )

    return schedule;
}


console.log( findRoutes( stoppages, buses_main ) );