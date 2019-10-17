import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Icon,
} from '@alifd/next';
import styles from './index.module.scss';

export default function Switch({
	onChange,
}) {
	const [collapse, setCollapse] = useState(false);

	useEffect(() => {
		onChange && onChange(collapse)
	}, [collapse])

	return (
		<div className={styles.wrap}>
    		<Icon
    			className={styles.collapse}
              	type={collapse ? 'arrow-right' : 'arrow-left'}
              	onClick={() => {
               		setCollapse(pre=>!pre);
              	}}
            />
		</div>
	);
}