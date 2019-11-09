import Event from './components/Event';
import EventVarible from './components/EventVarible';
import OriginData from './components/OriginData';

export const tabs = [{
	key: 'event',
	tab: '埋点事件',
	Component: Event,
}, {
	key: 'varible',
	tab: '事件变量',
	Component: EventVarible,
}, {
	key: 'origin',
	tab: '元数据',
	Component: OriginData,
}]