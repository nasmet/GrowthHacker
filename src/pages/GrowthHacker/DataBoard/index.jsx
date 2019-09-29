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

function DataBoard({
	history,
}) {
	const projectId = sessionStorage.getItem('projectId');

	const [loading, setLoading] = useState(false);
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
				pathname = '/growthhacker/projectdata/distributedetails';
				break;
			case 'retention':
				pathname = '/growthhacker/projectdata/retentiondetails';
				break;
			case 'funnel':
				pathname = '/growthhacker/projectdata/funneldetails';
				break;
			case 'analysis':
				pathname = '/growthhacker/projectdata/leveldetails';
			case 'dashboard':
				pathname = '/growthhacker/projectdata/eventanalysisdetails';
		}

		history.push({
			pathname,
			state: {
				projectId,
				boardInfo: item,
			},
		});
	};

	const onDeleteBoard = (id, index, e) => {
		e.stopPropagation();
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteBoard({
					projectId,
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
			const {
				id,
				name,
				desc,
			} = item;

			return (
				<Button className={styles.item} key={id} onClick={jumpDataBoardDetails.bind(this,item)}>
					<Icon className={styles.close} type='close' onClick={onDeleteBoard.bind(this,id,index)} />
					<span className={styles.name}>{name}</span>	
				</Button>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
	      		{renderList()}
	    	</div>
    	</Loading>
	);
}

export default withRouter(DataBoard);