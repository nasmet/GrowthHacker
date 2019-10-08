import React, {
	Component,
	useEffect,
} from 'react';
import {
	withRouter,
} from 'react-router-dom';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import './index.scss';

function BasicLayout({
	children,
	history,
}) {
	useEffect(() => {
		const token = sessionStorage.getItem(config.TOKENKEY);
		if (!token) {
			history.push('/user/login');
		}
	}, []);

	return (
		<Layout className="ice-design-layout" fixable>
	      	<Layout.Aside width={240}>
	        	<Aside />
	     	</Layout.Aside>
	 		<Layout.Section>
	 			<Layout.Header>
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

export default withRouter(BasicLayout);