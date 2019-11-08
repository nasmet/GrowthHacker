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
	width=300,
	height = 300,
	forceFit = false,
	x = 'name',
	y = 'value',
	color,
	cols = {},
	yLabel,
	tooltip,
	gLabel,
	showTitle = false,
	src,
}) {
	const pos = `${x}*${y}`;

	return (
		data.length !== 0 ?
		<Chart
			padding={[0,0,60,0]}
			margin={[0, 0, 0, 0]}
			width={width}
          	height={height+60}
          	data={data}
          	forceFit={forceFit}
          	scale={cols}
        >
	        <Tooltip showTitle={showTitle} title={pos} />
	        <Legend />
	        <Geom
	          	type="heatmap"
	            position={pos}
                color={[
	              `${color}`,
	              "#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2"
	            ]}
	        />
          		<Guide>
            		<Guide.Image
          				start={[0, height]}
          				end={[width, 0]}
            			src={src}
            		/>
          		</Guide>
        </Chart> : <Components.NotData style={{height:`${height}px`}} />
	);
}