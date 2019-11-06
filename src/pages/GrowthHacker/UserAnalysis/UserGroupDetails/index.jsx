import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Loading,
	Pagination,
	Table,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Step from './components/Step';

function UserGroupDetails({
	location,
}) {
	const {
		id,
		name,
	} = location.state.data;

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
				},
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

		return () => {
			api.cancelRequest();
		};
	}, [curPage, id]);

	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title={name} />
			<IceContainer>
				<Step {...location.state.data} />
			</IceContainer>
		
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table
						dataSource={tableData} 
						hasBorder={false}
					>
						{renderTitle()}
					</Table>
				</Loading>
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