// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [{
  name: '帮助文档',
}, {
  name: '通知',
}, {
  name: '用户',
}, {
  name: '语言',
}];

const asideMenuConfig = [{
  name: '热点系统',
  path: '/system',
  icon: 'publish',
  sub: [{
    name: '热点发现',
    path: '/system/find',
  }, {
    name: '热点监控',
    path: '/system/monitor',
  }, {
    name: '热点分析',
    path: '/system/analysis',
  }],
}, {
  name: '微博运营',
  path: '/operation',
  icon: 'publish',
  sub: [{
    name: '微博列表',
    path: '/operation/list',
  }, {
    name: '微博状态',
    path: '/operation/status',
  }, {
    name: '微博互动',
    path: '/operation/Interactive',
  }],
}];

export {
  headerMenuConfig,
  asideMenuConfig,
};