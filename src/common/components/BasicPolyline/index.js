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
}) {
	return (
		<div>
      		<Chart height={height} data={data} scale={cols} forceFit>
	        	<Axis name="name" />
	        	<Axis name="value" />
	        	<Tooltip />
	        	<Geom type="line" position="name*value" size={2} />
	        	<Geom type="point" position="name*value" size={4} />
      		</Chart>
    	</div>
	);
}