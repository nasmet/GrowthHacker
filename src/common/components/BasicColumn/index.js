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
}) {
	return (
		<Chart height={height} data={data} scale={cols} forceFit={forceFit}>
  			<Coord transpose={transpose} />
    		<Axis name="name" />
    		<Axis name="value" />
    		<Legend />
    		<Tooltip />
    		<Geom type="interval" position="name*value" color="name"/>
  		</Chart>
	);
}