import React from 'react';
import {
	Nav,
} from '@alifd/next';
import {
	Link,
} from 'react-router-dom';

export default function fn(nav) {
	if (nav.sub && utils.isArray(nav.sub)) {
		return (
			<Nav.SubNav key={nav.path} label={word(nav.name)}>
        		{nav.sub.map(fn)}
      		</Nav.SubNav>
		);
	}
	return (
		<Nav.Item key={nav.path}>
      		<Link to={nav.path} className="ice-menu-link">
        		{word(nav.name)}
      		</Link>
   		</Nav.Item>
	);
};

function word(name) {
	return (
		<span className="ice-menu-item-text">
      		{name}
    	</span>
	);
};