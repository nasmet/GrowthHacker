import WeiboHot from './components/WeiboHot';

const routers = [{
  key: 'hot',
  tab: '微博热门',
  component: WeiboHot,
}, {
  key: 'v',
  tab: '微博大V',
  component: WeiboHot,
}, {
  key: 'spot',
  tab: '微热点',
  component: WeiboHot,
}];

export default routers;