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
import CreateBoard from './components/CreateBoard';

function DataBoard({
	history,
}) {
	const projectId = sessionStorage.getItem('projectId');
	
	const [loading, setLoading] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [data, setData] = useState([]);
	let cancelTask = false; // 防止内存泄漏

	function getBoards() {
		setLoading(true);
		api.getBoards({
			id: projectId
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			setData(res.charts);
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
		getBoards();

		return () => {
			cancelTask = true;
		};
	}, []);

	const jumpDataBoardDetails = (item) => {
		const {
			type,
		} = item;
		let pathname = '';
		switch (type) {
			case 'active_user':
			case 'distribute':
				pathname = '/growthhacker/distributedetails';
				break;
			case 'retention':
				pathname = '/growthhacker/retentiondetails';
				break;
			case 'funnel':
				pathname = '/growthhacker/funneldetails';
				break;
			case 'analysis':
				pathname = '/growthhacker/leveldetails';
		}

		history.push({
			pathname,
			state: {
				projectId,
				boardInfo: item,
			},
		});
	};

	const renderInfo = (info) => {
		return info.map((item, index) => {
			const {
				name,
				value,
			} = item;
			return (
				<div key={index} className={styles.itemChild}>
					<p className={styles.name}>{name}：</p>
					<p className={styles.value}>{value}</p>
				</div>
			);
		});
	};

	const renderList = () => {
		return data.map((item) => {
			const {
				id,
				name,
				desc,
			} = item;

			const info = [{
				name: '看板名称',
				value: name,
			}, {
				name: '看板描述',
				value: desc,
			}];

			return (
				<Button className={styles.item} key={id} onClick={jumpDataBoardDetails.bind(this,item)}>
					{renderInfo(info)}		
				</Button>
			);
		});
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onCreateBoard = () => {
		setShowDialog(true);
	};

	const onOk = (values, cb) => {
		api.createBoard({
			id: projectId,
			trend: values
		}).then((res) => {
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
	      		<Button className={`${styles.item} ${styles.create}`} onClick={onCreateBoard}>
	      			<div className={styles.itemChild}>
		      			<Icon type='add' className={styles.icon} />
		      			<span >新建看板</span>
		      		</div>
	      		</Button>
	    	</div>

	    	<Dialog autoFocus visible={showDialog} onClose={onClose} footer={false}>	
				<CreateBoard onOk={onOk} />
			</Dialog>	
    	</Loading>
	);
}

export default withRouter(DataBoard);