// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import Find from './pages/System/Find';
import Monitor from './pages/System/Monitor';
import Analysis from './pages/System/Analysis';

import List from './pages/WeiboOperation/List';
import Status from './pages/WeiboOperation/Status';
import Interactive from './pages/WeiboOperation/Interactive';

import ProjectList from './pages/GrowthHacker/ProjectList';
import ProjectData from './pages/GrowthHacker/ProjectData';
import RetentionDetails from './pages/GrowthHacker/RetentionDetails';
import FunnelDetails from './pages/GrowthHacker/FunnelDetails';
import DistributeDetails from './pages/GrowthHacker/DistributeDetails';
import LevelDetails from './pages/GrowthHacker/LevelDetails';
import UserShare from './pages/GrowthHacker/UserShare';

import QueryEditor from './pages/Sql/QueryEditor';
import MyQuery from './pages/Sql/MyQuery';
import SaveQuery from './pages/Sql/SaveQuery';
import HistoryRecord from './pages/Sql/HistoryRecord';

const system = [{
	path: '/system/find',
	component: Find,
	exact: true,
}, {
	path: '/system/monitor',
	component: Monitor,
	exact: true,
}, {
	path: '/system/analysis',
	component: Analysis,
	exact: true,
}];

const weibo = [{
	path: '/operation/list',
	component: List,
	exact: true,
}, {
	path: '/operation/status',
	component: Status,
	exact: true,
}, {
	path: '/operation/Interactive',
	component: Interactive,
	exact: true,
}];

const growthhacker = [{
	path: '/growthhacker/projectlist',
	component: ProjectList,
	exact: true,
}, {
	path: '/growthhacker/projectdata',
	component: ProjectData,
	exact: true,
}, {
	path: '/growthhacker/retentiondetails',
	component: RetentionDetails,
	exact: true,
}, {
	path: '/growthhacker/funneldetails',
	component: FunnelDetails,
	exact: true,
}, {
	path: '/growthhacker/distributedetails',
	component: DistributeDetails,
	exact: true,
}, {
	path: '/growthhacker/leveldetails',
	component: LevelDetails,
	exact: true,
}, {
	path: '/growthhacker/usershare',
	component: UserShare,
	exact: true,
}];

const sql = [{
	path: '/sql/queryeditor',
	component: QueryEditor,
	exact: true,
}, {
	path: '/sql/myquery',
	component: MyQuery,
	exact: true,
}, {
	path: '/sql/savequery',
	component: SaveQuery,
	exact: true,
}, {
	path: '/sql/historyrecord',
	component: HistoryRecord,
	exact: true,
}];

const routerConfig = [...system, ...weibo, ...growthhacker, ...sql];

export default routerConfig;