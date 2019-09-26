// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import BasicLayout from './layouts/BasicLayout';
import SqlLayout from './layouts/SqlLayout';

import Find from './pages/System/Find';
import Monitor from './pages/System/Monitor';
import Analysis from './pages/System/Analysis';

import List from './pages/WeiboOperation/List';
import Status from './pages/WeiboOperation/Status';
import Interactive from './pages/WeiboOperation/Interactive';

import ProjectList from './pages/GrowthHacker/ProjectList';
import ProjectData from './pages/GrowthHacker/ProjectData';
import RetentionDetails from './pages/GrowthHacker/DataBoardDetails/RetentionDetails';
import FunnelDetails from './pages/GrowthHacker/DataBoardDetails/FunnelDetails';
import DistributeDetails from './pages/GrowthHacker/DataBoardDetails/DistributeDetails';
import LevelDetails from './pages/GrowthHacker/DataBoardDetails/LevelDetails';
import UserShare from './pages/GrowthHacker/UserShare';
import DataBoard from './pages/GrowthHacker/DataBoard';
import EventAnalysis from './pages/GrowthHacker/ProductAnalysis/EventAnalysis';
import RetentionAnalysis from './pages/GrowthHacker/ProductAnalysis/RetentionAnalysis';
import FunnelAnalysis from './pages/GrowthHacker/ProductAnalysis/FunnelAnalysis';
import UserGroup from './pages/GrowthHacker/UserAnalysis/UserGroup';
import UserScrutiny from './pages/GrowthHacker/UserAnalysis/UserScrutiny';
import UserPortrait from './pages/GrowthHacker/UserAnalysis/UserPortrait';
import CustomerAnalysis from './pages/GrowthHacker/CustomerAnalysis';
import DataCenter from './pages/GrowthHacker/DataCenter';
import UserScrutinyDetails from './pages/GrowthHacker/UserAnalysis/UserScrutinyDetails';

import QueryEditor from './pages/Sql/QueryEditor';
import MyQuery from './pages/Sql/MyQuery';
import SaveQuery from './pages/Sql/SaveQuery';
import HistoryRecord from './pages/Sql/HistoryRecord';

const routerConfig = [
	// 分组路由，children 里的路由会将父节点的 component 作为布局组件
	{
		id: '10001',
		path: '/',
		component: BasicLayout,
		children: [{
			id: '10002',
			path: '/system/find',
			component: Find,
		}, {
			id: '10003',
			path: '/system/monitor',
			component: Monitor,
		}, {
			id: '10004',
			path: '/system/analysis',
			component: Analysis,
		}, {
			id: '10005',
			path: '/operation/list',
			component: List,
		}, {
			id: '10006',
			path: '/operation/status',
			component: Status,
		}, {
			id: '10007',
			path: '/operation/Interactive',
			component: Interactive,
		}, {
			id: '10008',
			path: '/growthhacker/projectlist',
			component: ProjectList,
			exact: true,
		}, {
			id: '10014',
			path: '/growthhacker/projectdata',
			component: ProjectData,
			children: [{
				id: '10009',
				path: '/growthhacker/retentiondetails',
				component: RetentionDetails,
				exact: true,
			}, {
				id: '10010',
				path: '/growthhacker/funneldetails',
				component: FunnelDetails,
				exact: true,
			}, {
				id: '10011',
				path: '/growthhacker/distributedetails',
				component: DistributeDetails,
				exact: true,
			}, {
				id: '10012',
				path: '/growthhacker/leveldetails',
				component: LevelDetails,
				exact: true,
			}, {
				id: '10013',
				path: '/growthhacker/usershare',
				component: UserShare,
				exact: true,
			}, {
				id: '1000141',
				path: '/growthhacker/projectdata/db',
				component: DataBoard,
				exact: true,
			}, {
				id: '1000142',
				path: '/growthhacker/projectdata/pa/eventanalysis',
				component: EventAnalysis,
				exact: true,
			}, {
				id: '1000143',
				path: '/growthhacker/projectdata/pa/retentionanalysis',
				component: RetentionAnalysis,
				exact: true,
			}, {
				id: '1000144',
				path: '/growthhacker/projectdata/pa/funnelanalysis',
				component: FunnelAnalysis,
				exact: true,
			}, {
				id: '1000145',
				path: '/growthhacker/projectdata/ua/usergroup',
				component: UserGroup,
				exact: true,
			}, {
				id: '1000146',
				path: '/growthhacker/projectdata/ua/userscrutiny',
				component: UserScrutiny,
				exact: true,
			}, {
				id: '1000147',
				path: '/growthhacker/projectdata/ua/userportrait',
				component: UserPortrait,
				exact: true,
			}, {
				id: '1000148',
				path: '/growthhacker/projectdata/ca',
				component: CustomerAnalysis,
				exact: true,
			}, {
				id: '1000149',
				path: '/growthhacker/projectdata/dc',
				component: DataCenter,
				exact: true,
			}, {
				id: '100150',
				path: '/growthhacker/projectdata/pa/userscrutinydetails',
				component: UserScrutinyDetails,
				exact: true,
			}, {
				id: '10001410',
				path: '/growthhacker/projectdata',
				// 重定向
				redirect: '/growthhacker/projectdata/ua/userscrutiny',
			}],
		}, {
			id: '100015',
			path: '/',
			// 重定向
			redirect: '/growthhacker/projectlist',
		}]
	}, {
		id: '20001',
		path: '/sql',
		component: SqlLayout,
		children: [{
			id: '20002',
			path: '/sql/queryeditor',
			component: QueryEditor,
			exact: true,
		}, {
			id: '20003',
			path: '/sql/myquery',
			component: MyQuery,
			exact: true,
		}, {
			id: '20004',
			path: '/sql/savequery',
			component: SaveQuery,
			exact: true,
		}, {
			id: '20005',
			path: '/sql/historyrecord',
			component: HistoryRecord,
			exact: true,
		}, {
			id: '20006',
			path: '/sql',
			// 重定向
			redirect: '/sql/queryeditor',
		}],
	}
];

export default routerConfig;