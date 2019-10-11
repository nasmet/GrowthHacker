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
	SubNav,
} = Nav;

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
			<SubNav key={nav.path} selectable label={word(nav.name)}>
        		{nav.sub.map(fn)}
      		</SubNav>
		);
	}
	return (
		<Item key={nav.path}>
      		<Link to={nav.path} className="ice-menu-link">
        		{word(nav.name)}
      		</Link>
   		</Item>
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