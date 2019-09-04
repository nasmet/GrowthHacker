import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Loading,
	Message,
} from '@alifd/next';
import styles from './index.module.scss';

export default function SpotAnalysis() {
	const [loading, setLoading] = useState(false);
	const [spots, setSpots] = useState([]);
	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		setLoading(true);
		api.getSpotAnalysis().then((res) => {
			if (cancelTask) {
				return;
			}

			const {
				spots,
			} = res;
			setSpots(spots);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});

		return () => {
			cancelTask = true;
		};
	}, []);

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
				<Components.BasicPolyline data={spots} forceFit />
	    	</div>
    	</Loading>
	);
}