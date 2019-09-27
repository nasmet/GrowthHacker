import React, {
	Component,
	useState,
	useEffect,
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
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import EventInfo from './components/EventInfo';
import UserDetails from './components/UserDetails';
import {
	tabs,
} from './userScrutinyDetailsConfig';

const {
	Item
} = Tab;

function UserScrutinyDetails({
	location,
}) {
	const projectId = sessionStorage.getItem('projectId');
	const {
		id,
	} = location.state;

	let cancelTask = false;
	const [eventInfo, setEventInfo] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [chartStyle, setChartStyle] = useState({});

	function getUserScrutinyEventsBar() {
		setLoading(true);
		api.getUserScrutinyEventsBar({
			projectId,
			openId: id,
			trend: {
				tab: 'all',
			},
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				bars,
			} = res;
			console.log(res);
			setChartData(bars);
			creatChartStyle();
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
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
			cancelTask = true;
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
				<Item key={key} title={tab} >
          			<div className={styles.marginTop10}>
            			<Component 
            				projectId={projectId} 
            				openId={id} 
            				tab={key} 
            				onEventDetals={onEventDetals} 
            			/>
          			</div>
        		</Item>
			);
		});
	};

	const onEventDetals = (e) => {
		console.log(e);
	};

	const onTabChange = (e) => {
		creatChartStyle(e);
	};

	const onBack = () => {
		history.back();
	};

	return (
		<div className={styles.wrap}>
      		<div className={styles.leftContent}>
      			<p>
					<Button style={{borderRadius:'10px'}} onClick={onBack}>返回今日访问用户</Button>
				</p>
      			<Loading visible={loading} inline={false}>
      				<Components.BasicColumn data={chartData} {...chartStyle} forceFit />
      			</Loading>
      			<Tab defaultActiveKey="all" onChange={onTabChange}>
		      		{renderTab()}
		      	</Tab>
      		</div>
      		<div className={styles.rightContent}>
      			<UserDetails projectId={projectId} openId={id} />
      			{/*<EventInfo eventInfo={eventInfo} />*/}
      		</div>
    	</div>
	);
}

export default withRouter(UserScrutinyDetails);