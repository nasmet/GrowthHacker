// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import React from 'react';

import BasicLayout from './layouts/BasicLayout';
const SqlLayout = React.lazy(() =>
	import ('./layouts/SqlLayout'));

// 数据分析
const ProjectList = React.lazy(() =>
	import ('./pages/DataAnalysis/ProjectList'));
const ProjectData = React.lazy(() =>
	import ('./pages/DataAnalysis/ProjectData'));
const DataBoard = React.lazy(() =>
	import ('./pages/DataAnalysis/DataBoard'));
const DistributeDetails = React.lazy(() =>
	import ('./pages/DataAnalysis/DataBoardDetails/DistributeDetails'));
const LevelDetails = React.lazy(() =>
	import ('./pages/DataAnalysis/DataBoardDetails/LevelDetails'));
const EventAnalysis = React.lazy(() =>
	import ('./pages/DataAnalysis/ProductAnalysis/EventAnalysis'));
const RetentionAnalysis = React.lazy(() =>
	import ('./pages/DataAnalysis/ProductAnalysis/RetentionAnalysis'));
const FunnelAnalysis = React.lazy(() =>
	import ('./pages/DataAnalysis/ProductAnalysis/FunnelAnalysis'));
const UserGroup = React.lazy(() =>
	import ('./pages/DataAnalysis/UserAnalysis/UserGroup'));
const CreateGroup = React.lazy(() =>
	import ('./pages/DataAnalysis/UserAnalysis/CreateGroup'));
const UserGroupDetails = React.lazy(() =>
	import ('./pages/DataAnalysis/UserAnalysis/UserGroupDetails'));
const UserScrutiny = React.lazy(() =>
	import ('./pages/DataAnalysis/UserAnalysis/UserScrutiny'));
const UserScrutinyDetails = React.lazy(() =>
	import ('./pages/DataAnalysis/UserAnalysis/UserScrutinyDetails'));
const UserPortrait = React.lazy(() =>
	import ('./pages/DataAnalysis/UserAnalysis/UserPortrait'));
const HeatMap = React.lazy(() =>
	import ('./pages/DataAnalysis/UserAnalysis/HeatMap'));
const ShareAnalysis = React.lazy(() =>
	import ('./pages/DataAnalysis/ShareSpread/ShareAnalysis'));
const ShareTrend = React.lazy(() =>
	import ('./pages/DataAnalysis/ShareSpread/ShareTrend'));
const ShareView = React.lazy(() =>
	import ('./pages/DataAnalysis/ShareSpread/ShareView'));
const UserShare = React.lazy(() =>
	import ('./pages/DataAnalysis/ShareSpread/UserShare'));
const AdAnalysis = React.lazy(() =>
	import ('./pages/DataAnalysis/AdMonitor/AdAnalysis'));
const AdCount = React.lazy(() =>
	import ('./pages/DataAnalysis/AdMonitor/AdCount'));
const ARPUAnalysis = React.lazy(() =>
	import ('./pages/DataAnalysis/AdMonitor/ARPUAnalysis'));
const UserWorth = React.lazy(() =>
	import ('./pages/DataAnalysis/CustomerAnalysis/UserWorth'));
const GroupWorth = React.lazy(() =>
	import ('./pages/DataAnalysis/CustomerAnalysis/GroupWorth'));
const DataCenter = React.lazy(() =>
	import ('./pages/DataAnalysis/DataCenter'));
const NewEvent = React.lazy(() =>
	import ('./pages/DataAnalysis/NewEvent'));

// 千人千面
const UserTag = React.lazy(() =>
	import ('./pages/ThousandFaces/UserTag'));
const Strategy = React.lazy(() =>
	import ('./pages/ThousandFaces/Strategy'));
const Plan = React.lazy(() =>
	import ('./pages/ThousandFaces/Plan'));
const Rule = React.lazy(() =>
	import ('./pages/ThousandFaces/Rule'));
const CreateRule = React.lazy(() =>
	import ('./pages/ThousandFaces/CreateRule'));
const RuleDetails = React.lazy(() =>
	import ('./pages/ThousandFaces/RuleDetails'));
const TagLibrary = React.lazy(() =>
	import ('./pages/ThousandFaces/TagLibrary'));

// sql
const QueryEditor = React.lazy(() =>
	import ('./pages/Sql/QueryEditor'));
const MyQuery = React.lazy(() =>
	import ('./pages/Sql/MyQuery'));
const SaveQuery = React.lazy(() =>
	import ('./pages/Sql/SaveQuery'));
const HistoryRecord = React.lazy(() =>
	import ('./pages/Sql/HistoryRecord'));

import UserLogin from './pages/UserLogin';

import NotFound from './common/components/NotFound';

