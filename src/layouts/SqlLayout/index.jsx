import React, {
  Component,
  useEffect,
} from 'react';
import {
  withRouter,
} from 'react-router-dom';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import './index.scss';

function SqlLayout({
  children,
}) {
  return (
    <Layout className="ice-design-layout" fixable >
     		<Layout.Section>
          		<Layout.Header>
                  	<Header />
                </Layout.Header>
       	 		<Layout.Main>
         	 		<div className="main-container">
            	   		{children}
          			</div>
        		</Layout.Main>
      		</Layout.Section>
    	</Layout>
  );
}

export default withRouter(SqlLayout);