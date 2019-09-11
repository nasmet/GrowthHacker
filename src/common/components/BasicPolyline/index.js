import React, {
	Component,
} from "react";
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
}) {
	const pos = `${x}*${y}`;

	return (
		data.length !== 0 ?
		<Chart height={height} data={data} scale={cols} forceFit>
			<Axis name={x} />
        	<Axis name={y} />
        	<Legend />
        	<Tooltip />
        	<Geom type="line" position={pos} size={2} color={color?color:x} />
        	<Geom type="point" shape={'circle'} position={pos} size={4} color={color?color:x} />
      	</Chart> : <div style={{textAlign:'center',color: '#A0A2AD'}}>没有数据</div>
	);
}