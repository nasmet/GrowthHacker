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
import model from './model/index';

const renderRouter = () => {
  return routerConfig.map((item) => {
    return (
      <Route key={item.path} path={item.path} component={item.component} />
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
        {renderRouter()}
      </Switch>
    </Router>
  );
};

export default router();