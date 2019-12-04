import React, {
	useEffect,
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Table,
	Drawer,
	Button,
} from '@alifd/next';

function BindEventVaribleDetails({

}, ref) {
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
	};

	return (
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
		   		<Table 
		   			loading={loading}
	          		dataSource={childData} 
	          		hasBorder={false}
	          	>	
	          		<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} />
	            	<Table.Column title="事件变量值" dataIndex="value" />
	          	</Table>
		    </Drawer>
        </Drawer>
	);
}

export default forwardRef(BindEventVaribleDetails);