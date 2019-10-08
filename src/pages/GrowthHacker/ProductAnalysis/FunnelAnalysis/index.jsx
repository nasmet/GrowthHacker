import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Message,
	Loading,
	DatePicker,
	Button,
	Dialog,
	Input,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import styles from './index.module.scss';
import Filter from './components/Filter';
import * as funnelAnalysisConfig from './funnelAnalysisConfig';

moment.locale('zh-cn');
const {
	RangePicker,
} = DatePicker;
const {
	Column,
} = Table;
const limit = 10;

function FunnelAnalysis({
	history,
}) {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;

	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [group, setGroup] = useState(0);
	const [name, setName] = useState('');
	const [values, setValues] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	useEffect(() => {

		return () => {
			cancelTask = true;
		};
	}, []);

	const filterChange = (e) => {
		setDisabled(e.length === 0 ? true : false);
		setValues(e);
	};

	const groupChange = (e) => {
		setGroup(e);
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onOK = () => {
		setLoading(true);
		api.createBoard({
			id: projectId,
			trend: {
				steps: values.map(v => v.values.step),
				name,
				type: 'funnel',
				segmentation_id: group,
			}
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			Message.success('成功添加到看板');
			history.push('/growthhacker/projectdata/db');
		}).catch((e) => {
			setLoading(false);
			Message.success(e.toString());
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
		<div className={styles.wrap}> 
			<p className={styles.titleWrap}>
				<span className={styles.title}>新建漏斗分析</span>
				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
			</p>
      		<Filter filterChange={filterChange} groupChange={groupChange} />

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
    	</div>
	);
}

export default withRouter(FunnelAnalysis);