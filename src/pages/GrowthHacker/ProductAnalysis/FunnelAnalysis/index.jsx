import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Loading,
	Button,
	Dialog,
	Input,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import styles from './index.module.scss';
import Filter from './components/Filter';

function FunnelAnalysis({
	history,
}) {
	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [values, setValues] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	const filterChange = (steps, group) => {
		let flag = false;
		if (group === undefined) {
			flag = true;
		}
		steps.forEach((v) => {
			if (!v.values || !v.values.step) {
				flag = true;
			}
		})
		setDisabled(flag);
		setValues({
			steps,
			group,
		});
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onOK = () => {
		setLoading(true);
		api.createBoard({
			steps: values.steps.map(v => v.values.step),
			name,
			type: 'funnel',
			segmentation_id: values.group,
		}).then((res) => {
			model.log('成功添加到看板');
			history.push('/growthhacker/projectdata/db');
		}).catch((e) => {
			setLoading(false);
			model.log(e);
		});
	};

	const onInputChange = (e) => {
		if (e) {
			setSubmitDisabled(false);
		} else {
			setSubmitDisabled(true);
		}
		setName(e);
	};

	const onSave = () => {
		setSubmitDisabled(true);
		setShowDialog(true);
	};

	return (
		<Components.Wrap>
			<p className={styles.titleWrap}>
				<span className={styles.title}>新建漏斗分析</span>
				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
			</p>
      		<Filter filterChange={filterChange} />

			<Dialog autoFocus visible={showDialog} onClose={onClose} footer={false}>
      			<Loading visible={loading} inline={false}>
					<div style={{margin:'20px'}}>
						<p className={styles.name}>请输入看板名称</p>
						<Input onChange={onInputChange} style={{marginBottom:'20px'}} />
						<div>
							<Button type='primary' disabled={submitDisabled} onClick={onOK} style={{marginRight:'20px'}}>确定</Button>
							<Button onClick={onClose}>取消</Button>
						</div>
					</div>
				</Loading>	
			</Dialog>	
    	</Components.Wrap>
	);
}

export default withRouter(FunnelAnalysis);