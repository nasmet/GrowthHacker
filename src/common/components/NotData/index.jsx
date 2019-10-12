import React, {
	Component,
} from 'react';
import styles from './index.module.scss';

export default function NotData({
	style,
	text = '暂无数据',
}) {
	return (
		<div className={styles.content} style={style}>
      		{text}
    	</div>
	);
}