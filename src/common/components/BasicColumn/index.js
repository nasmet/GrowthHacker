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
    		<Axis name={x} />
    		<Axis name={y} label={yLabel} />
			<Legend />
    		<Tooltip />
			<Geom 
				type="interval" 
				tooltip={tooltip}
				position={pos} 
				color={color}
				adjust={{ type: 'dodge', marginRatio: 0.05 }}
			 />
  		</Chart> : <div style={{textAlign:'center',color: '#A0A2AD'}}>没有可视化数据</div>
	);
}