import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Step from './components/Step';

function CreateRule({
	history,
}) {
	const [showDialog, setShowDialog] = useState(false);
	const [name, setName] = useState('');
	const [combination, setCombination] = useState('');
	const [steps, setSteps] = useState([]);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	const filterChange = (step, expression) => {
		setDisabled(expression ? false : true);
		setSteps(step);
		setCombination(expression);
	};

	const onSave = () => {;
		setSubmitDisabled(true);
		setShowDialog(true);
	};

	const onCancel = () => {
		history.goBack();
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const transformData = (result) => {
		steps.forEach((item) => {
			item.step.forEach(v => {
				result.conditions.push(v.values);
			})
		});
		return result;
	}

	const onOK = () => {
		let result = {
			condition_expr: combination,
			name,
			conditions: [],
		};
		transformData(result);
		setLoading(true);
		api.createUserGroup(result).then((res) => {
			model.log('创建成功');
			history.goBack();
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

	return (
		<div className={styles.wrap}>
      		<div className={styles.leftContent}>
      			<Step filterChange={filterChange} />
      		</div>
      		<div className={styles.rightContent}>
      			<div className={styles.btnWrap}>
      				<Button onClick={onCancel}>取消</Button>
      				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
      			</div>
      		</div>

      		<Dialog autoFocus visible={showDialog} onClose={onClose} footer={false}>
      			<Loading visible={loading} inline={false}>
					<div style={{margin:'20px'}}>
						<p className={styles.name}>请输入规则名称</p>
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

export default withRouter(CreateRule);
