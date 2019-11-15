import React, {
	useEffect,
} from 'react';
import {
	Button,
	Icon,
	Loading,
	Dialog,
	Animate,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import styles from './index.module.scss';

const btnStyle = {
	padding: '10px',
	borderRadius: '10px',
};

function List({
	history,
}) {
	const {
		dispatch,
		state,
	} = model.useContextValue();

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

	useEffect(() => {
		if (projects.length === 0) {
			return;
		}
		dispatch({
			type: 'update',
			projects,
		});
	}, [response]);

	const onJump = ({
		id,
		name,
		appid,
	}) => {
		sessionStorage.setItem(config.PROJECTID, id);
		sessionStorage.setItem(config.PROJECTNAME, name);
		sessionStorage.setItem(config.PROJECTAPPID, appid);
		history.push('/dataanalysis/projectdata');
	};

	const onDeleteProject = (id, index, e) => {
		e.stopPropagation();
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteProject({
					id,
				}).then(() => {
					dispatch({
						type: 'remove',
						index,
					});
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					closeLoading();
				});
			},
		});
	}

	const renderItem = (name, value) => {
		return (
			<div style={{display: 'flex'}}>
				<span className={styles.name}>{name}</span>
				<span className={styles.value}>{value}</span>
			</div>
		);
	};

	const renderList = () => {
		return state.projects.map((item, index) => {
			const {
				id,
				name,
				domain_name,
				type,
				desc,
			} = item;
			return (
				<Button type='primary' className={styles.item} key={id} style={btnStyle} onClick={onJump.bind(this,item)}>
					{renderItem('名称：',name)}
					{renderItem('域名：',domain_name)}
					{renderItem('类型：',type)}
					{renderItem('描述：',desc)}
					<Icon className={styles.close} type='close' onClick={onDeleteProject.bind(this,item.id,index)} />
				</Button>
			);
		});
	};

	const onCreate = () => {
		dispatch({
			type: 'open',
		});
	};

	return (
		<Components.Wrap>
			<Loading visible={loading} inline={false}>			
				<div className={styles.wrap}>
					<Animate className={styles.wrap} animationAppear={false} animation="fade" singleMode={false}>						
						{renderList()}						
					</Animate>
					<Button className={styles.create} style={btnStyle} onClick={onCreate}>
						<Icon type='add' style={{marginRight: '4px'}} />
						<span>新建项目</span>						
					</Button>		      		
				</div>			    	
			</Loading>	   	
		</Components.Wrap>
	);
}

export default withRouter(List);