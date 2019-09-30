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

function CreateGroup() {
	const projectId = sessionStorage.getItem('projectId');

	const [showDialog, setShowDialog] = useState(false);
	const [name, setName] = useState('');
	const [combination, setCombination] = useState('');
	const [steps, setSteps] = useState([]);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	const filterChange = (step, expression) => {
		setDisabled(expression ? false : true);
		setSteps(step);
		setCombination(expression);
	};

	const onSave = () => {
		setShowDialog(true);
	};

	const onCancel = () => {
		history.back();
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const display = (data, result) => {
		data.forEach((item) => {
			if (utils.isArray(item)) {
				display(item, result);
			} else {
				const obj = { ...item.values
				};
				const temp = obj.flag.split(',');
				obj.flag = temp[0] === 'true' ? true : false;
				obj.type = temp[1];
				const temp_1 = obj.id.split(',');
				obj.id = temp_1[0];
				obj.aggregator = temp_1[1];
				obj.alias = item.alias;
				obj.values = [obj.values];
				result.conditions.push(obj);
			}
		});
	}

	const onOK = () => {
		let result = {
			expression: combination,
			name,
			conditions: [],
		};
		display(steps, result);
		api.createUserGroup({
			project_id: projectId,
			trend: result,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			console.log(res);
			history.back();
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
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
      			<div className={styles.rateWrap}>
      				<div className={styles.value}>0%</div>
      				<div>占访问用户比率</div>
      			</div>
				<div className={styles.groupWrap}>
					<div className={styles.value}>0</div>
					<div>分群人数</div>
				</div>
      		</div>

      		<Dialog autoFocus visible={showDialog} onClose={onClose} footer={false}>
      			<Loading visible={loading} inline={false}>
					<div style={{margin:'20px'}}>
						<p className={styles.name}>请输入用户分群名称</p>
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

export default withRouter(CreateGroup);