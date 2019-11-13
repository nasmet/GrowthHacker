import RecentQuery from './components/RecentQuery';
import Query from './components/Query';
import Log from './components/Log';
import Column from './components/Column';
import Result from './components/Result';
import Graph from './components/Graph';

export const tabs = [{
	key: 'recentquery',
	tab: '最近查询',
	component: RecentQuery,
}, {
	key: 'query',
	tab: '查询',
	component: Query,
}, {
	key: 'log',
	tab: '日志',
	component: Log,
}, {
	key: 'column',
	tab: '列',
	component: Column,
}, {
	key: 'result',
	tab: '结果',
	component: Result,
}, {
	key: 'graph',
	tab: '图表',
	component: Graph,
}];