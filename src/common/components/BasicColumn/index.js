import React, {
	Component,
} from "react";
import {
	Chart,
	Geom,
	Axis,
	Tooltip,
} from "bizcharts";

export default function BasicColumn({
	data,
	forceFit = false,
	cols = {},
	height = 400,
}) {
	return (
		<div>
      		<Chart height={height} data={data} scale={cols} forceFit={forceFit}>
        		<Axis name="name" />
        		<Axis name="value" />
        		<Tooltip />
        		<Geom type="interval" position="name*value" />
      		</Chart>
    	</div>
	);
}