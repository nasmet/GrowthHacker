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
}) {
	const ds = new DataSet();
	const dv = ds
		.createView()
		.source(data)
		.transform({
			type: "percent",
			field: "value",
			dimension: "name",
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
		<div>
      		<Chart height={height} data={dv} scale={scale} forceFit={forceFit} >
        		<Coord type="theta" innerRadius={0.3} radius={1} />
        		<Tooltip showTitle={false} />
        		<Legend />
		        <Geom
		          	type="intervalStack"
		          	position="percent"
		          	color="name"
		          	style={{
		            	lineWidth: 2,
		            	stroke: "#fff"
		          	}}
		        >
		          	<Label
		            	content="percent"
		            	formatter={(val, item) => {
		              		return item.point.name + ": " + val;
		            	}}
		          	/>
        		</Geom>
      		</Chart>
    	</div>
	);
}