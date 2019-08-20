import React, {
  Component,
} from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import MainRoutes from './MainRoutes';
import './index.scss';

export default function BasicLayout() {
  return (
    <Layout className="ice-design-layout" fixable >
      <Layout.Aside width={240}>
        <Aside />
      </Layout.Aside>

      <Layout.Section>
        <Layout.Main scrollable>
          <Layout.Header>
            <Header />
          </Layout.Header>
          <div className="main-container">
            <MainRoutes />
          </div>
        </Layout.Main>
      </Layout.Section>
    </Layout>
  );
}