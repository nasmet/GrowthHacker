import GraphAnalysis from './components/GraphAnalysis';
import EarlyWarning from './components/EarlyWarning';

const routers = [{
	key: 'GA',
	tab: '图表分析',
	component: GraphAnalysis,
}, {
	key: 'EW',
	tab: '预警',
	component: EarlyWarning,
}];

export default routers;