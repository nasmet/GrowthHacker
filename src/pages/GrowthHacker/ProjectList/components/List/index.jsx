import React, {
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Button,
	Icon,
	Loading,
	Dialog,
} from '@alifd/next';
import styles from './index.module.scss';

function List({
	createProject,
	jump,
}, ref) {
	const btnStyle = {
		padding: '10px',
		borderRadius: '10px',
	};

	useImperativeHandle(ref, () => ({
		addProject: (e) => {
			projects.splice(0, 0, e);
			updateResponse();
		},
	}));

	const {
		response,
		loading,
		showLoading,
		closeLoading,
		updateResponse,
	} = hooks.useRequest(api.getProjects);
	const {
		projects = [],
	} = response;

	const jumpProjectData = (e) => {
		sessionStorage.setItem(config.PROJECTID, e.id);
		sessionStorage.setItem(config.PROJECTNAME, e.name);
		sessionStorage.setItem(config.PROJECTAPPID, e.appid);
		jump();
	};

	function deleteProject(id, index) {
		showLoading();
		api.deleteProject({
			id,
		}).then(() => {
			projects.splice(index, 1);
			model.log('删除成功');
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			closeLoading();
		});
	}

	const onDeleteProject = (id, index, e) => {
		e.stopPropagation();
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				deleteProject(id, index);
			},
		});
	}

	const renderItem = (name, value) => {
		return (
			<div style={{display:'flex'}}>
				<span className={styles.name}>{name}</span>
				<span className={styles.value}>{value}</span>
			</div>
		);
	};

	const renderList = () => {
		return projects.map((item, index) => {
			const {
				id,
				name,
				domain_name,
				type,
				desc,
			} = item;
			return (
				<Button type='primary' className={styles.item} key={id} style={btnStyle} onClick={jumpProjectData.bind(this,item)}>
					{renderItem('名称：',name)}
					{renderItem('域名：',domain_name)}
					{renderItem('类型：',type)}
					{renderItem('描述：',desc)}
					<Icon className={styles.close} type='close' onClick={onDeleteProject.bind(this,item.id,index)} />
				</Button>
			);
		});
	};

	return (
		<Components.Wrap>
			<Loading visible={loading} inline={false}>
				<div className={styles.wrap}>
					{renderList()}
					<Button className={styles.create} style={btnStyle} onClick={createProject}>
						<Icon type='add' style={{marginRight: '4px'}} />
						<span>新建项目</span>						
					</Button>		      		
				</div>		    	
			</Loading>	   	
		</Components.Wrap>
	);
}

export default forwardRef(List);