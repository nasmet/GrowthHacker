import React, {
	useState,
	useEffect,
} from 'react';
import {
	Loading,
	Select,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	originRules,
	firstColumn,
} from './ruleDetailsConfig';

function RuleDetails({
	location,
}) {
	const {
		expr,
		name,
		conditions,
	} = location.state.data;

	const [loading, setLoading] = useState(false);
	const [groupData, setGroupData] = useState([]);
	const [tagData, setTagData] = useState([]);
	const [steps, setSteps] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getTags().then((res) => {
					setTagData(res.labels.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					}));
				});

				await api.getUserGroups().then((res) => {
					setGroupData(res.segmentations.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					}));
				});
			} catch (e) {
				model.log(e);
			}
			setLoading(false);
		}

		fetchData();

		return () => {
			api.cancelRequest();
		};
	}, []);

	useEffect(() => {
		function assembleSteps() {
			const expArr = model.reversePoland(expr);
			let transformConditions = [];
			try {
				transformConditions = JSON.parse(conditions);
			} catch (e) {
				console.error(e);
			}

			function findCondition(alias) {
				for (let item of transformConditions) {
					if (item.alias === alias) {
						return item;
					}
				}
				return null;
			}

			function createStep(alias) {
				const item = findCondition(alias);
				const values = { ...item,
					op: '=',
				};
				delete values['alias'];
				let idData = [];
				if (values.type === 'label') {
					idData = tagData;
				} else {
					idData = groupData;
				}
				return {
					alias,
					step: [{
						values,
						alias,
						idData,
					}],
				};
			}

			const steps = [];
			for (let v of expArr) {
				if (v === 'or' || v === 'and') {
					const temp = steps.pop();
					const temp_1 = steps.pop();
					if (temp_1.alias[0] === temp.alias[0]) {
						temp_1.step.push(...temp.step);
						steps.push(temp_1);
					} else {
						temp_1.op = v;
						steps.push(temp_1);
						steps.push(temp);
					}
				} else {
					steps.push(createStep(v));
				}
			}
			return steps;
		}

		// function assembleSteps() {
		// 	const steps = [];
		// 	let step = [];
		// 	const opChars = [];
		// 	const valueChars = [];
		// 	const arr = expr.split(' ');
		// 	let transformConditions = [];
		// 	try {
		// 		transformConditions = JSON.parse(conditions);
		// 	} catch (e) {
		// 		console.error(e);
		// 	}

		// 	function findCondition(alias) {
		// 		for (let item of transformConditions) {
		// 			if (item.alias === alias) {
		// 				return item;
		// 			}
		// 		}
		// 		return null;
		// 	}

		// 	function createStep(alias) {
		// 		const item = findCondition(alias);
		// 		const values = { ...item,
		// 			op: '=',
		// 		};
		// 		delete values['alias'];
		// 		let idData = [];
		// 		if (values.type === 'label') {
		// 			idData = tagData;
		// 		} else {
		// 			idData = groupData;
		// 		}
		// 		step.push({
		// 			values,
		// 			alias,
		// 			idData,
		// 		});
		// 	}

		// 	function addStep(opChar) {
		// 		steps.push({
		// 			op: opChar && opChar.toUpperCase(),
		// 			step,
		// 		});
		// 		step = [];
		// 	}

		// 	arr.forEach(item => {
		// 		if (item === 'and' || item === 'or' || item.includes('(') || item.includes(')')) {
		// 			opChars.push(item);
		// 		} else {
		// 			valueChars.push(item);
		// 		}
		// 	});

		// 	while (opChars.length > 0) {
		// 		const opChar = opChars.shift();
		// 		if (opChar === 'and' || opChar === 'or') {
		// 			const valueChar = valueChars.shift();
		// 			createStep(valueChar)
		// 			addStep(opChar);
		// 			step = [];
		// 		} else if (opChar.includes('(')) {
		// 			createStep(opChar.split('(')[1]);
		// 			while (opChars.length > 0) {
		// 				const opChar = opChars.shift();
		// 				if (opChar.includes(')')) {
		// 					createStep(opChar.split(')')[0]);
		// 					addStep(opChars.shift());
		// 					step = [];
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	}

		// 	if (valueChars.length > 0) {
		// 		createStep(valueChars[0]);
		// 		addStep('and');
		// 	}

		// 	return steps;
		// }

		if (groupData.length === 0) {
			return;
		}

		setSteps(assembleSteps());
	}, [tagData, groupData, conditions, expr]);

	const renderForm = (item) => {
		const {
			alias,
			values,
			idData,
		} = item;
		return (
			<Form
				key={alias}
				initialValues={values}
			>	
				<div className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>{alias}</span>
						<Field name='type' dataSource={firstColumn} component={Select} />
						<Field name='op' dataSource={originRules} component={Select} />
						<Field name='id'>
							<Select style={{width:'200px'}} dataSource={idData} />
						</Field>
					</div>
				</div>
			</Form>
		);
	}

	const renderChild = (item) => {
		return item.map((v) => {
			return renderForm(v);
		});
	}

	const renderStep = () => {
		return steps.map((item, index) => {
			return (
				<div key={index}>
					<div className={styles.step}>
						{
							renderChild(item.step)
						}
					</div>
					{(steps.length-1)!==index && <p style={{display:'flex',justifyContent:'center'}}><span>{item.op.toUpperCase()}</span></p>}
				</div>
			);
		});
	};

	return (
		<Components.Wrap>
			<Loading visible={loading} inline={false}>
				<Components.Title title={name} />
				<IceContainer>
					<p className={styles.combination}>{expr}</p>
					{renderStep()}
				</IceContainer>
			</Loading>
		</Components.Wrap>
	);
}

export default withRouter(RuleDetails);