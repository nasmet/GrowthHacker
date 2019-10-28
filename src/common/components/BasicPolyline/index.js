import React from "react";
import {
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Legend,
} from "bizcharts";

export default function BasicPolyline({
	data,
	forceFit = false,
	cols = {},
	height = 400,
	x = 'name',
	y = 'value',
	color,
	yLabel,
	tooltip,
}) {
	const pos = `${x}*${y}`;

	return (
		data.length !== 0 ?
		<Chart 
			height={height}
			data={data} 
			scale={cols} 
			forceFit={forceFit}
		>
			<Axis name={x} />
			<Axis name={y} label={yLabel} />
			<Legend />
			<Tooltip />
			<Geom 
				shape={"smooth"} 
				type="line" 
				tooltip={tooltip} 
				position={pos} 
				size={2} 
				color={color} />
			<Geom 
				type="point" 
				shape={'circle'} 
				position={pos} 
				size={4} 
				color={color} 
			/>
		</Chart> : <Components.NotData style={{height:`${height}px`}} />
	);
}