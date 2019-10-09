import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Button,
	Message,
	Loading,
	Icon,
	Dialog
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateProject from './components/CreateProject';

function ProjectList({
	history
}) {
	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	let cancelTask = false; // 防止内存泄漏

	function getProjects() {
		setLoading(true);
		api.getProjects().then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				projects,
			} = res;
			if (projects.length === 0) {
				return;
			}
			sessionStorage.setItem('projectinfo', JSON.stringify(projects[0]));
			setData(projects);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		getProjects();

		return () => {
			cancelTask = true;
		};
	}, []);


	const jumpProjectData = (e) => {
		sessionStorage.setItem('projectinfo', JSON.stringify(e));
		history.push('/growthhacker/projectdata');
	};

	const constructNewItem = (item) => {
		const {
			id,
			name,
			domain_name,
			type,
			desc,
		} = item;
		return [{
			name: '名称：',
			value: name,
		}, {
			name: '域名：',
			value: domain_name,
		}, {
			name: '类型：',
			value: type,
		}, {
			name: '描述：',
			value: desc,
		}];
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
					if (cancelTask) {
						return;
					}
					setData((pre) => {
						pre.splice(index, 1);
						return [...pre];
					});
					Message.success('删除成功');
				}).catch((e) => {
					Message.success(e.toString());
				}).finally(() => {
					if (cancelTask) {
						return;
					}
					setLoading(false);
				});
			}
		});
	}

	const renderList = () => {
		return data.map((item, index) => {
			const newItem = constructNewItem(item);
			return (
				<Button type='primary' className={styles.item} key={item.id} onClick={jumpProjectData.bind(this,item)}>
					{	
						newItem.map((item,index)=>{
							const{
								name,
								value,
							} = item;
							return (
								<div key={index} className={styles.itemChild}>
									<span className={styles.name}>{name}</span>
									<span className={styles.value}>{value}</span>
								</div>
							);
						})
					}
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

	const onOk = (values, cb) => {
		console.log(values);
		api.createProject(values).then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				id,
			} = res;
			setData((pre) => {
				pre.splice(0, 0, {
					id,
					...values,
				});
				return [...pre];
			});
			setShowDialog(false);
			Message.success('创建成功');
		}).catch((e) => {
			cb();
			Message.success(e.toString());
		});
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