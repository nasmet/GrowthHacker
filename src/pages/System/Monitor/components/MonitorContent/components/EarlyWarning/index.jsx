import React, {
	Component,
	useEffect,
	useState,
	Fragment,
} from 'react';
import {
	Button,
	Loading,
	Message,
} from '@alifd/next';
import styles from './index.module.scss';

export default function EarlyWarning() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	let cancelTask = false;

	useEffect(() => {
		setLoading(true);
		api.getEarlyWarning().then((res) => {
			if (cancelTask) {
				return;
			}

			setData(res);
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

	const renderData = () => {
		if (!data) {
			return null;
		}

		if(utils.isEmptyObject(data)){
			return (
				<span>暂无数据</span>
			);
		}
	
		const {
			total,
			increase,
			growth_rate,
			alarm_mail,
			alarm_sms,
		} = data;
		return (
			<Fragment>
				<div className={styles.item}>
	      			<span className={styles.name}>信息总条数:</span>
	      			<span className={styles.value}>{total}</span>
	        	</div>
	        	<div className={styles.item}>
	      			<span className={styles.name}>信息新增条数:</span>
	      			<span className={styles.value}>{increase}</span>
	        	</div>
	        	<div className={styles.item}>
	      			<span className={styles.name}>同比增长率:</span>
	      			<span className={styles.value}>{growth_rate}</span>
	        	</div>
	        	<div className={styles.item}>
	      			<span className={styles.name}>告警邮件:</span>
	      			<span className={styles.value}>{alarm_mail}</span>
	        	</div>
	        	<div className={styles.item}>
	      			<span className={styles.name}>告警短信:</span>
	      			<span className={styles.value}>{alarm_sms}</span>
	        	</div>
        	</Fragment>
		);
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
	      		{renderData()}
	    	</div>
    	</Loading>
	);
}