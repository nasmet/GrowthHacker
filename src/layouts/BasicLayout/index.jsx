import React, {
	Component,
} from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import './index.scss';

export default function BasicLayout({
	children,
}) {
	return (
		<Layout className="ice-design-layout" fixable>
	      	<Layout.Aside width={240} style={{background: '#333333'}}>
	        	<Aside />
	     	</Layout.Aside>
	 		<Layout.Section>
	 			<Layout.Header style={{background: '#333333'}}>
	        		<Header />
	      		</Layout.Header>
	   	 		<Layout.Main scrollable>
	     	 		<div className="main-container">
	        			{children}
	      			</div>
	    		</Layout.Main>
	  		</Layout.Section>
    	</Layout>
	);
}
