import React, {
	useState,
} from 'react';
import {
	Input,
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function UserScrutiny({
	history,
}) {
	const [emptyContent, setEmptyContent] = useState(1);

	const {
		showLoading,
		closeLoading,
		updateResponse,
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getUserScrutiny, {
		offset: 0,
		limit: config.LIMIT,
		search: '',
	});
	const {
		total = 0,
			meta = [],
			data = [],
	} = response;

	const jumpUserDetails = (e) => {
		history.push({
			pathname: '/growthhacker/projectdata/ua/userscrutinydetails',
			state: {
				id: e,
			}
		});
	};

	const renderFirstCell = (value, index, record) => {
		const val = record[1] || '';
		return (
			<span className={styles.user} onClick={jumpUserDetails.bind(this,val)}>{val}</span>
		);
	};

	const renderFourCell = (value, index, record) => {
		const val = record[3] || '';
		return (
			<span>{utils.formatUnix(val,'Y-M-D h:m:s')}</span>
		);
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			if (index === 1) {
				return <Table.Column key={index} title={item} cell={renderFirstCell} />
			}
			if (index === 3) {
				return <Table.Column key={index} title={item} cell={renderFourCell} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		updateParameter(Object.assign({}, parameter, {
			offset: (e - 1) * config.LIMIT,
		}))
	};

	const onInputChange = (e) => {
		updateParameter(Object.assign({}, parameter, {
			search: e,
			offset: 0,
		}));
		setEmptyContent(e ? 0 : 1);
	};

	return (
		<Components.Wrap>
			<Components.Title title='用户细查' />
  			<IceContainer>
  				<Input 
  					style={{marginBottom:'20px'}}
					hasClear 
					hint='search' 
					placeholder="请输入openID" 
					onChange={utils.debounce(onInputChange, 500)}
				/>
				<Loading visible={loading} inline={false}>
					<Table 
						dataSource={data} 
						hasBorder={false}
						emptyContent={<span>{emptyContent?'暂无数据':'查询结果为空'}</span>}
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

export default withRouter(UserScrutiny);