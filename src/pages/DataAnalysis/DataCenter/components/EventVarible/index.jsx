import React, {
	useRef,
} from 'react';
import {
	Button,
	Table,
	Pagination,
	Dialog,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateVarible from './components/CreateVarible';

export default function EventVarible() {
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

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		return {
			sheetHeader: ["id", "名称", "标识符", "类型", "描述"],
			sheetData: event_entities.map(item => [
				item.id,
				item.name,
				item.entity_key,
				item.variable_type,
				item.desc,
			]),
		}
	};

	return (
		<Components.Wrap>
			<div className={styles.btnWrap}>
				<Button className={styles.btn} type="secondary" onClick={onCreate}> 
					创建事件变量
				</Button>
			</div>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{event_entities.length > 0 && <Components.ExportExcel fileName='事件变量' handle={handleData} />}
				</div>
				<Loading visible={loading} inline={false}>
					<Table 
						dataSource={event_entities} 
						hasBorder={false} 
					>	
						<Table.Column title="id" dataIndex="id" width={120} />
						<Table.Column title="名称" dataIndex="name" width={120} />
						<Table.Column title="标识符" dataIndex="entity_key" width={120} />
						<Table.Column title="类型" dataIndex="variable_type" width={120} />
						<Table.Column title="描述" dataIndex="desc" />	
						<Table.Column title="操作" cell={renderCover} width={120} />
					</Table>
				</Loading>

				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>

			<CreateVarible ref={refDialog} onOk={onOk} />

		</Components.Wrap>
	);
}