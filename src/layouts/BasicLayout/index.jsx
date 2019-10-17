import React, {
	Component,
	useState,
} from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import './index.scss';

export default function BasicLayout({
	children,
}) {
	const [collapse, setCollapse] = useState(false);

	const onChange = (e) => {
		setCollapse(e);
	};

	return (
		<Layout className="ice-design-layout" fixable>
	      	<Layout.Aside type='primary'>
	      		<div style={{width:'240px',display:`${collapse?'none':'block'}`}}>
	        		<Aside />
	        	</div>
	     	</Layout.Aside>
	 		<Layout.Section>
	 			<Layout.Header type='primary'>
	        		<Header />
					<Components.Switch onChange={onChange} />
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