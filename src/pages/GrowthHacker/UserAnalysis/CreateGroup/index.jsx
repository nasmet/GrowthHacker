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
import Step from './components/Step';

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
		return () => {
			api.cancelRequest();
		};
	}, []);

	const filterChange = (step, expression) => {
		const flag = expression ? false : true;
		if (flag !== disabled) {
			setDisabled(flag);
		}
		refVariable.current.steps = step;
		refVariable.current.expression = expression;
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
				obj.id = +obj.id;
				obj.alias = v.alias;
				if (obj.type === 'event') {
					obj.values = [obj.values];
				} else {
					obj.values = [obj.value];
				}
				const temp_2 = obj.date;
				obj.date = `abs:${parseInt(temp_2[0].valueOf()/1000)},${parseInt(temp_2[1].valueOf()/1000)}`;
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
      			<Step filterChange={filterChange} />
      		</div>
      		<div className={styles.rightContent}>
      			<div className={styles.btnWrap}>
      				<Button onClick={onCancel}>取消</Button>
      				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
      			</div>
      			{/*<div className={styles.rateWrap}>
      				<div className={styles.value}>0%</div>
      				<div>占访问用户比率</div>
      			</div>
				<div className={styles.groupWrap}>
					<div className={styles.value}>0</div>
					<div>分群人数</div>
				</div>*/}
      		</div>
      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</div>
	);
}

export default withRouter(CreateGroup);