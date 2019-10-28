import React from "react";
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
		as: "percent",
	});

	const cols = {
		percent: {
			formatter: val => {
				val = utils.transformPercent(val);
				return val;
			},
		},
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
						percent = utils.transformPercent(percent);
						return {
							name: item,
							value: percent,
						};
					},
				]}
			>
				<Label content='percent' formatter={gLabel} />
			</Geom>
		</Chart> : <Components.NotData style={{height:`${height}px`}} />
	);
}