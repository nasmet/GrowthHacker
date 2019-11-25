import React, {
	useRef,
	useState,
} from 'react';
import {
	Button,
	Table,
	Pagination,
	Dialog,
	Loading,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateOriginDataValue from './components/CreateOriginDataValue';

export default function OriginDataDetails({
	id,
	name,
	value_type,
}) {
	const refDialog = useRef(null);
	const [curPage, setCurPage] = useState(1);

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
		setCurPage(e);
		parameter.trend.offset = (e - 1) * config.LIMIT;
		updateParameter(parameter);
	};

	const onCreateOriginDataValue = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		if (data.length < config.LIMIT) {
			data.push(value);
			updateResponse();
		} else {
			const nextPage = curPage + 1;
			updateParameter({
				...parameter,
				offset: (nextPage - 1) * config.LIMIT,
			});
			setCurPage(nextPage);
		}
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
					if (data.length > 1) {
						updateParameter(parameter);
						return;
					}
					const prePage = curPage - 1 === 0 ? 1 : curPage - 1;
					updateParameter({
						...parameter,
						offset: (prePage - 1) * config.LIMIT,
					});
					setCurPage(prePage);
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

	const renderFirstColunm = (value, index, record) => {
		return <span>{ parameter.trend.offset + index+1}</span>;
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
				<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={data} 
		          		hasBorder={false}
		          	>	
		          		<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} />
		            	<Table.Column title="元数据值" dataIndex="value" />
		            	<Table.Column title="操作" cell={renderCover} />
		          	</Table>
				</Loading>
	          	<Pagination
	          		current={curPage}
	           		className={styles.pagination}
	            	total={total}
	            	onChange={pageChange}
	          	/>
		    </IceContainer>

			<CreateOriginDataValue ref={refDialog} onOk={onOk} id={id} value_type={value_type} />
    	</Components.Wrap>
	);
}