import SpotAnalysis from './components/SpotAnalysis';
import ExponentAnalysis from './components/ExponentAnalysis';

const routers = [{
	key: 'SA',
	tab: '热点分析',
	component: SpotAnalysis,
}, {
	key: 'EA',
	tab: '指数分析',
	component: ExponentAnalysis,
}];

export default routers;