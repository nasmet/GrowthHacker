import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
} from '@alifd/next';
import {
	withRouter,
	Link,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateProject from './components/CreateProject';

function ProjectList({
	history,
}) {
	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	let cancelTask = false; // 防止内存泄漏
	useEffect(() => {
		setLoading(true);
		api.getProjects().then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				projects,
			} = res;
			setData(projects);
			setLoading(false);
			if (projects.length > 0) {
				sessionStorage.setItem('projectinfo', JSON.stringify(projects[0]));
			}
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
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

	const renderList = () => {
		return data.map((item) => {
			const newItem = constructNewItem(item);
			return (
				<Button className={styles.item} key={item.id} onClick={jumpProjectData.bind(this,item)}>
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