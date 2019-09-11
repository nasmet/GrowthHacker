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
}) {
	const ds = new DataSet();
	const dv = ds
		.createView()
		.source(data)
		.transform({
			type: "percent",
			field: x,
			dimension: y,
			as: "percent"
		});
	const scale = {
		percent: {
			formatter: val => {
				val = (val * 100).toFixed(2) + "%";
				return val;
			}
		},
		nice: false
	};

	return (
		data.length !== 0 ?
		<Chart height={height} data={dv} scale={scale} forceFit={forceFit} >
    		<Coord type="theta" innerRadius={0.3} radius={1} />
    		<Tooltip showTitle={false} />
    		<Legend />
	        <Geom
	          	type="intervalStack"
	          	position="percent"
	          	color={x}
	          	style={{
	            	lineWidth: 2,
	            	stroke: "#fff"
	          	}}
	        >
	          	<Label
	            	content="percent"
	            	formatter={(val, item) => {
	              		return item.point[{x}] + ": " + val;
	            	}}
	          	/>
    		</Geom>
  		</Chart> : <div style={{textAlign:'center',color: '#A0A2AD'}}>没有数据</div>
	);
}