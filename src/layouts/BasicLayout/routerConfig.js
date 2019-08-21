import Find from '../../pages/Find';
import Monitor from '../../pages/Monitor';
import Analysis from '../../pages/Analysis';

const routerConfig = [{
  path: '/system/find',
  component: Find,
}, {
  path: '/system/monitor',
  component: Monitor,
}, {
  path: '/system/analysis',
  component: Analysis,
}];

export default routerConfig;