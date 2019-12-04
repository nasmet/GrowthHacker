import React, {
	useEffect,
	useState,
	forwardRef,
	useImperativeHandle,
	useRef,
} from 'react';
import {
	Table,
	Drawer,
	Button,
	Dialog,
} from '@alifd/next';
import CreateEventVaribleValue from '../../../EventVarible/components/EventVaribleDetails/components/CreateEventVaribleValue';

function BindEventVaribleDetails({

}, ref) {
	const refDialog = useRef(null);
	const refVariable = useRef({
		id: 0,
	});
	const [showDrawer, setShowDrawer] = useState(false);
	const [eventName, setEventName] = useState('');
	const [bindVariableData, setBindVariableData] = useState([]);
	const [showChildDrawer, setShowChildDrawer] = useState(false);
	const [childName, setChildName] = useState('');
	const [childData, setChildData] = useState([]);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		onShow: (name, data) => {
			setEventName(name);
			setBindVariableData(data);
			setShowDrawer(true);
		},
	}));

	const onCloseDrawer = () => {
		setShowDrawer(false);
	};

	const renderFirstColunm = (value, index, record) => {
		return <span>{index+1}</span>;
	};

	const onEventVaribleDetails = record => {
		const {
			name,
			id,
		} = record;
		refVariable.current.id = id;
		setChildName(name);
		setShowChildDrawer(true);
		setLoading(true);
		api.getEventVariableValues({
			id,
		}).then(res=>{
			setChildData(res.enums);
		}).catch(e=>{
			model.log(e);
		}).finally(()=>{
			setLoading(false);
		});	
	};

	const renderHander = (value, index, record) => {
		return (
			<Button type='primary' onClick={onEventVaribleDetails.bind(this, record)}> 
				详情
			</Button>
		);
	};

	const onCloseChildDrawer = () => {
		setShowChildDrawer(false);
		setChildData([]);
	};

	const onCreateEventVaribleValue = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		setChildData(pre=>[...pre,value]);
	};

	const onDeleteEventVaribleValue = (variableValueId, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteEventVariableValue({
					variableId: refVariable.current.id,
					variableValueId,
				}).then((res) => {
					setChildData(pre=>{
						pre.splice(index,1);
						return [...pre];
					})
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					setLoading(false);
				});
			},
		});
	};

	const renderCover = (value, index, record) => {
		return (
			<Button type='primary' warning onClick={onDeleteEventVaribleValue.bind(this,record.id,index)}> 
				删除
			</Button>
		);
	};

	return (
		<div>	
			<Drawer
	            title={eventName}
	            visible={showDrawer}
	            placement='right'
	            onClose={onCloseDrawer}
	            width={700}
	        >
				<Table		         	 
					dataSource={bindVariableData}		          		 
					hasBorder={false}		          		
				>		          		
					<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} lock={bindVariableData.length===0?false:true} width={120} />
					<Table.Column title="名称" dataIndex="name" width={120} />
					<Table.Column title="标识符" dataIndex="entity_key" width={120} />
					<Table.Column title="类型" dataIndex="variable_type" width={120} />
					<Table.Column title="描述" dataIndex="desc"  width={400} />
					<Table.Column title="操作" cell={renderHander} lock={bindVariableData.length===0?false:'right'} width={120} />		  
				</Table>
				<Drawer
		            title={childName}
		            visible={showChildDrawer}
		            placement='right'
		            onClose={onCloseChildDrawer}
		            width={600}
	        	>
	        		<Button style={{marginBottom: '10px'}} type="secondary" onClick={onCreateEventVaribleValue}> 
						创建事件变量值
					</Button>
			   		<Table 
			   			loading={loading}
		          		dataSource={childData} 
		          		hasBorder={false}
		          	>	
		          		<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} />
		            	<Table.Column title="事件变量值" dataIndex="value" />
		            	<Table.Column title="操作" cell={renderCover} />
		          	</Table>
			    </Drawer>
	        </Drawer>
	        <CreateEventVaribleValue ref={refDialog} onOk={onOk} id={refVariable.current.id} />
        </div>
	);
}

export default forwardRef(BindEventVaribleDetails);