import React, {
	useRef,
	useEffect,
	useState,
} from 'react';
import {
	Button,
	Table,
	Pagination,
	Dialog,
	Loading,
	Drawer,
	Upload,
	Input,
} from '@alifd/next';
import {
	Link,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateEvent from './components/CreateEvent';
import EditVarible from './components/EditVarible';

export default function Event() {
	const refCE = useRef(null);
	const refEV = useRef(null);
	const [showDrawer, setShowDrawer] = useState(false);
	const [eventName, setEventName] = useState('');
	const [bindVariableData, setBindVariableData] = useState([]);

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
		});
	}, [])

	const pageChange = e => {
		updateParameter({ ...parameter,
			offset: (e - 1) * config.LIMIT,
		});
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
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					closeLoading();
				});
			},
		});
	};

	const onBindDetails = record => {
		setEventName(record.name);
		setBindVariableData(record.bind_variables);
		setShowDrawer(true);
	};

	const renderBind = (value, index, record) => {
		return (
			<div className={styles.variableWrap}>
				{record.bind_variables.map((item, index) => 
					<span key={item.id} className={styles.variable} onClick={onDeteleVarible.bind(this,record,item.id,index)} >
						{item.entity_key}
					</span>
				)}
				<Button size='small' style={{borderRadius:'50%',marginRight: '4px'}} onClick={onAddVarible.bind(this,record)}>+</Button>
				<Button onClick={onBindDetails.bind(this,record)}>详情</Button>
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

	const onCloseDrawer = () => {
		setShowDrawer(false);
	};

	const upload = e => {
		if (!e.file) {
			return;
		}
		api.importAllEvent({
			file: e.file,
		}).then(res => {
			model.log('导入成功');
		}).catch(e => {
			model.log(e);
		});

		return {
			abort() {
				api.cancelUpload()
			},
		};
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		return {
			sheetHeader: ["id", "名称", "标识符", "类型", "关联事件变量", "描述"],
			sheetData: event_entities.map(item => [
				item.id,
				item.name,
				item.entity_key,
				item.value_type,
				item.bind_variables.map(item => item.entity_key).join(', '),
				item.desc,
			]),
		}
	};

	return (
		<Components.Wrap>
			<div className={styles.btnWrap}>
				<Button type="secondary" onClick={onCreateEvent}> 
					创建埋点事件
				</Button>
				<Button style={{marginLeft: 'auto'}}> 
					<a style={{textDecoration:'none'}} href={config.DOWNLOADURL} download>导出事件和变量</a>
				</Button>
				
			    <Upload
			    	request={upload}
		    	>	
			    	<Button style={{marginLeft: '20px'}}>
				        导入事件和变量
		          	</Button>
			    </Upload>
			</div>
			<IceContainer>      		
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{event_entities.length > 0 && <Components.ExportExcel fileName='埋点事件' handle={handleData} />}
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
						<Table.Column title="关联事件变量" cell={renderBind} width={400} />	            	
						<Table.Column title="描述" dataIndex="desc" width={600} />		            	
						<Table.Column title="操作" cell={renderHander} lock={event_entities.length===0?false:'right'} width={120} />		            	
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
            <Drawer
                title={eventName}
                visible={showDrawer}
                placement='right'
                onClose={onCloseDrawer}
                width={600}
            >
				<Table		         	 
					dataSource={bindVariableData}		          		 
					hasBorder={false}		          		
				>		          		
					<Table.Column title="id" dataIndex="id" lock={bindVariableData.length===0?false:true} width={120} />
					<Table.Column title="名称" dataIndex="name" width={120} />
					<Table.Column title="标识符" dataIndex="entity_key" width={120} />
					<Table.Column title="类型" dataIndex="variable_type" width={120} />
					<Table.Column title="描述" dataIndex="desc"  width={400} />	          	
				</Table>
            </Drawer>
		</Components.Wrap>
	);
}