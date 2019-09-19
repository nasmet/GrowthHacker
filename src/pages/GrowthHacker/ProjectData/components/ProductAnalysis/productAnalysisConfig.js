import EventAnalysis from './components/EventAnalysis';
import RetentionAnalysis from './components/RetentionAnalysis';
import FunnelAnalysis from './components/FunnelAnalysis';

export default [{
	key: 'ea',
	tab: '事件分析',
	component: EventAnalysis,
}, {
	key: 'ra',
	tab: '留存分析',
	component: RetentionAnalysis,
}, {
	key: 'fl',
	tab: '漏斗分析',
	component: FunnelAnalysis,
}];