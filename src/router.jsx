/**
 * 定义应用路由
 */
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import routerConfig from './routerConfig';

const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
};

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
    <BrowserRouter getUserConfirmation={getConfirmation} >
      <Switch>
        {renderRouter()}
      </Switch>
    </BrowserRouter>
  );
};

export default router();