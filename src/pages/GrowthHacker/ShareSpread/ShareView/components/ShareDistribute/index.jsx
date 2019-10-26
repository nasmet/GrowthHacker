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

export default function ShareDistribute({
	name,
	date,
	request,
}) {
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
			date,
		}).then((res) => {
			setChartData(res.data);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});

		return () => {
			api.cancelRequest();
		};
	}, []);


	return (
		<div className={styles.userShareItem}>
			<Loading visible={loading} inline={false}>
				<p style={{paddingLeft:'20px'}}>{name}</p>
				<div className={styles.userShareItemChart}>
					<Components.BasicColumn data={chartData} {...chartStyle} />
				</div>
			</Loading>
		</div>
	);
}