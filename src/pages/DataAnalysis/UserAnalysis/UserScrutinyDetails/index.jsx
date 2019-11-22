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
import UserDetails from './components/UserDetails';
import {
	tabs,
} from './config';

function UserScrutinyDetails({
	location,
}) {
	const record = location.state.record;
	const openId = record[1];
	const [type, setType] = useState('all');

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
				name = '全部事件'
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

	const renderTab = () => {
		return tabs.map((item) => {
			const {
				key,
				tab,
				Component,
			} = item;
			return (
				<Tab.Item key={key} title={tab} >
          			<Components.Wrap>
            			<Component 
            				openId={openId} 
            				tab={key} 
            			/>
          			</Components.Wrap>
        		</Tab.Item>
			);
		});
	};

	const onTabChange = (e) => {
		setType(e);
	};

	return (
		<div className={styles.wrap}>
      		<div className={styles.leftContent}> 
      			<Components.Title title='用户细查详情' /> 				
      			<IceContainer>
      				<Loading visible={loading} inline={false}>
      					<Components.BasicColumn data={bars} {...setChartStyle(type)} forceFit />
      				</Loading>
				</IceContainer>
      			<Tab defaultActiveKey="all" onChange={onTabChange}>
		      		{renderTab()}
		      	</Tab>
      		</div>
      		<div className={styles.rightContent}>
      			<UserDetails record={record} />
      		</div>
    	</div>
	);
}

export default withRouter(UserScrutinyDetails);