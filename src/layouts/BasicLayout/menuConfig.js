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
}, {
  name: '热点发现',
  path: '/find',
  icon: 'publish',
}, {
  name: '热点监控',
  path: '/monitor',
  icon: 'publish',
}, {
  name: '热点分析',
  path: '/analysis',
  icon: 'publish',
}];

export {
  headerMenuConfig,
  asideMenuConfig,
};