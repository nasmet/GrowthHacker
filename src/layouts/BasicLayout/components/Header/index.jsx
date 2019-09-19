import React, {
	Component,
} from 'react';
import {
	withRouter,
	Link,
} from 'react-router-dom';
import {
	Nav,
} from '@alifd/next';
import './index.scss';
import {
	headerMenuConfig,
} from '../../menuConfig';

const {
	Item,
} = Nav;

function Header({
	history,
}) {
	const handle = (e) => {
		if(!e){
			return;
		}
		history.push(e);
	};

	return (
		<div className="header-container">
      		<div className="header-navbar">
        		<Nav
          			className="header-navbar-menu"
          			direction="hoz"
          			type="secondary"
        		>
          			{
            			headerMenuConfig.map((nav, index) => {
              				return (
                				<Item key={index} onClick={handle.bind(this,nav.path)}>
						        	<span>{nav.name}</span>
                				</Item>
              				);
            			})
         		 	}
        		</Nav>
      		</div>
    	</div>
	);
}

export default withRouter(Header);