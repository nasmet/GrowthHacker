import UserShare from './components/UserShare';
import LevelShare from './components/LevelShare';
import CityDistribute from './components/CityDistribute';

export const tabs = [{
	key: 'user',
	tab: '用户分享',
	component: UserShare,
}, {
	key: 'ls',
	tab: '层级分享',
	component: LevelShare,
}, {
	key: 'city',
	tab: '城市分布',
	component: CityDistribute,
}];