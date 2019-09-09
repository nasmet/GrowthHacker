import React, {
	Component,
} from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import MainRoutes from './MainRoutes';
import './index.scss';

export default function SqlLayout() {
	return (
		<Layout className="ice-design-layout" fixable >
     		<Layout.Section>
          		<Layout.Header>
                  	<Header />
                </Layout.Header>
       	 		<Layout.Main>
         	 		<div className="main-container">
            			<MainRoutes />
          			</div>
        		</Layout.Main>
      		</Layout.Section>
    	</Layout>
	);
}