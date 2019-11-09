import UserShare from './components/UserShare';
import CityDistribute from './components/CityDistribute';

export const tabs = [{
	key: 'user',
	tab: '用户分享',
	Component: UserShare,
}, {
	key: 'city',
	tab: '城市分布',
	Component: CityDistribute,
}];