import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Loading,
} from '@alifd/next';
import styles from './index.module.scss';

function ShareDistribute({
	name,
	date,
	request,
}, ref) {
	const chartStyle = {
		x: 'desc',
		y: 'count',
		color: 'desc',
		showTitle: false,
	};
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		update: (e) => {
			getDistribute(e);
		},
	}));

	function getDistribute(date) {
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
	}

	useEffect(() => {
		getDistribute(date);

		return ()=>{
			api.cancelRequest();
		}
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

export default forwardRef(ShareDistribute);