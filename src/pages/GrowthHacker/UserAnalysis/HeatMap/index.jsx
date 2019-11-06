import React from 'react';
import {
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import img from './images/DCIM.jpg';

export default function HeatMap() {
	const [width, height] = [375, 667];

	const chartStyle = {
		x: 'x',
		y: 'y',
		width,
		height,
		color: 'count',
		src: img,
		showTitle: true,
	}

	function createBoundary(x, y) {
		return {
			x,
			y,
			count: 0,
		}
	}

	const boundary_1 = createBoundary(0, 0);
	const boundary_2 = createBoundary(0, height);
	const boundary_3 = createBoundary(width, 0);
	const boundary_4 = createBoundary(width, height);
	
	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getHeatMap, {
		date: 'day:0',
	});
	const {
		points = [],
	} = response;

	const dateChange = e => {
		updateParameter({ ...parameter,
			date: e,
		});
	};

	function assembleData() {
		points.push(boundary_1);
		points.push(boundary_2);
		points.push(boundary_3);
		points.push(boundary_4);
		return points;
	}

	return (
		<Components.Wrap>
			<Components.Title title='首页热力图' />
			<Components.DateFilter filterChange={dateChange} />	
			<Loading visible={loading} inline={false}>
				<div className={styles.chartWrap}>
					<Components.BasicHeatMap data={assembleData()} {...chartStyle} />
				</div>
			</Loading>
		</Components.Wrap>
	);
}