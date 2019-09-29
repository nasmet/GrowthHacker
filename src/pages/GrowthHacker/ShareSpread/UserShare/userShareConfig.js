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