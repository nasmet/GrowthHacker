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

function CreateRule({
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
				conditions.push({ ...v.values,
					alias: v.alias,
				});
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
		api.createRules({
			expr: expression,
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
      		</div>
			<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</div>
	);
}

export default withRouter(CreateRule);