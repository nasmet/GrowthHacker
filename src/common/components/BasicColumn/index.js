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
	color,
	yLabel,
	tooltip,
	showTitle = true,
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
  			<Coord transpose={transpose} />
    		<Axis key={x} name={x} />
    		<Axis key={y} name={y} label={yLabel} />
			<Legend />
    		<Tooltip showTitle={showTitle} />
			<Geom 
				type="interval" 
				tooltip={tooltip}
				position={pos} 
				color={color}
				adjust={{ type: 'dodge', marginRatio: 0.05 }}
			 />
 		</Chart> : <Components.NotData style={{height:`${height}px`}} />
	);
}