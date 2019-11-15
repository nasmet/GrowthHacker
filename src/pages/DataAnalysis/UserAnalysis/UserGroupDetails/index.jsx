import React from 'react';
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
		conditions,
		condition_expr,
	} = location.state.data;

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getUserGroupDetails, {
		id,
		trend: {
			limit: config.LIMIT,
			offset: 0,
		},
	});
	const {
		total = 0,
			meta = [],
			data = [],
	} = response;

	const renderThreeColumn = (value, index, record) => {
		return <span>{utils.formatUnix(record[2],'Y-M-D h:m:s')}</span>;
	};

	const renderTitle = () => {
		return meta.map((item, index) => {
			if (index === 2) {
				return <Table.Column key={index} title={item} cell={renderThreeColumn} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = e => {
		parameter.trend.offset = (e - 1) * config.LIMIT;
		updateParameter({ ...parameter
		});
	};

	return (
		<Components.Wrap>
			<Components.Title title={name} />
			<IceContainer>
				<Step conditions={conditions} condition_expr={condition_expr} />
			</IceContainer>
		
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table
						dataSource={data} 
						hasBorder={false}
					>
						{renderTitle()}
					</Table>
				</Loading>
				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>
		</Components.Wrap>
	);
}

export default withRouter(UserGroupDetails);