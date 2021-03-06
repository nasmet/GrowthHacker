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
	Upload,
	Input,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateEvent from './components/CreateEvent';
import EditVarible from './components/EditVarible';
import BindEventVaribleDetails from './components/BindEventVaribleDetails';

export default function Event() {
	const refCE = useRef(null);
	const refEV = useRef(null);
	const refBEVD = useRef(null);
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
		type: 'event',
	});
	const {
		event_entities = [],
			total = 0,
	} = response;

	useEffect(() => {
		function getEventVariable() {
			api.getDataCenter({
				type: 'variable',
			}).then(res => {
				const variableData = model.assembleEventVaribleData(res.event_entities);
				refCE.current.updateVaribleData(variableData);
				refEV.current.setVaribleData(variableData);
			}).catch(e => {
				console.error(e);
			});
		}

		getEventVariable();

		model.onFire.on('updateEvent', getEventVariable);

		return () => {
			model.onFire.off('updateEvent', getEventVariable);
		}
	}, [])

	const pageChange = e => {
		setCurPage(e);
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

	const onAddVarible = record => {
		refEV.current.onShow(record.id, record.bind_variables);
	};

	const renderHander = (value, index, record) => {
		return (
			<Button type='primary' warning onClick={onDeleteEvent.bind(this, record.id, index)}> 
				删除
			</Button>
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
		const {
			name,
			bind_variables,
		} = record;
		refBEVD.current.onShow(name,bind_variables);
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
		if (event_entities.length < config.LIMIT) {
			event_entities.push(value);
			updateResponse();
		} else {
			const temp = Math.ceil(total / config.LIMIT);
			const lastPage = total % config.LIMIT === 0 ? temp + 1 : temp;
			updateParameter({
				...parameter,
				offset: (lastPage - 1) * config.LIMIT,
			});
			setCurPage(lastPage);
		}
	};

	const onEditVaribleOk = () => {
		updateParameter({ ...parameter
		});
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

	const renderFirstColunm = (value, index, record) => {
		return <span>{ parameter.offset + index+1}</span>;
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
						<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} width={80} />		          		
						<Table.Column title="名称" dataIndex="name" width={120} />		            	
						<Table.Column title="标识符" dataIndex="entity_key" width={120} />		            	
						<Table.Column title="类型" dataIndex="value_type" width={120} />	
						<Table.Column title="关联事件变量" cell={renderBind} width={400} />	            	
						<Table.Column title="描述" dataIndex="desc" width={600} />		            	
						<Table.Column title="操作" cell={renderHander} lock={event_entities.length===0?false:'right'} width={120} />		            	
					</Table>
				</Loading>	          	
			
				<Pagination	
					current={curPage}
					className={styles.pagination}            	
					total={total}		            	
					onChange={pageChange}	            	
				/>	          	
			</IceContainer>		    
			<CreateEvent ref={refCE} onOk={onOk} />
			<EditVarible ref={refEV} onOk={onEditVaribleOk} />
			<BindEventVaribleDetails ref={refBEVD} />
		</Components.Wrap>
	);
}