import React, {
  Component,
} from 'react';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import {
  Tab,
} from '@alifd/next';
import findConfig from './findConfig';
import NotFound from '../../components/NotFound';
import styles from './index.module.scss';

const {
  Item,
} = Tab;

function Find({
  location,
  history,
}) {
  const {
    pathname,
  } = location;

  const tabChange = (e) => {
    console.log(e);
    history.push(e);
  };

  const rendTab = () => {
    return findConfig.map((item) => {
      return (
        <Item
          key={item.path}
          title={item.tab}
        />
      );
    });
  };

  const renderRoute = () => {
    return findConfig.map((item) => {
      return (
        <Route
          key={item.path}
          path={item.path}
          component={item.component}
        />
      );
    });
  };

  return (
    <div>
      <Tab className={styles.marginBottom10} activeKey={pathname} defaultActiveKey="hot" onChange={tabChange} >
        {rendTab()}
      </Tab>
      <Switch>
        {renderRoute()}
        <Redirect from="/find" to="/find/hot" />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default withRouter(Find);