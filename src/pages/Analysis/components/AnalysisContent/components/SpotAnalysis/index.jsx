import React, {
	Component,
} from 'react';
import styles from './index.module.scss';
import BasicPolyline from '../../../../../../components/BasicPolyline'

const data = [{
	name: '一月',
	value: 2000,
}, {
	name: '二月',
	value: 3000,
}, {
	name: '三月',
	value: 2800,
}, {
	name: '四月',
	value: 4000,
}];
export default function SpotAnalysis() {
	return (
		<div className={styles.wrap}>
			<BasicPolyline data={data} forceFit />
    </div>
	);
}