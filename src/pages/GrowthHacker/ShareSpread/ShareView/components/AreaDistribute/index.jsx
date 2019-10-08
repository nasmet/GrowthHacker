import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function AreaDistribute({
	name,
	date,
	request,
}) {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;
	const chartStyle = {
		x: 'desc',
		y: 'count',
		color: 'desc',
		showTitle: false,
	};

	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		request({
			projectId,
			trend: {
				date,
			}
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			setChartData(res.data);
		}).catch((e) => {
			console.error(e);
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});

		return () => {
			cancelTask = true;
		};
	}, [date]);

	return (
		<Loading visible={loading} inline={false}>
			<IceContainer>
				<span>{name}</span>
				<div className={styles.content}>
					<Components.BasicColumn data={chartData} {...chartStyle} />
				</div>
			</IceContainer>
		</Loading>
	);
}