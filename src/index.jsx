// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import ReactDOM from 'react-dom';
import '@alifd/next/reset.scss';
import router from './router';
import utils from './common/utils/index';
import * as api from './common/api/index';
import model from './common/model/index';
import * as config from './common/config';
import Components from './common/components/index';
import hooks from './common/hooks/index';

const ICE_CONTAINER = document.getElementById('ice-container');
if (!ICE_CONTAINER) {
	throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

window.utils = utils;
window.api = api;
window.model = model;
window.config = config;
window.Components = Components;
window.hooks = hooks;

ReactDOM.render(router, ICE_CONTAINER);