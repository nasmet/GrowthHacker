import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Table,
	Loading,
	Select,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function GroupWorth() {
	const refForm = useRef(null);
	const refVarible = useRef({
		date: 'day:0',
		id: 0,
	});
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	function assembleGroupData(data) {
		const groups = model.assembleGroupData(data, false);
		refForm.current.state.store.setFieldProps('id', {
			dataSource: groups,
		});
		if (groups.length === 0) {
			return;
		}
		refForm.current.state.store.setFieldValue('id', groups[0].value);
		refVarible.current.id = groups[0].value;
	}

	function getGroupWorth() {
		setLoading(true);
		api.getGroupWorth({
			id: refVarible.current.id,
			trend: {
				date: refVarible.current.date,
			},
		}).then(res => {
			setTableData([res]);
		}).catch(e => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		})
	}

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getUserGroups().then(res => {
					assembleGroupData(res.segmentations);
				});

				await api.getGroupWorth({
					id: refVarible.current.id,
					trend: {
						date: refVarible.current.date,
					},
				}).then(res => {
					setTableData([res]);
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

	const dateChange = e => {
		refVarible.current.date = e;
		getGroupWorth();
	};

	const onFormChange = e => {
		refVarible.current.date = e.id;
		getGroupWorth();
	};

	return (
		<Components.Wrap>
			<Components.Title title='分群用户价值评估' />
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />
				<div>
					<Form
						ref={refForm}
						onChange={onFormChange}
						renderField={({label, component}) => (
							<div>
								<span>{label}</span>
								<span>{component}</span>
							</div>
						)}
					>
						<Field label='目标用户：' name='id'>
							<Select  
								style={{minWidth:'200px'}}
								dataSource={[]} 
								showSearch
							/>
						</Field>
					</Form>
				</div>
			</IceContainer>
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false} >
						<Table.Column title='广告点击次数' dataIndex='ads_watch_count' />
						<Table.Column title='分享新增用户数' dataIndex='new_user_count' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='分享回流数' dataIndex='share_open_count' />
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}