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
		api.getProjects({
			limit: 5,
			offset: 0,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				projects,
			} = res;
			setData(projects);
			setLoading(false);
			if (projects.length > 0) {
				sessionStorage.setItem('projectinfo', JSON.stringify({
					id: projects[0].id,
					name: projects[0].name,
				}));
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

	const jumpProjectData = (id, name) => {
		sessionStorage.setItem('projectinfo', JSON.stringify({
			id,
			name,
		}));
		history.push('/growthhacker/projectdata');
	};

	const renderList = () => {
		return data.map((item) => {
			const {
				id,
				name,
			} = item;
			return (
				<Button className={styles.item} key={id} onClick={jumpProjectData.bind(this,id,name)}>
					<span className={styles.name}>{name}</span>
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
	      		<Button className={styles.item} onClick={onCreateProject}>
	      			<Icon type='add' />
	      			<span className={styles.name}>新建项目</span>
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