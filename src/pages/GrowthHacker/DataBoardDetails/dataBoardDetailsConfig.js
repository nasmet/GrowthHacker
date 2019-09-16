import GameLevels from './components/GameLevels';
import PropConsumption from './components/PropConsumption';
import UserLevel from './components/UserLevel';

export default [{
	key: 'gl',
	tab: '游戏关卡',
	component: GameLevels,
}, {
	key: 'ul',
	tab: '用户等级',
	component: UserLevel,
}, {
	key: 'pc',
	tab: '道具消耗',
	component: PropConsumption,
}, ];