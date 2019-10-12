import React, {
	Component,
} from 'react';
import styles from './index.module.scss';

export default function Wrap({
	children,
}) {
	return (
		<div className={styles.wrap}>
      		{children}
    	</div>
	);
}