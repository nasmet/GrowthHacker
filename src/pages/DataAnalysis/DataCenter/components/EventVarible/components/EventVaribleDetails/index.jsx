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
import CreateEventVaribleValue from './components/CreateEventVaribleValue';

export default function EventVaribleDetails({
	id,
	name,
}) {
	const refDialog = useRef(null);
	const {
		showLoading,
		closeLoading,
		updateResponse,
		response,
		loading,	
	} = hooks.useRequest(api.getEventVariableValues, {
		id,
	});

	const {
		enums = [],
	} = response;

	const onCreateEventVaribleValue = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		enums.push(value);
		updateResponse();
	};

	const onDeleteEventVaribleValue = (variableValueId, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteEventVariableValue({
					variableId: id,
					variableValueId,
				}).then((res) => {
					enums.splice(index,1);
					updateResponse();
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
			<Button type='primary' warning onClick={onDeleteEventVaribleValue.bind(this,record.id,index)}> 
				删除
			</Button>
		);
	};

	const renderFirstColunm = (value, index, record) => {
		return <span>{index+1}</span>;
	};

	return (
		<Components.Wrap>
			<Components.Title title={name} />
			<IceContainer>
				<Button style={{marginBottom: '10px'}} type="secondary" onClick={onCreateEventVaribleValue}> 
					创建事件变量值
				</Button>
				<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={enums} 
		          		hasBorder={false}
		          	>	
		          		<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} />
		            	<Table.Column title="事件变量值" dataIndex="value" />
		            	<Table.Column title="操作" cell={renderCover} />
		          	</Table>
				</Loading>
		    </IceContainer>
			<CreateEventVaribleValue ref={refDialog} onOk={onOk} id={id} />
    	</Components.Wrap>
	);
}