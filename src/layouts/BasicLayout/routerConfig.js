import Find from '../../pages/System/Find';
import Monitor from '../../pages/System/Monitor';
import Analysis from '../../pages/System/Analysis';
import List from '../../pages/WeiboOperation/List';
import Status from '../../pages/WeiboOperation/Status';
import Interactive from '../../pages/WeiboOperation/Interactive';

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
}];

export default routerConfig;