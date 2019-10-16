import React, {
	Component,
} from 'react';
import styles from './index.module.scss';

export default function Title({
	title,
	desc,
}) {
	return (
		<p>
			<span className={styles.title}>{title}</span>
			{desc && <span className={styles.desc}>({desc})</span>}
		</p>
	);
}