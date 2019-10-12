import React, {
	Component,
} from 'react';
import styles from './index.module.scss';

export default function Title({
	title,
}) {
	return (
		<p className={styles.title}>{title}</p>
	);
}