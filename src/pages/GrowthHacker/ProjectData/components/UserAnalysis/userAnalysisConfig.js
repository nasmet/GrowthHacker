import UserGroup from './components/UserGroup';
import ActiveUser from './components/ActiveUser';
import UserScrutiny from './components/UserScrutiny';
import UserPortrait from './components/UserPortrait';

export default [{
	key: 'ug',
	tab: '用户分群',
	Component: UserGroup,
}, {
	key: 'au',
	tab: '活跃用户分析',
	Component: ActiveUser,
}, {
	key: 'us',
	tab: '用户细查',
	Component: UserScrutiny,
}, {
	key: 'up',
	tab: '用户画像',
	Component: UserPortrait,
}];