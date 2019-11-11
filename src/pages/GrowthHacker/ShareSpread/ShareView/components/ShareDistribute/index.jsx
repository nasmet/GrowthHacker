import React, {
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

	useImperativeHandle(ref, () => ({
		update: date => {
			updateParameter({ ...parameter,
				date,
			});
		},
	}));

	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(request, {
		date,
	});

	const {
		data = [],
	} = response;

	return (
		<div className={styles.userShareItem}>
			<Loading visible={loading} inline={false}>
				<p style={{paddingLeft:'20px'}}>{name}</p>
				<div className={styles.userShareItemChart}>
					<Components.BasicColumn data={data} {...chartStyle} />
				</div>
			</Loading>
		</div>
	);
}

export default forwardRef(ShareDistribute);