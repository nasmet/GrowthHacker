import React, {
	Component,
} from "react";
import {
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
} from "bizcharts";

export default function BasicPolyline({
	data,
	forceFit = false,
	cols = {},
	height = 400,
	x = 'name',
	y = 'value',
}) {
	const pos = `${x}*${y}`;
	return (
		<div>
      		<Chart height={height} data={data} scale={cols} forceFit>
	        	<Axis name={x} />
	        	<Axis name={y} />
	        	<Tooltip />
	        	<Geom type="line" position={pos} size={2} />
	        	<Geom type="point" position={pos} size={4} />
      		</Chart>
    	</div>
	);
}