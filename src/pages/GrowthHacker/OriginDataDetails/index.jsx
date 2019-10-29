import React, {
	useRef,
} from 'react';
import {
	Button,
	Table,
	Pagination,
	Dialog,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateOriginDataValue from './components/CreateOriginDataValue';

function OriginDataDetails({
	location,
}) {
	const {
		id,
		name,
		value_type,
	} = location.state;

	const refDialog = useRef(null);
	const {
		showLoading,
		closeLoading,
		updateResponse,
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getOriginDataValues, {
		id,
		trend: {
			offset: 0,
			limit: config.LIMIT,
		},
	});
	const {
		total = 0,
			data = [],
	} = response;

	const pageChange = (e) => {
		updateParameter(Object.assign({}, parameter, {
			trend: {
				offset: (e - 1) * config.LIMIT,
			}
		}));
	};

	const onCreateOriginDataValue = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		data.splice(0, 0, value);
		updateResponse();
	};

	const onDeleteOriginDataValue = (valueId, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteOriginDataValues({
					id,
					valueId,
				}).then((res) => {
					data.splice(index, 1);
					updateResponse();
					model.log('删除成功');
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					closeLoading();
				});
			},
		});
	};

	const renderCover = (value, index, record) => {
		return (
			<Button type='primary' warning onClick={onDeleteOriginDataValue.bind(this,record.id,index)}> 
				删除
			</Button>
		);
	};

	return (
		<Components.Wrap>
			<Components.Title title={name} />
			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateOriginDataValue}> 
						创建元数据值
					</Button>
				</div>

	          	<Table 
	          		loading={loading}
	          		dataSource={data} 
	          		hasBorder={false}
	          	>	
	          		<Table.Column title="id" dataIndex="id" />
	            	<Table.Column title="元数据值" dataIndex="value" />
	            	<Table.Column title="操作" cell={renderCover} />
	          	</Table>

	          	<Pagination
	           		className={styles.pagination}
	            	total={total}
	            	onChange={pageChange}
	          	/>
		    </IceContainer>

			<CreateOriginDataValue ref={refDialog} onOk={onOk} id={id} value_type={value_type} />
    	</Components.Wrap>
	);
}

export default withRouter(OriginDataDetails);