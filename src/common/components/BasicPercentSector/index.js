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

export default function BasicPercentSector({
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
	const {
		DataView,
	} = DataSet;
	const dv = new DataView();
	dv.source(data).transform({
		type: "percent",
		field: y,
		dimension: x,
		as: "percent"
	});

	const cols = {
		percent: {
			formatter: val => {
				val = (val * 100).toFixed(2) + "%";
				return val;
			}
		}
	};

	return (
		data.length !== 0 ?
		<Chart height={height} data={dv} scale={cols} forceFit={forceFit} >
    		<Coord type="theta" innerRadius={0.3} radius={1} />
    		<Axis name="percent" />
    		<Tooltip showTitle={false} />
    		<Legend />
	        <Geom
	          	type="intervalStack"
	          	position="percent"
	          	color={color}
	          	tooltip={[
	              `${x}*percent`,
	              (item, percent) => {
					percent = (percent * 100).toFixed(2) + "%";
	                return {
	                  name: item,
	                  value: percent
	                };
	              }
	            ]}
	        >
	        	<Label
	              content='percent'
	              formatter={gLabel}
	            />
    		</Geom>
  		</Chart> : <div style={{textAlign:'center',color: '#A0A2AD'}}>没有可视化数据</div>
	);
}