import React, {
	useState,
} from 'react';
import {
	Tab,
	Loading,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from './components/Template';

function UserScrutinyDetails({
	location,
}) {
	const record = location.state.record;
	const openId = record[1];

	const {
		response,
		loading,
	} = hooks.useRequest(api.getUserScrutinyEventsBar, {
		openId,
		trend: {
			tab: 'all',
		},
	});
	const {
		bars = [],
	} = response;
	
	function setChartStyle(type = 'all') {
		let name = null;
		switch (type) {
			case 'all':
				name = '事件数量'
				break;
			case 'pageview':
				name = '页面浏览'
				break;
			case 'others':
				name = '其他交互行为'
				break;
		}

		return {
			x: 'date',
			y: type,
			cols: {
				'date': {
					type: 'timeCat',
				},
				[type]: {
					alias: name,
				}
			},
			height: 200,
		}
	}

	return (
		<div className={styles.wrap}>
      		<div className={styles.leftContent}> 
      			<Components.Title title='用户细查详情' /> 				
      			<IceContainer>
      				<Loading visible={loading} inline={false}>
      					<Components.BasicColumn data={bars} {...setChartStyle()} forceFit />
      				</Loading>
				</IceContainer>
				<Template 
    				openId={openId} 
    				tab='all' 
    			/>
      		</div>
    	</div>
	);
}

export default withRouter(UserScrutinyDetails);