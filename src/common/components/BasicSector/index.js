import React, {
	Component,
} from "react";
import {
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
} from "bizcharts";

export default function BasicSector({
	data,
	height = 300,
	forceFit = false,
	x = 'name',
	y = 'value',
	color,
	yLabel,
	tooltip,
	gLabel,
}) {
	const pos = `${x}*${y}`;

	return (
		data.length !== 0 ?
		<Chart height={height} data={data} forceFit={forceFit} >
    		<Coord type="theta" innerRadius={0.3} radius={1} />
    		<Tooltip />
    		<Legend />
	        <Geom type="intervalStack" position={pos} color={color} >
	        	<Label content={pos} formatter={gLabel} />
    		</Geom>
 		</Chart> : <Components.NotData style={{height:`${height}px`}} />
	);
}