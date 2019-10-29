import React, {
	useState,
	useEffect,
} from 'react';
import {
	Tab,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import UserDetails from './components/UserDetails';
import {
	tabs,
} from './userScrutinyDetailsConfig';

function UserScrutinyDetails({
	location,
}) {
	const id = location.state.id;

	const [eventInfo, setEventInfo] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [chartStyle, setChartStyle] = useState({});

	function getUserScrutinyEventsBar() {
		setLoading(true);
		api.getUserScrutinyEventsBar({
			openId: id,
			trend: {
				tab: 'all',
			},
		}).then((res) => {
			setChartData(res.bars);
			creatChartStyle();
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	function creatChartStyle(y = 'all') {
		let name = null;
		switch (y) {
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

		setChartStyle({
			x: 'date',
			y,
			cols: {
				'date': {
					type: 'timeCat',
				},
				[y]: {
					alias: name,
				}
			},
			height: 200,
		});
	}

	useEffect(() => {
		getUserScrutinyEventsBar();

		return () => {
			api.cancelRequest();
		};
	}, []);

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
            				openId={id} 
            				tab={key} 
            			/>
          			</Components.Wrap>
        		</Tab.Item>
			);
		});
	};

	const onTabChange = (e) => {
		creatChartStyle(e);
	};

	return (
		<div className={styles.wrap}>
      		<div className={styles.leftContent}>
  				<Components.Title title='用户细查详情' />
      			<IceContainer>
      				<Components.BasicColumn data={chartData} {...chartStyle} forceFit />
				</IceContainer>
      			<Tab defaultActiveKey="all" onChange={onTabChange}>
		      		{renderTab()}
		      	</Tab>
      		</div>
      		<div className={styles.rightContent}>
      			<UserDetails openId={id} />
      		</div>
    	</div>
	);
}

export default withRouter(UserScrutinyDetails);