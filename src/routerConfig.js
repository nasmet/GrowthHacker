// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
// import BasicLayout from './layouts/BasicLayout';
// import SqlLayout from './layouts/SqlLayout';

import Find from './pages/System/Find';
import Monitor from './pages/System/Monitor';
import Analysis from './pages/System/Analysis';
import List from './pages/WeiboOperation/List';
import Status from './pages/WeiboOperation/Status';
import Interactive from './pages/WeiboOperation/Interactive';
import ProductAnalysis from './pages/GrowthHacker/ProductAnalysis';
import UserAnalysis from './pages/GrowthHacker/UserAnalysis';
import CustomerAnalysis from './pages/GrowthHacker/CustomerAnalysis';
import DataCenter from './pages/GrowthHacker/DataCenter';
import DataBoard from './pages/GrowthHacker/DataBoard';
import EventAnalysis from './pages/GrowthHacker/EventAnalysis';

import QueryEditor from './pages/Sql/QueryEditor';
import MyQuery from './pages/Sql/MyQuery';
import SaveQuery from './pages/Sql/SaveQuery';
import HistoryRecord from './pages/Sql/HistoryRecord';

const routerConfig = [{
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
}, {
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
}, {
	path: '/growthhacker/productanalysis',
	component: ProductAnalysis,
	exact: true,
}, {
	path: '/growthhacker/useranalysis',
	component: UserAnalysis,
	exact: true,
}, {
	path: '/growthhacker/customeranalysis',
	component: CustomerAnalysis,
	exact: true,
}, {
	path: '/growthhacker/datacenter',
	component: DataCenter,
	exact: true,
}, {
	path: '/growthhacker/databoard',
	component: DataBoard,
	exact: true,
}, {
	path: '/growthhacker/eventanalysis',
	component: EventAnalysis,
	exact: true,
}, {
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

export default routerConfig;