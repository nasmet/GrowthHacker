import React, {
	useState,
	useRef,
} from 'react';
import {
	Animate,
} from '@alifd/next';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import './index.scss';

export default function BasicLayout({
	children,
}) {
	const [collapse, setCollapse] = useState(true);
	const refVarible=useRef({
		width: null,
	});

	const onChange = (e) => {
		setCollapse(e);
	};

    const beforeEnter=(node)=> {
        refVarible.current.width = node.offsetWidth;
        node.style.width = '0px';
    }

    const onEnter=(node)=> {
        node.style.width = `${refVarible.current.width}px`;
    }

    const afterEnter=(node)=> {
        refVarible.current.width = null;
        node.style.width = null;
    }

    const beforeLeave=(node)=> {
        node.style.width = `${refVarible.current.width}px`;
    }

    const onLeave=(node)=> {
        node.style.width = '0px';
    }

    const afterLeave=(node)=> {
        node.style.width = null;
    }

	return (
		<Layout className="ice-design-layout" fixable>
	      	<Layout.Aside type='primary'>
	      		<Animate 
	      			animation="expand"
                    beforeEnter={beforeEnter}
                    onEnter={onEnter}
                    afterEnter={afterEnter}
                    beforeLeave={beforeLeave}
                    onLeave={onLeave}
                    afterLeave={afterLeave}
				>
	      			{collapse?
	      				<div className="notice">
	        				<Aside />
	        			</div>:null	        			
	        		}
	        	</Animate>
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