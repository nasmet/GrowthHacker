import React, {} from 'react';
import {
	Button,
	Loading,
	Icon,
	Dialog,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import styles from './index.module.scss';

function DataBoard({
	history,
}) {
	const btnStyle = {
		padding: '10px',
		borderRadius: '10px',
	};

	const {
		response,
		loading,
		showLoading,
		closeLoading,
	} = hooks.useRequest(api.getBoards);
	const {
		charts = [],
	} = response;

	const jumpDataBoardDetails = (item) => {
		const {
			type,
		} = item;
		let pathname = '';
		switch (type) {
			case 'active_user':
			case 'distribute':
				pathname = '/growthhacker/projectdata/pa/distributedetails';
				break;
			case 'retention':
				pathname = '/growthhacker/projectdata/pa/retentionanalysis';
				break;
			case 'funnel':
				pathname = '/growthhacker/projectdata/pa/funnelanalysis';
				break;
			case 'analysis':
				pathname = '/growthhacker/projectdata/pa/leveldetails';
				break;
			case 'dashboard':
				pathname = '/growthhacker/projectdata/pa/eventanalysis/details';
				break;
		}
		history.push({
			pathname,
			state: {
				boardInfo: item,
			},
		});
	};

	function deleteBoard(id, index) {
		showLoading();
		api.deleteBoard({
			id,
		}).then(() => {
			charts.splice(index, 1);
			model.log('删除成功');
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			closeLoading();
		});
	}

	const onDeleteBoard = (id, index, e) => {
		e.stopPropagation();
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				deleteBoard(id, index);
			},
		});
	}

	const renderList = () => {
		return charts.map((item, index) => {
			const {
				id,
				name,
			} = item;

			return (
				<Button type='secondary' className={styles.item} style={btnStyle} key={id} onClick={jumpDataBoardDetails.bind(this,item)}>
					<Icon className={styles.close} type='close' onClick={onDeleteBoard.bind(this,id,index)} />
					<span className={styles.name}>{name}</span>	
				</Button>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<Components.Wrap>			
				<div className={styles.wrap}>				
					{renderList()}					
				</div>
				{charts.length === 0 && <Components.NotData style={{height:'200px'}} />}      		
			</Components.Wrap> 	   		
		</Loading>
	);
}

export default withRouter(DataBoard);