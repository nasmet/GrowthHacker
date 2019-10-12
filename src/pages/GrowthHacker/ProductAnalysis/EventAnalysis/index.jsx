import React, {
	Component,
	useState,
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
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';

function EventAnalysis({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [name, setName] = useState('');
	const [values, setValues] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	const filterChange = (e) => {
		const {
			dimensions,
			metrics,
			segmentation_id,
		} = e;
		if (dimensions.length > 0 && metrics.length > 0 && segmentation_id !== '') {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
		setValues(e);
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onOK = () => {
		setLoading(true);
		api.createBoard({ ...values,
			name,
			type: 'dashboard'
		}).then((res) => {
			Message.success('成功添加到看板');
			history.push('/growthhacker/projectdata/db');
		}).catch((e) => {
			model.log(e);
			setLoading(false);
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
				<span className={styles.title}>新建事件分析</span>
				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
			</p>
			<IceContainer>
				<Filter filterChange={filterChange} />
			</IceContainer>
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

export default withRouter(EventAnalysis);