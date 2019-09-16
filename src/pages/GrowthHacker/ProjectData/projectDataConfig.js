import ProductAnalysis from './components/ProductAnalysis';
import UserAnalysis from './components/UserAnalysis';
import CustomerAnalysis from './components/CustomerAnalysis';
import DataCenter from './components/DataCenter';
import DataBoard from './components/DataBoard';

export default [{
	key: 'db',
	tab: '数据看板',
	component: DataBoard,
}, {
	key: 'pa',
	tab: '产品分析',
	component: ProductAnalysis,
}, {
	key: 'ua',
	tab: '用户分析',
	component: UserAnalysis,
}, {
	key: 'ca',
	tab: '获客分析',
	component: CustomerAnalysis,
}, {
	key: 'dc',
	tab: '数据中心',
	component: DataCenter,
}, ];