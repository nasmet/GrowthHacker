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
      <Chart
        height={height}
        data={dv}
        scale={scale}
        forceFit={forceFit}
      >
        <Coord type="theta" innerRadius={0.3} radius={1} />
        <Tooltip
          showTitle={false}
          itemTpl="<li data-index={index}><span style=&quot;color:{color}&quot;>{name}:</span>{value}</li>"
        />
        <Legend
          useHtml={true}
          position="left"
          containerTpl="<div class=&quot;g2-legend&quot;><table class=&quot;g2-legend-list&quot; style=&quot;list-style-type:none;margin:0;padding:0;&quot;></table></div>"
          itemTpl={(value, color, checked, index) => {
            const obj = dv.rows[index];
            checked = checked ? "checked" : "unChecked";
            return (
              '<tr class="g2-legend-list-item item-' +
              index +
              " " +
              checked +
              '" data-value="' +
              value +
              '" data-color=' +
              color +
              ' style="cursor: pointer;font-size: 14px;">' +
              '<td width=150 style="border: none;padding:0;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
              color +
              ';"></i>' +
              '<span class="g2-legend-text">' +
              value +
              "</span></td>" +
              '<td style="text-align: right;border: none;padding:0;">' +
              obj.value +
              "</td>" +
              "</tr>"
            );
          }}
          g2-legend={{
            marginLeft: "100px",
            marginTop: "-107px"
          }}
          g2-legend-list={{
            border: "none"
          }}
        />
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