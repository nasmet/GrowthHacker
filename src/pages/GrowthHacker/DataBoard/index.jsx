import React, {
	Component,
	useState,
	useEffect
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
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function DataBoard({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	function getBoards() {
		setLoading(true);
		api.getBoards().then((res) => {
			setData(res.charts);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		getBoards();
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
				break;
			case 'dashboard':
				pathname = '/growthhacker/projectdata/eventanalysisdetails';
				break;
		}

		history.push({
			pathname,
			state: {
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
				desc,
			} = item;

			return (
				<Button type='secondary' className={styles.item} key={id} onClick={jumpDataBoardDetails.bind(this,item)}>
					<Icon className={styles.close} type='close' onClick={onDeleteBoard.bind(this,id,index)} />
					<span className={styles.name}>{name}</span>	
				</Button>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<Components.Wrap>
				<div className={styles.content}>
					{renderList()}
				</div>
	      		{data.length===0 && <Components.NotData style={{height:'200px'}} />}
    		</Components.Wrap>
    	</Loading>
	);
}

export default withRouter(DataBoard);