import WeiboHot from '../WeiboHot';

const routers = [{
  key: 'hot',
  tab: '微博热门',
  path: '/find/hot',
  component: WeiboHot,
}, {
  key: 'v',
  tab: '微博大V',
  path: '/find/bigv',
  component: WeiboHot,
}, {
  key: 'spot',
  tab: '微热点',
  path: '/find/spot',
  component: WeiboHot,
}];

export default routers;