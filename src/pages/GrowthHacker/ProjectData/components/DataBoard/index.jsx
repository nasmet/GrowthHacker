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

const projectListConfig = [{
	id: 1,
	name: '实时在线人数',
}, {
	id: 2,
	name: '关卡通关率',
}];

function DataBoard({
	history,
	projectId,
}) {
	const [showDialog, setShowDialog] = useState(false);

	const jumpDataBoardDetails = (id) => {
		history.push({
			pathname: '/growthhacker/databoarddetails',
			state: {
				projectId,
				boardId: id,
			},
		});
	};

	const renderList = () => {
		return projectListConfig.map((item) => {
			const {
				id,
				name,
			} = item;
			return (
				<Button className={styles.item} key={id} onClick={jumpDataBoardDetails.bind(this,id)}>
					<span className={styles.name}>{name}</span>
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
		api.createBoard(values).then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				id,
			} = res;
			// setData((pre) => {
			// 	pre.splice(0, 0, {
			// 		id,
			// 		...values,
			// 	});
			// 	return [...pre];
			// });
			setShowDialog(false);
			Message.success('创建成功');
		}).catch((e) => {
			cb();
			Message.success(e.toString());
		});
	};

	return (
		<div className={styles.wrap}>
      		{renderList()}
      		<Button className={styles.item} onClick={onCreateBoard}>
      			<Icon type='add' />
      			<span className={styles.name}>新建看板</span>
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
	);
}

export default withRouter(DataBoard);