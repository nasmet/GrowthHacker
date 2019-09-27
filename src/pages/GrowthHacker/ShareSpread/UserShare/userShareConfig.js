import UserShare from './components/UserShare';
import LevelShare from './components/LevelShare';
import CityDistribute from './components/CityDistribute';

export const tabs = [{
	key: 'us',
	tab: '用户分享',
	component: UserShare,
}, {
	key: 'ls',
	tab: '层级分享',
	component: LevelShare,
}, {
	key: 'cd',
	tab: '城市分布',
	component: CityDistribute,
}];

export const dateTypes = [{
	key: '0',
	name: '今天',
}, {
	key: '1',
	name: '昨天',
}, {
	key: '2',
	name: '最近7天',
}, {
	key: '3',
	name: '最近30天',
}];