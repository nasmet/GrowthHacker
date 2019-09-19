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
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateBoard from './components/CreateBoard';

function DataBoard({
	history,
	projectId,
}) {
	const [loading, setLoading] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [data, setData] = useState([]);
	let cancelTask = false;

	useEffect(() => {
		setLoading(true);
		api.getBoards({
			id: projectId,
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
	}, []);

	const jumpDataBoardDetails = (item) => {
		const {
			type,
		} = item;
		let pathname = '';
		switch (type) {
			case 'board':
				pathname = '/growthhacker/databoarddetails';
				break;
			case 'retention':
				pathname = '/growthhacker/retentiondetails';
				break;
			case 'funnel':
				pathname = '/growthhacker/funneldetails';
				break;
		}
		history.push({
			pathname,
			state: {
				projectId,
				boardInfo: item,
			},
		});
	};

	const getItem = (name, value) => {
		return (
			<div className={styles.itemChild}>
				<span className={styles.name}>{name}：</span>
				<span className={styles.value}>{value}</span>
			</div>
		)
	};

	const renderList = () => {
		return data.map((item) => {
			const {
				id,
				name,
				desc,
			} = item;
			return (
				<Button className={styles.item} key={id} onClick={jumpDataBoardDetails.bind(this,item)}>
					{
						getItem('名称',name)
					}
					{
						getItem('描述',desc)
					}			
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
		console.log(values);
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
	  			<Dialog 
			   		autoFocus
			      	visible={showDialog} 
			      	onClose={onClose}
			      	footer={false}
			    >	
					<CreateBoard onOk={onOk} />
				</Dialog>		
	    	</div>
    	</Loading>
	);
}

export default withRouter(DataBoard);