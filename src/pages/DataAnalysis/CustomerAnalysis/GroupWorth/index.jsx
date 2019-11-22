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
	const refVarible = useRef({
		date: 'day:0',
	});
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

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

	const dateChange = e => {
		if (!refVarible.current.id) {
			return;
		}
		refVarible.current.date = e;
		getGroupWorth();
	};

	const groupChange = e => {
		refVarible.current.id = e;
		getGroupWorth();
	};

	const onRefresh = () => {
		getGroupWorth();
	};

	return (
		<Components.Wrap>
			<Components.Title title='分群用户价值评估' />
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />
				<Components.GroupFilter filterChange={groupChange} all={false} />
			</IceContainer>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
				</div>
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