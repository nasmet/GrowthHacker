import BuriedPoint from './components/BuriedPoint';
import EventVariable from './components/EventVariable';
import OriginData from './components/OriginData';

export default [{
	key: 'bp',
	tab: '埋点事件',
	Component: BuriedPoint,
}, {
	key: 'ev',
	tab: '事件变量',
	Component: EventVariable,
}, {
	key: 'origin',
	tab: '元数据',
	Component: OriginData,
}]