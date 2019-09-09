/**
 * 定义应用路由
 */
import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
	Router,
} from 'react-router-dom';
import routerConfig from './routerConfig';
import model from './common/model/index';
import BasicLayout from './layouts/BasicLayout';
import SqlLayout from './layouts/SqlLayout';

const renderRouter = () => {
	return routerConfig.map((item) => {
		const {
			path,
			component,
		} = item;
		return (
			<Route key={path} path={path} component={component} />
		);
	});
};

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
const router = () => {
	return (
		<Router history={model.history}>
      		<Switch>
        		<Route path="/sql" component={SqlLayout} />
        		<Route path="/" component={BasicLayout} />
      		</Switch>
    	</Router>
	);
};

export default router();