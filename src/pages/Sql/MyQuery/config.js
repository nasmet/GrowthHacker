import RecentlySavedQuery from './components/RecentlySavedQuery';
import RecentlyRunQuery from './components/RecentlyRunQuery';

export const tabs = [{
	key: 'recentlysavedquery',
	tab: '最近保存的查询',
	component: RecentlySavedQuery,
}, {
	key: 'recentlyrunquery',
	tab: '最近运行的查询',
	component: RecentlyRunQuery,
}];