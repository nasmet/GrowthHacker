import System from '../../pages/System';
import Find from '../../pages/Find';
import Monitor from '../../pages/Monitor';
import Analysis from '../../pages/Analysis';

const routerConfig = [{
  path: '/system',
  component: System,
}, {
  path: '/find',
  component: Find,
}, {
  path: '/monitor',
  component: Monitor,
}, {
  path: '/analysis',
  component: Analysis,
}];

export default routerConfig;