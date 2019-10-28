import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function AreaDistribute({
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

		return () => {
			api.cancelRequest();
		};
	}, []);

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

export default forwardRef(AreaDistribute);