import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import styles from './index.module.scss';
import Condition from './components/Condition';

function CreateGroup({
	history,
}) {
	const [disabled, setDisabled] = useState(true);
	const refDialog = useRef(null);
	const refVariable = useRef({
		steps: [],
		name: '',
		expression: '',
	});

	useEffect(() => {
		return api.cancelRequest;
	}, []);

	function getStatus() {
		const steps = refVariable.current.steps;
		for (let i = 0, len = steps.length; i < len; i++) {
			for (let j = 0, length = steps[i].step.length; j < length; j++) {
				const values = steps[i].step[j].values;
				if (!values.id) {
					return false;
				}
				if (values.flag === 'true,event' || values.flag === 'false,event') {
					if (values.values === '') {
						return false;
					}
				} else {
					if (values.value === '') {
						return false;
					}
				}
			}
		}
		return true;
	}

	const conditionChange = (step, expression) => {
		if (expression) {
			refVariable.current.expression = expression;
		}
		refVariable.current.steps = step;
		setDisabled(!getStatus());
	};

	const onSave = () => {;
		refDialog.current.onShow();
	};

	const onCancel = () => {
		history.goBack();
	};

	const transformData = (steps) => {
		const conditions = [];
		steps.forEach((item) => {
			item.step.forEach(v => {
				const obj = { ...v.values
				};
				const temp = obj.flag.split(',');
				obj.flag = temp[0] === 'true' ? true : false;
				obj.type = temp[1];
				obj.id = obj.id;
				obj.alias = v.alias;
				if (obj.type === 'event') {
					obj.values = [obj.values];
				} else {
					obj.values = [obj.value];
				}
				obj.date = `abs:${parseInt(obj.date[0].valueOf()/1000)},${parseInt(obj.date[1].valueOf()/1000)}`;
				conditions.push(obj);
			})
		});
		return conditions;
	}

	const onOk = (success, fail) => {
		const {
			steps,
			name,
			expression,
		} = refVariable.current;

		api.createUserGroup({
			condition_expr: expression,
			name,
			conditions: transformData(steps),
		}).then((res) => {
			model.log('创建成功');
			history.goBack();
		}).catch((e) => {
			model.log(e);
			fail();
		});
	};

	const onInputChange = (e) => {
		refVariable.current.name = e;
	};

	return (
		<div className={styles.wrap}>
      		<div className={styles.leftContent}>
      			<Condition conditionChange={conditionChange} />
      		</div>
      		<div className={styles.rightContent}>
      			<div className={styles.btnWrap}>
      				<Button onClick={onCancel}>取消</Button>
      				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
      			</div>
      		</div>
      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</div>
	);
}

export default withRouter(CreateGroup);