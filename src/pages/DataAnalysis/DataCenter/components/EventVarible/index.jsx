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
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateVarible from './components/CreateVarible';

export default function EventVarible() {
	const refDialog = useRef(null);
	const [curPage, setCurPage] = useState(1);

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
		setCurPage(e);
		updateParameter(Object.assign({}, parameter, {
			offset: (e - 1) * config.LIMIT,
		}));
	};

	const onDeleteEventVariable = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteEvent({
					id,
				}).then(() => {
					if (event_entities.length <= 1) {
						const prePage = curPage - 1 === 0 ? 1 : curPage - 1;
						updateParameter({
							...parameter,
							offset: (prePage - 1) * config.LIMIT,
						});
						setCurPage(prePage);
					} else {
						updateParameter(parameter);
					}
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
			<Button type='primary' warning onClick={onDeleteEventVariable.bind(this, record.id, index)}> 
				删除
			</Button>
		);
	};

	const onCreate = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		if (event_entities.length < config.LIMIT) {
			event_entities.push(value);
			updateResponse();
		} else {
			const nextPage = curPage + 1;
			updateParameter({
				...parameter,
				offset: (nextPage - 1) * config.LIMIT,
			});
			setCurPage(nextPage);
		}
		model.onFire.fire('updateEvent');
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

	const renderFirstColunm = (value, index, record) => {
		return <span>{ parameter.offset + index+1}</span>;
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
						<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} width={80} />
						<Table.Column title="名称" dataIndex="name" width={120} />
						<Table.Column title="标识符" dataIndex="entity_key" width={120} />
						<Table.Column title="类型" dataIndex="variable_type" width={120} />
						<Table.Column title="描述" dataIndex="desc" />	
						<Table.Column title="操作" cell={renderCover} width={120} />
					</Table>
				</Loading>

				<Pagination
					current={curPage}
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>

			<CreateVarible ref={refDialog} onOk={onOk} />

		</Components.Wrap>
	);
}