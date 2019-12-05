import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import Condition from './components/Condition';

export default function CreateGroup() {
	const [title,setTitle]= useState('新建分群');
	const refSave = useRef(null);
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
				const filters = steps[i].step[j].filters;
				for (let j = 0, length = filters.length; j < length; j++) {
					if (!filters[j].values.key) {
						return false
					}
					if (!filters[j].values.op) {
						return false
					}
					if (!filters[j].values.value) {
						return false
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
		refSave.current.setButtonStatus(!getStatus());
	};

	const onSave = () => {;
		refDialog.current.onShow();
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
				const temp_1 = obj.id.split(',');
				obj.event_id = +temp_1[1];
				obj.event_key = temp_1[0];
				delete obj.id;
				obj.alias = v.alias;
				obj.filter = {
					relation: 'and',
				};
				if (obj.type === 'event') {
					obj.values = [obj.values];
					if (obj.aggregator.indexOf(',') === -1) {
						obj.field = '';
					} else {
						const temp_2 = obj.aggregator.split(',');
						obj.aggregator = temp_2[1];
						obj.field = temp_2[0];
					}
					const conditions = v.filters.map(item => {
						const values = item.values;
						const temp_3 = values.key.split(',');
						return {
							id: +temp_3[1],
							key: temp_3[0],
							op: values.op,
							values: [values.value],
						};
					});
					obj.filter.conditions = conditions;
				} else {
					obj.values = [obj.value];
					obj.filter.conditions = [];
					delete obj.aggregator;
				}
				delete obj.value;
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
			model.log(`创建分群${name}成功`);
			setTitle(name);
			success();
		}).catch((e) => {
			model.log(e);
			fail();
		});
	};

	const onInputChange = (e) => {
		refVariable.current.name = e;
	};

	return (
		<Components.Wrap>		
			<Components.Save ref={refSave} title={title} onSave={onSave} />
  			<Condition conditionChange={conditionChange} />
      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}