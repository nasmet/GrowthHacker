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
import DataCenter from './pages/GrowthHacker/DataCenter';
import UserScrutinyDetails from './pages/GrowthHacker/UserAnalysis/UserScrutinyDetails';
import CreateGroup from './pages/GrowthHacker/UserAnalysis/CreateGroup';
import UserGroupDetails from './pages/GrowthHacker/UserAnalysis/UserGroupDetails';
import ShareAnalysis from './pages/GrowthHacker/ShareSpread/ShareAnalysis';
import ShareTrend from './pages/GrowthHacker/ShareSpread/ShareTrend';
import ShareView from './pages/GrowthHacker/ShareSpread/ShareView';
import UserShare from './pages/GrowthHacker/ShareSpread/UserShare';
import AdAnalysis from './pages/GrowthHacker/AdMonitor/AdAnalysis';
import AdCount from './pages/GrowthHacker/AdMonitor/AdCount';
import ARPUAnalysis from './pages/GrowthHacker/AdMonitor/ARPUAnalysis';

import UserTag from './pages/ThousandFaces/UserTag';
import Strategy from './pages/ThousandFaces/Strategy';

import QueryEditor from './pages/Sql/QueryEditor';
import MyQuery from './pages/Sql/MyQuery';
import SaveQuery from './pages/Sql/SaveQuery';
import HistoryRecord from './pages/Sql/HistoryRecord';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';

import NotFound from './common/components/NotFound';

const routerConfig = [
	// 分组路由，children 里的路由会将父节点的 component 作为布局组件
	{
		id: '30001',
		path: '/user/login',
		component: UserLogin,
	}, {
		id: '40001',
		path: '/user/register',
		component: UserRegister,
	}, {
		id: '20001',
		path: '/sql',
		component: SqlLayout,
		children: [{
			id: '20002',
			path: '/sql/queryeditor',
			component: QueryEditor,
			exact: true,
			auth: true,
		}, {
			id: '20003',
			path: '/sql/myquery',
			component: MyQuery,
			exact: true,
			auth: true,
		}, {
			id: '20004',
			path: '/sql/savequery',
			component: SaveQuery,
			exact: true,
			auth: true,
		}, {
			id: '20005',
			path: '/sql/historyrecord',
			component: HistoryRecord,
			exact: true,
			auth: true,
		}, {
			id: '20006',
			path: '/sql',
			// 重定向
			redirect: '/sql/queryeditor',
		}, {
			id: '20007',
			// 404 没有匹配到的路由
			component: NotFound,
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
			auth: true,
		}, {
			id: '1008',
			path: '/growthhacker/projectdata',
			component: ProjectData,
			children: [{
				id: '1008000',
				path: '/growthhacker/projectdata/retentiondetails',
				component: RetentionDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008001',
				path: '/growthhacker/projectdata/funneldetails',
				component: FunnelDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008002',
				path: '/growthhacker/projectdata/distributedetails',
				component: DistributeDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008003',
				path: '/growthhacker/projectdata/leveldetails',
				component: LevelDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008004',
				path: '/growthhacker/projectdata/eventanalysisdetails',
				component: EventAnalysisDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008005',
				path: '/growthhacker/projectdata/db',
				component: DataBoard,
				exact: true,
				auth: true,
			}, {
				id: '1008006',
				path: '/growthhacker/projectdata/pa/eventanalysis',
				component: EventAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008007',
				path: '/growthhacker/projectdata/pa/retentionanalysis',
				component: RetentionAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008008',
				path: '/growthhacker/projectdata/pa/funnelanalysis',
				component: FunnelAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008009',
				path: '/growthhacker/projectdata/ua/usergroup',
				component: UserGroup,
				exact: true,
				auth: true,
			}, {
				id: '1008010',
				path: '/growthhacker/projectdata/ua/userscrutiny',
				component: UserScrutiny,
				exact: true,
				auth: true,
			}, {
				id: '1008011',
				path: '/growthhacker/projectdata/ua/userportrait',
				component: UserPortrait,
				exact: true,
				auth: true,
			}, {
				id: '1008012',
				path: '/growthhacker/projectdata/ua/userscrutinydetails',
				component: UserScrutinyDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008013',
				path: '/growthhacker/projectdata/ua/creategroup',
				component: CreateGroup,
				exact: true,
				auth: true,
			}, {
				id: '1008014',
				path: '/growthhacker/projectdata/ua/usergroupdetails',
				component: UserGroupDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008015',
				path: '/growthhacker/projectdata/dc',
				component: DataCenter,
				exact: true,
				auth: true,
			}, {
				id: '1008016',
				path: '/growthhacker/projectdata/fs/shareanalysis',
				component: ShareAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008018',
				path: '/growthhacker/projectdata/fs/sharetrend',
				component: ShareTrend,
				exact: true,
				auth: true,
			}, {
				id: '1008019',
				path: '/growthhacker/projectdata/fs/shareview',
				component: ShareView,
				exact: true,
				auth: true,
			}, {
				id: '1008020',
				path: '/growthhacker/projectdata/fs/usershare',
				component: UserShare,
				exact: true,
				auth: true,
			}, , {
				id: '1008021',
				path: '/growthhacker/projectdata/ad/adcount',
				component: AdCount,
				exact: true,
				auth: true,
			}, {
				id: '1008022',
				path: '/growthhacker/projectdata/ad/adanalysis',
				component: AdAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008023',
				path: '/growthhacker/projectdata/ad/arpuanalysis',
				component: ARPUAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '10080000',
				path: '/growthhacker/projectdata',
				// 重定向
				redirect: '/growthhacker/projectdata/db',
			}, {
				id: '10080001',
				// 404 没有匹配到的路由
				component: NotFound,
			}],
		}, {
			id: '1009',
			path: '/thousandfaces/usertag',
			component: UserTag,
			exact: true,
			auth: true,
		}, {
			id: '1010',
			path: '/thousandfaces/strategy',
			component: Strategy,
			exact: true,
			auth: true,
		}, {
			id: '10000',
			path: '/',
			// 重定向
			redirect: '/growthhacker/projectlist',
		}, {
			id: '10001',
			// 404 没有匹配到的路由
			component: NotFound,
		}]
	},
];

export default routerConfig;