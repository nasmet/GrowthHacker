import React, {
	Component,
	useState,
	useEffect,
	useReducer,
} from 'react';
import {
	Button,
	Loading,
	Icon,
	Dialog
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import styles from './index.module.scss';
import CreateProject from './components/CreateProject';

function ProjectList({
	history
}) {
	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		function getProjects() {
			setLoading(true);
			api.getProjects().then((res) => {
				setData(res.projects);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getProjects();
	}, []);

	const jumpProjectData = (e) => {
		sessionStorage.setItem(config.PROJECTID, e.id);
		sessionStorage.setItem(config.PROJECTNAME, e.name);
		history.push('/growthhacker/projectdata');
	};

	const onDeleteProject = (id, index, e) => {
		e.stopPropagation();
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteProject({
					id,
				}).then((res) => {
					setData((pre) => {
						pre.splice(index, 1);
						return [...pre];
					});
					model.log('删除成功');
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					setLoading(false);
				});
			}
		});
	}

	const renderList = () => {
		return data.map((item, index) => {
			const {
				id,
				name,
				domain_name,
				type,
				desc,
			} = item;
			return (
				<Button type='primary' className={styles.item} key={id} onClick={jumpProjectData.bind(this,item)}>
					<div className={styles.itemChild}>
						<span className={styles.name}>名称：</span>
						<span className={styles.value}>{name}</span>
					</div>
					<div className={styles.itemChild}>
						<span className={styles.name}>域名：</span>
						<span className={styles.value}>{domain_name}</span>
					</div>
					<div className={styles.itemChild}>
						<span className={styles.name}>类型：</span>
						<span className={styles.value}>{type}</span>
					</div>
					<div className={styles.itemChild}>
						<span className={styles.name}>描述：</span>
						<span className={styles.value}>{desc}</span>
					</div>
					<Icon className={styles.close} type='close' onClick={onDeleteProject.bind(this,item.id,index)} />
				</Button>
			);
		});
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onCreateProject = () => {
		setShowDialog(true);
	};

	const onOk = (id, values) => {
		setData((pre) => {
			pre.splice(0, 0, {
				id,
				...values,
			});
			return [...pre];
		});
		setShowDialog(false);
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
	      		{renderList()}
	      		<Button className={`${styles.item} ${styles.create}`} onClick={onCreateProject}>
	      			<div className={styles.itemChild}>
	      				<Icon type='add' className={styles.icon} />
	      				<span>新建项目</span>
	      			</div>
	      		</Button>		
	      		<Dialog 
			   		autoFocus
			      	visible={showDialog} 
			      	onClose={onClose}
			      	footer={false}
			    >	
					<CreateProject onOk={onOk} />
				</Dialog>
	    	</div>
    	</Loading>
	);
}

export default withRouter(ProjectList);