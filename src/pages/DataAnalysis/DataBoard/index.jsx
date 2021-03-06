import React, {} from 'react';
import {
	Button,
	Loading,
	Icon,
	Dialog,
	Animate,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import styles from './index.module.scss';

const btnStyle = {
	padding: '10px',
	borderRadius: '10px',
};

function DataBoard({
	history,
}) {
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
				pathname = '/dataanalysis/projectdata/pa/distributedetails';
				break;
			case 'retention':
				pathname = '/dataanalysis/projectdata/pa/retentionanalysis/details';
				break;
			case 'funnel':
				pathname = '/dataanalysis/projectdata/pa/funnelanalysis/details';
				break;
			case 'analysis':
				pathname = '/dataanalysis/projectdata/pa/leveldetails';
				break;
			case 'dashboard':
				pathname = '/dataanalysis/projectdata/pa/eventanalysis/details';
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
				<Animate className={styles.wrap} animationAppear={false} animation="fade" singleMode={false}>				
					{renderList()}					
				</Animate>
				{charts.length === 0 && <Components.NotData style={{height:'200px'}} />}      		
			</Components.Wrap> 	   		
		</Loading>
	);
}

export default withRouter(DataBoard);