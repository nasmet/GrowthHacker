import React, {
	useRef,
} from 'react';
import {
	Button,
	Table,
	Pagination,
	Dialog,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateBuriedPoint from '../CreateBuriedPoint';

export default function EventVariable() {
	const refDialog = useRef(null);

	const {
		parameter,
		response,
		loading,
		updateParameter,
		updateResponse,
		showLoading,
		closeLoading,
	} = hooks.useRequest(api.getDataCenter, {
		limit: config.LIMIT,
		offset: 0,
		type: 'variable',
	});
	const {
		event_entities = [],
			total = 0,
	} = response;

	const pageChange = e => {
		updateParameter(Object.assign({}, parameter, {
			offset: (e - 1) * config.LIMIT,
		}));
	};

	const onDeleteBuriedPoint = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteEvent({
					id,
				}).then(() => {
					event_entities.splice(index, 1);
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
			<Button type='primary' warning onClick={onDeleteBuriedPoint.bind(this, record.id, index)}> 
				删除
			</Button>
		);
	};

	const onCreate = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		event_entities.splice(0, 0, value);
		updateResponse();
	};

	return (
		<Components.Wrap>
			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreate}> 
						创建事件变量
					</Button>
				</div>

				<Table 
					loading={loading}
					dataSource={event_entities} 
					hasBorder={false} 
				>	
					<Table.Column title="id" dataIndex="id" />
					<Table.Column title="名称" dataIndex="name" />
					<Table.Column title="标识符" dataIndex="entity_key" />
					<Table.Column title="类型" dataIndex="variable_type" />
					<Table.Column title="操作" cell={renderCover} />
				</Table>

				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>

			<CreateBuriedPoint ref={refDialog} onOk={onOk} entityType='variable' />

		</Components.Wrap>
	);
}