const routerConfig = [
	// 分组路由，children 里的路由会将父节点的 component 作为布局组件
	{
		id: '30001',
		path: '/user/login',
		component: UserLogin,
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
			id: '1007',
			path: '/dataanalysis/projectlist',
			component: ProjectList,
			exact: true,
			auth: true,
		}, {
			id: '1008',
			path: '/dataanalysis/projectdata',
			component: ProjectData,
			children: [{
				id: '1008002',
				path: '/dataanalysis/projectdata/pa/distributedetails',
				component: DistributeDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008003',
				path: '/dataanalysis/projectdata/pa/leveldetails',
				component: LevelDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008005',
				path: '/dataanalysis/projectdata/db',
				component: DataBoard,
				exact: true,
				auth: true,
			}, {
				id: '1008006',
				path: '/dataanalysis/projectdata/pa/eventanalysis/new',
				component: EventAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008004',
				path: '/dataanalysis/projectdata/pa/eventanalysis/details',
				component: EventAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008007',
				path: '/dataanalysis/projectdata/pa/retentionanalysis/new',
				component: RetentionAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008000',
				path: '/dataanalysis/projectdata/pa/retentionanalysis/details',
				component: RetentionAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008008',
				path: '/dataanalysis/projectdata/pa/funnelanalysis/new',
				component: FunnelAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008001',
				path: '/dataanalysis/projectdata/pa/funnelanalysis/details',
				component: FunnelAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008009',
				path: '/dataanalysis/projectdata/ua/usergroup',
				component: UserGroup,
				exact: true,
				auth: true,
			}, {
				id: '1008010',
				path: '/dataanalysis/projectdata/ua/userscrutiny',
				component: UserScrutiny,
				exact: true,
				auth: true,
			}, {
				id: '1008011',
				path: '/dataanalysis/projectdata/ua/userportrait',
				component: UserPortrait,
				exact: true,
				auth: true,
			}, {
				id: '1008012',
				path: '/dataanalysis/projectdata/ua/userscrutinydetails',
				component: UserScrutinyDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008013',
				path: '/dataanalysis/projectdata/ua/creategroup',
				component: CreateGroup,
				exact: true,
				auth: true,
			}, {
				id: '1008014',
				path: '/dataanalysis/projectdata/ua/usergroupdetails',
				component: UserGroupDetails,
				exact: true,
				auth: true,
			}, {
				id: '1008015',
				path: '/dataanalysis/projectdata/dc',
				component: DataCenter,
				exact: true,
				auth: true,
			}, {
				id: '1008016',
				path: '/dataanalysis/projectdata/fs/shareanalysis',
				component: ShareAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008018',
				path: '/dataanalysis/projectdata/fs/sharetrend',
				component: ShareTrend,
				exact: true,
				auth: true,
			}, {
				id: '1008019',
				path: '/dataanalysis/projectdata/fs/shareview',
				component: ShareView,
				exact: true,
				auth: true,
			}, {
				id: '1008020',
				path: '/dataanalysis/projectdata/fs/usershare',
				component: UserShare,
				exact: true,
				auth: true,
			}, , {
				id: '1008021',
				path: '/dataanalysis/projectdata/ad/adcount',
				component: AdCount,
				exact: true,
				auth: true,
			}, {
				id: '1008022',
				path: '/dataanalysis/projectdata/ad/adanalysis',
				component: AdAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008023',
				path: '/dataanalysis/projectdata/ad/arpuanalysis',
				component: ARPUAnalysis,
				exact: true,
				auth: true,
			}, {
				id: '1008025',
				path: '/dataanalysis/projectdata/newevent',
				component: NewEvent,
				exact: true,
				auth: true,
			}, {
				id: '1008026',
				path: '/dataanalysis/projectdata/ca/userworth',
				component: UserWorth,
				exact: true,
				auth: true,
			}, {
				id: '1008027',
				path: '/dataanalysis/projectdata/ca/groupworth',
				component: GroupWorth,
				exact: true,
				auth: true,
			}, {
				id: '1008028',
				path: '/dataanalysis/projectdata/ua/heatmap',
				component: HeatMap,
				exact: true,
				auth: true,
			}, {
				id: '10080000',
				path: '/dataanalysis/projectdata',
				// 重定向
				redirect: '/dataanalysis/projectdata/db',
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
			id: '1011',
			path: '/thousandfaces/plan',
			component: Plan,
			exact: true,
			auth: true,
		}, {
			id: '1012',
			path: '/thousandfaces/rule',
			component: Rule,
			exact: true,
			auth: true,
		}, {
			id: '1013',
			path: '/thousandfaces/createrule',
			component: CreateRule,
			exact: true,
			auth: true,
		}, {
			id: '1014',
			path: '/thousandfaces/taglibrary',
			component: TagLibrary,
			exact: true,
			auth: true,
		}, {
			id: '1015',
			path: '/thousandfaces/ruledetails',
			component: RuleDetails,
			exact: true,
			auth: true,
		}, {
			id: '10000',
			path: '/',
			// 重定向
			redirect: '/dataanalysis/projectlist',
		}, {
			id: '10001',
			// 404 没有匹配到的路由
			component: NotFound,
		}]
	},
];

export default routerConfig;