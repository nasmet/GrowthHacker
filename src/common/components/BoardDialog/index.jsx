import React, {
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Input,
	Button,
	Loading,
	Dialog,
} from '@alifd/next';
import styles from './index.module.scss';

function BoardDialog({
	onOk,
	onInputChange,
	title='请输入名称',
}, ref) {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);

	useImperativeHandle(ref, () => ({
		onShow: () => {
			setVisible(true);
		},
	}));

	const onChange = (e) => {
		if (e) {
			setDisabled(false);
			onInputChange(e);
		} else {
			setDisabled(true);
		}
	};

	const submit = () => {
		setLoading(true);
		onOk(() => {
			setLoading(false);
			setVisible(false);
		}, () => {
			setLoading(false);
		});
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<Dialog autoFocus visible={visible} closeable={false} onClose={onClose} footer={false}>
			<Loading visible={loading} inline={false}>
				<div style={{margin:'20px'}}>
					<p className={styles.name}>{title}</p>
					<Input onChange={onChange} style={{marginBottom:'20px'}} />
					<div>
						<Button type='primary' disabled={disabled} onClick={submit} style={{marginRight:'20px'}}>确定</Button>
						<Button onClick={onClose}>取消</Button>
					</div>
				</div>
			</Loading>	
		</Dialog>
	);
}

export default forwardRef(BoardDialog);