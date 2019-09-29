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
import EventAnalysisDetails from './pages/GrowthHacker/DataBoardDetails/EventAnalysisDetails';
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
import CreateGroup from './pages/GrowthHacker/UserAnalysis/CreateGroup';
import UserGroupDetails from './pages/GrowthHacker/UserAnalysis/UserGroupDetails';
import ShareAnalysis from './pages/GrowthHacker/ShareSpread/ShareAnalysis';
import ShareTrend from './pages/GrowthHacker/ShareSpread/ShareTrend';
import ShareView from './pages/GrowthHacker/ShareSpread/ShareView';
import UserShare from './pages/GrowthHacker/ShareSpread/UserShare';

import QueryEditor from './pages/Sql/QueryEditor';
import MyQuery from './pages/Sql/MyQuery';
import SaveQuery from './pages/Sql/SaveQuery';
import HistoryRecord from './pages/Sql/HistoryRecord';

const routerConfig = [
	// 分组路由，children 里的路由会将父节点的 component 作为布局组件
	{
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
	}, {
		id: '1000',
		path: '/',
		component: BasicLayout,
		children: [{
			id: '1001',
			path: '/system/find',
			component: Find,
		}, {
			id: '1002',
			path: '/system/monitor',
			component: Monitor,
		}, {
			id: '1003',
			path: '/system/analysis',
			component: Analysis,
		}, {
			id: '1004',
			path: '/operation/list',
			component: List,
		}, {
			id: '1005',
			path: '/operation/status',
			component: Status,
		}, {
			id: '1006',
			path: '/operation/Interactive',
			component: Interactive,
		}, {
			id: '1007',
			path: '/growthhacker/projectlist',
			component: ProjectList,
			exact: true,
		}, {
			id: '1008',
			path: '/growthhacker/projectdata',
			component: ProjectData,
			children: [{
				id: '1008000',
				path: '/growthhacker/projectdata/retentiondetails',
				component: RetentionDetails,
				exact: true,
			}, {
				id: '1008001',
				path: '/growthhacker/projectdata/funneldetails',
				component: FunnelDetails,
				exact: true,
			}, {
				id: '1008002',
				path: '/growthhacker/projectdata/distributedetails',
				component: DistributeDetails,
				exact: true,
			}, {
				id: '1008003',
				path: '/growthhacker/projectdata/leveldetails',
				component: LevelDetails,
				exact: true,
			}, {
				id: '1008003',
				path: '/growthhacker/projectdata/eventanalysisdetails',
				component: EventAnalysisDetails,
				exact: true,
			}, {
				id: '1008005',
				path: '/growthhacker/projectdata/db',
				component: DataBoard,
				exact: true,
			}, {
				id: '1008006',
				path: '/growthhacker/projectdata/pa/eventanalysis',
				component: EventAnalysis,
				exact: true,
			}, {
				id: '1008007',
				path: '/growthhacker/projectdata/pa/retentionanalysis',
				component: RetentionAnalysis,
				exact: true,
			}, {
				id: '1008008',
				path: '/growthhacker/projectdata/pa/funnelanalysis',
				component: FunnelAnalysis,
				exact: true,
			}, {
				id: '1008009',
				path: '/growthhacker/projectdata/ua/usergroup',
				component: UserGroup,
				exact: true,
			}, {
				id: '1008010',
				path: '/growthhacker/projectdata/ua/userscrutiny',
				component: UserScrutiny,
				exact: true,
			}, {
				id: '1008011',
				path: '/growthhacker/projectdata/ua/userportrait',
				component: UserPortrait,
				exact: true,
			}, {
				id: '1008014',
				path: '/growthhacker/projectdata/ua/userscrutinydetails',
				component: UserScrutinyDetails,
				exact: true,
			}, {
				id: '1008015',
				path: '/growthhacker/projectdata/ua/creategroup',
				component: CreateGroup,
				exact: true,
			}, {
				id: '1008016',
				path: '/growthhacker/projectdata/ua/usergroupdetails',
				component: UserGroupDetails,
				exact: true,
			}, {
				id: '1008012',
				path: '/growthhacker/projectdata/ca',
				component: CustomerAnalysis,
				exact: true,
			}, {
				id: '1008013',
				path: '/growthhacker/projectdata/dc',
				component: DataCenter,
				exact: true,
			}, {
				id: '1008017',
				path: '/growthhacker/projectdata/fs/shareanalysis',
				component: ShareAnalysis,
				exact: true,
			}, {
				id: '1008018',
				path: '/growthhacker/projectdata/fs/sharetrend',
				component: ShareTrend,
				exact: true,
			}, {
				id: '1008019',
				path: '/growthhacker/projectdata/fs/shareview',
				component: ShareView,
				exact: true,
			}, {
				id: '1008020',
				path: '/growthhacker/projectdata/fs/usershare',
				component: UserShare,
				exact: true,
			}, {
				id: '10080000',
				path: '/growthhacker/projectdata',
				// 重定向
				redirect: '/growthhacker/projectdata/db',
			}],
		}, {
			id: '10000',
			path: '/',
			// 重定向
			redirect: '/growthhacker/projectlist',
		}]
	}
];

export default routerConfig;