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
	Drawer,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateVarible from './components/CreateVarible';
import EventVaribleDetails from './components/EventVaribleDetails';

export default function EventVarible() {
	const refDialog = useRef(null);
	const [curPage, setCurPage] = useState(1);
	const [showDrawer, setShowDrawer] = useState(false);
	const [values, setValues] = useState({});

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

	const onView = record => {
		const {
			id,
			name,
		} = record;
		setValues({
			id,
			name,
		});
		setShowDrawer(true);
	}

	const renderCover = (value, index, record) => {
		return (
			<div>
				<Button type='primary' style={{marginRight:'10px'}} onClick={onView.bind(this, record)}> 
					查看
				</Button>
				<Button type='primary' warning onClick={onDeleteEventVariable.bind(this, record.id, index)}> 
					删除
				</Button>
			</div>
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
			const temp = Math.ceil(total / config.LIMIT);
			const lastPage = total % config.LIMIT === 0 ? temp + 1 : temp;
			updateParameter({
				...parameter,
				offset: (lastPage-1) * config.LIMIT,
			});
			setCurPage(lastPage);
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

	const onCloseDrawer = () => {
		setShowDrawer(false);
	};

	return (
		<Components.Wrap>
			<Button style={{marginBottom: '10px'}} type="secondary" onClick={onCreate}> 
				创建事件变量
			</Button>
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
						<Table.Column title="操作" cell={renderCover} width={240} />
					</Table>
				</Loading>

				<Pagination
					current={curPage}
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>
            <Drawer
                visible={showDrawer}
                placement='right'
                onClose={onCloseDrawer}
                width={700}
            >
				<EventVaribleDetails {...values} />
            </Drawer>
			<CreateVarible ref={refDialog} onOk={onOk} />

		</Components.Wrap>
	);
}