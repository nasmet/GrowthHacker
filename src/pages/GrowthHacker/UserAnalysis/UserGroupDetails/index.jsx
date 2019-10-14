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

function UserGroupDetails({
	location,
}) {
	const id = location.state.id;

	const [curPage, setCurPage] = useState(1);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		function getUserGroupDetails() {
			setLoading(true);
			api.getUserGroupDetails({
				id,
				trend: {
					limit: config.LIMIT,
					offset: (curPage - 1) * config.LIMIT,
				}
			}).then((res) => {
				const {
					data,
					meta,
					total,
				} = res;
				setCount(total);
				setTitles(meta);
				setTableData(data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getUserGroupDetails();
	}, [curPage]);

	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onBack = () => {
		history.back();
	};

	return (
		<Components.Wrap>
			<Components.Title title='用户分群详情' />
			<IceContainer>
				<Button style={{marginBottom:'20px',borderRadius:'10px'}} onClick={onBack}>返回用户分群</Button>
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
    	</Components.Wrap>
	);
}

export default withRouter(UserGroupDetails);