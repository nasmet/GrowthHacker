import React, {
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Button,
} from '@alifd/next';
import styles from './index.module.scss';

function Save({
	title,
	onSave,
	desc = '',
	disable = true,
}, ref) {
	const [disabled, setDisabled] = useState(disable);

	useImperativeHandle(ref, () => ({
		setButtonStatus: e => {
			setDisabled(e);
		},
	}));

	return (
		<div className={styles.titleWrap}>
			<Components.Title title={title} desc={desc} />
			<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
		</div>
	);
}

export default forwardRef(Save);