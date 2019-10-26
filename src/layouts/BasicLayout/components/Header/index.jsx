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

const word = (name) => {
	return (
		<span className="ice-menu-item-text">
      		{name}
    	</span>
	);
};

const traversing = function fn(nav) {
	if (nav.sub && utils.isArray(nav.sub)) {
		return (
			<Nav.SubNav key={nav.path} selectable style={{color: nav.color}} label={word(nav.name)}>
        		{nav.sub.map(fn)}
      		</Nav.SubNav>
		);
	}

	return (
		<Nav.Item key={nav.path}>
      		<Link to={nav.path} onClick={nav.onClick} className="ice-menu-link">
        		{word(nav.name)}
      		</Link>
   		</Nav.Item>
	);
};

function Header({
	history,
}) {
	return (
		<div className="header-container">
    		<Nav
      			direction="hoz"
      			triggerType="hover"
      			type='primary'
    		>
      			{
        			headerMenuConfig.map(traversing)
     		 	}
    		</Nav>
    	</div>
	);
}

export default withRouter(Header);