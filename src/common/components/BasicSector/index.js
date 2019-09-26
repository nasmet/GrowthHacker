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
import DataSet from "@antv/data-set";

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
	        <Geom
	          	type="intervalStack"
	          	position={pos}
	          	color={color}
	        >
	        	<Label
	              content={pos}
	              formatter={gLabel}
	            />
    		</Geom>
  		</Chart> : <div style={{textAlign:'center',color: '#A0A2AD'}}>没有可视化数据</div>
	);
}