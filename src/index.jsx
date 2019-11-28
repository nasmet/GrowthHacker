// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import React from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';
import '@alifd/next/reset.scss';
import router from './router';
import utils from './common/utils/index';
import api from './common/api/index';
import model from './common/model/index';
import * as config from './common/config';
import Components from './common/components/index';
import hooks from './common/hooks/index';
import lib from './common/lib/index';
import cookies from './common/cookies/index';

moment.locale('zh-cn');
window.utils = utils;
window.api = api;
window.model = model;
window.config = config;
window.Components = Components;
window.hooks = hooks;
window.lib = lib;
window.cookies = cookies;

ReactDOM.render(router, document.getElementById('ice-container'));