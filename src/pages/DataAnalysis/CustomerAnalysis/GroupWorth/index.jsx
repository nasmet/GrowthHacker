import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function GroupWorth() {
	const refVarible = useRef({
		date: 'day:0',
		oldSegmentations: [],
		segmentations:[],
	});
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	function getGroupWorth() {
		setLoading(true);
		api.getGroupWorth({
			segmentations: refVarible.current.segmentations.join(','),
			date: refVarible.current.date,
		}).then(res => {
			setTableData(res.ltvs);
		}).catch(e => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		})
	}

	const dateChange = e => {
		if (!refVarible.current.segmentations) {
			return;
		}
		refVarible.current.date = e;
		onRefresh();
	};

	const groupChange = (e) => {
		if (e.length === 0) {
			return;
		}
		refVarible.current.segmentations = e;
	};

	const onRefresh = utils.debounce(() => {
		getGroupWorth();
	},500);

	const handleData = () => {
		return {
			sheetHeader: ['目标用户', '用户数', '广告点击人均次数', '分享新增人均用户数', '分享人均次数', '分享人均回流数'],
			sheetData: tableData.map(item => {
				const {
					segmentation_name,
					user_count,
					avg_ads_watch_count,
					avg_new_user_count,
					avg_share_count,
					avg_share_open_count,
				} = item;
				return [
					segmentation_name,
					user_count,
					avg_ads_watch_count,
					avg_new_user_count,
					avg_share_count,
					avg_share_open_count,
				]
			}),
		};
	};

	const onSort = (dataIndex, order) => {
		const data = [...tableData];
		data.sort((a, b) => order === 'desc' ? b[dataIndex] - a[dataIndex] : a[dataIndex] - b[dataIndex]);
		setTableData(data);
	};

	const onBlur=()=>{
		if(refVarible.current.oldSegmentations===refVarible.current.segmentations){
			return;
		}
		refVarible.current.oldSegmentations = refVarible.current.segmentations;
		onRefresh();
	};	

	return (
		<Components.Wrap>
			<Components.Title title='分群用户价值评估' />
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />
				<Components.GroupFilter 
					filterChange={groupChange} 
					all={false} 
					mode='multiple' 
					onBlur={onBlur}
				/>
			</IceContainer>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{tableData.length > 0 && <Components.ExportExcel fileName='分群用户价值评估' handle={handleData} />}
				</div>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false} onSort={onSort} >
						<Table.Column title='目标用户' dataIndex='segmentation_name' />
						<Table.Column title='用户数' dataIndex='user_count' sortable />
						<Table.Column title='广告点击人均次数' dataIndex='avg_ads_watch_count' sortable />
						<Table.Column title='分享新增人均用户数' dataIndex='avg_new_user_count' sortable />
						<Table.Column title='分享人均次数' dataIndex='avg_share_count' sortable />
						<Table.Column title='分享人均回流数' dataIndex='avg_share_open_count' sortable />
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}