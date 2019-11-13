import React, {
	Component,
} from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';

export default function SqlLayout({
	children,
}) {
	return (
		<Layout className="ice-design-layout" fixable >
		    <Layout.Header type='primary'>
                <Header />
            </Layout.Header>
     		<Layout.Section>
       	 		<Layout.Main>
         	 		<div className="main-container">
            	   		{children}
          			</div>
        		</Layout.Main>
      		</Layout.Section>
    	</Layout>
	);
}