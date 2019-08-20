import React, {
  Component,
} from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  Grid,
} from '@alifd/next';
import styles from './index.module.scss';
import NotFound from '../../components/NotFound';

const {
  Row,
  Col,
} = Grid;

export default function UserLayout() {
  return (
    <div className={styles.container}>
      <Row wrap className={styles.row}>
        <Col l="12">
          <div className={styles.form}>
            <Switch>
              <Redirect from="/user" to="/user/login" />

              {/* 未匹配到的路由重定向到 NotFound */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
}