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

export default function BasicColumn({
	data,
	forceFit = false,
	cols = {}, // 设置变量的别名
	height = 400,
	transpose = false, // fasle 纵向柱图 true 横向柱图
	x = 'name',
	y = 'value',
}) {
	const pos = `${x}*${y}`;
	return (
		<Chart height={height} data={data} scale={cols} forceFit={forceFit}>
  			<Coord transpose={transpose} />
    		<Axis name={x} />
	       	<Axis name={y} />
			<Legend />
    		<Tooltip />
			<Geom 
				type="interval" 
				position={pos} 
				color="name"
			 />
  		</Chart>
	);
}