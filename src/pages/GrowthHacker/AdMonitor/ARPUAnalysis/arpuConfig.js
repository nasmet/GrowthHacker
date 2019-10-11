import ARPUData from './components/ARPUData';
import AdCount from './components/AdCount';
import AdRate from './components/AdRate';

export const tabs = [{
	key: 'arpu',
	tab: 'ARPU数据',
	component: ARPUData,
}, {
	key: 'count',
	tab: '每日看广告次数',
	component: AdCount,
}, {
	key: 'rate',
	tab: '广告点击率',
	component: AdRate,
}];