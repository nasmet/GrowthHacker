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

const {
	Column,
} = Table;

function UserGroupDetails({
	location,
}) {
	const {
		id,
	} = location.state;
	const [curPage, setCurPage] = useState(1);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;

	useEffect(() => {
		function getUserGroupDetails() {
			setLoading(true);
			api.getUserGroupDetails({
				project_id: projectId,
				id,
				trend: {
					limit: config.LIMIT,
					offset: (curPage - 1) * config.LIMIT,
				}
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					data,
					meta,
					total,
				} = res;
				setCount(total);
				setTitles(meta);
				setTableData(data);
			}).catch((e) => {
				Message.success(e.toString());
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		getUserGroupDetails();
	}, [curPage]);

	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onBack = () => {
		history.back();
	};

	return (
		<div className={styles.wrap}>
			<p>
				<Button style={{borderRadius:'10px'}} onClick={onBack}>返回用户分群</Button>
			</p>
			<IceContainer>
				<Table 
					loading={loading} 
					dataSource={tableData} 
					hasBorder={false}
				>
					{renderTitle()}
				</Table>
			     <Pagination
	           		className={styles.pagination}
	            	current={curPage}
	            	total={count}
	            	onChange={pageChange}
	          	/>
          	</IceContainer>
    	</div>
	);
}

export default withRouter(UserGroupDetails);