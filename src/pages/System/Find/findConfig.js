import WeiboHot from './components/WeiboHot';
import WeiboSpot from './components/WeiboSpot';

const routers = [{
	key: 'hot',
	tab: '微博热门',
	component: WeiboHot,
	type: 1,
}, {
	key: 'v',
	tab: '微博大V',
	component: WeiboHot,
	type: 2,
}, {
	key: 'spot',
	tab: '微热点',
	component: WeiboSpot,
	type: 3,
}];

export default routers;