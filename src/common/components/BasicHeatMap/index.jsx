import React from "react";
import {
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	Guide,
} from "bizcharts";

export default function BasicHeatMap({
	data,
	height = 300,
	forceFit = false,
	x = 'name',
	y = 'value',
	color,
	cols={},
	yLabel,
	tooltip,
	gLabel,
	showTitle = false,
	src="https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png",
}) {
	const pos = `${x}*${y}`;

	return (
		data.length !== 0 ?
		<Chart
          height={height}
          data={data}
          forceFit={forceFit}
          scale={cols}
        >
          <Tooltip showTitle={showTitle} />
          <Legend />
          <Geom
            type="heatmap"
            position={pos}
            color={color}
          />
          <Guide>
            <Guide.Image
              start={["min", "max"]}
              end={["max", "min"]}
              src={src}
            />
          </Guide>
        </Chart> : <Components.NotData style={{height:`${height}px`}} />
	);
}