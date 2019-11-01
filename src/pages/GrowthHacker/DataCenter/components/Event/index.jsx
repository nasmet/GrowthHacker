import React, {
	useRef,
	useEffect,
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
import CreateEvent from './components/CreateEvent';
import EditVarible from './components/EditVarible';

export default function Event() {
	const refCE = useRef(null);
	const refEV = useRef(null);

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
		type: 'event',
	});
	const {
		event_entities = [],
			total = 0,
	} = response;

	useEffect(() => {
		api.getDataCenter({
			type: 'variable',
		}).then(res => {
			const variableData = model.assembleEventVaribleData(res.event_entities);
			refCE.current.updateVaribleData(variableData);
			refEV.current.setVaribleData(variableData);
		}).catch(e => {
			console.error(e);
		})

		return () => {
			api.cancelRequest();
		};
	}, [])


	const pageChange = e => {
		updateParameter(Object.assign({}, parameter, {
			offset: (e - 1) * config.LIMIT,
		}));
	};

	const onDeleteEvent = (id, index) => {
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

	const onAddVarible = record => {
		refEV.current.onShow(record.id, record.bind_variables);
	};

	const renderHander = (value, index, record) => {
		return (
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<Button type='primary' style={{marginBottom: '10px'}} warning onClick={onDeleteEvent.bind(this, record.id, index)}> 
					删除
				</Button>
			</div>
		);
	};

	const onDeteleVarible = (record, id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteBindVariables({
					eventId: record.id,
					variableId: id,
				}).then(() => {
					record.bind_variables.splice(index, 1);
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

	const renderBind = (value, index, record) => {
		return (
			<div>
				{record.bind_variables.map((item, index) => <Button key={item.id} onClick={onDeteleVarible.bind(this,record,item.id,index)} style={{marginRight: '4px',marginBottom: '4px'}} >{item.entity_key}</Button>)}
				<Button size='small' style={{borderRadius:'50%'}} onClick={onAddVarible.bind(this,record)}>+</Button>
			</div>
		);
	};

	const onCreateEvent = () => {
		refCE.current.onShow();
	};

	const onOk = (value) => {
		event_entities.splice(0, 0, value);
		updateResponse();
	};

	const onEditVaribleOk = () => {
		updateParameter({ ...parameter
		});
	};

	return (
		<Components.Wrap>
			<IceContainer>      		
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateEvent}> 
						创建埋点事件
					</Button>
				</div>
				
				<Loading visible={loading} inline={false}>
					<Table		         	 
						dataSource={event_entities}		          		 
						hasBorder={false}		          		
					>		          		
						<Table.Column title="id" dataIndex="id" width={80} />		          		
						<Table.Column title="名称" dataIndex="name" width={120} />		            	
						<Table.Column title="标识符" dataIndex="entity_key" width={120} />		            	
						<Table.Column title="类型" dataIndex="value_type" width={120} />	
						<Table.Column title="关联事件变量" cell={renderBind} width={600} />	            	
						<Table.Column title="描述" dataIndex="desc" width={600} />		            	
						<Table.Column title="操作" cell={renderHander} lock='right' width={120} />		            	
					</Table>
				</Loading>	          	
			
				<Pagination	          	
					className={styles.pagination}            	
					total={total}		            	
					onChange={pageChange}	            	
				/>	          	
			</IceContainer>		    
			<CreateEvent ref={refCE} onOk={onOk} />
			<EditVarible ref={refEV} onOk={onEditVaribleOk} />
		</Components.Wrap>
	);
}