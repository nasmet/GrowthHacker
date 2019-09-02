import GameLevels from './components/GameLevels';
import PropConsumption from './components/PropConsumption';


const routers = [{
	key: 'gl',
	tab: '游戏关卡',
	component: GameLevels,
	type: 1,
}, {
	key: 'pc',
	tab: '道具消耗',
	component: PropConsumption,
	type: 2,
}, ];

export default routers;