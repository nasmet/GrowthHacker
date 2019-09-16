/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, {
	Component,
} from 'react';
import {
	Nav,
} from '@alifd/next';
import {
	withRouter,
	Link,
} from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import Logo from '../Logo';
import {
	asideMenuConfig,
} from '../../menuConfig';
import './Aside.scss';

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

const icon = (url) => {
	return (
		url ? <FoundationSymbol size="small" type={url} /> : null
	);
};

const traversing = function fn(nav) {
	if (nav.sub && utils.isArray(nav.sub)) {
		return (
			<SubNav key={nav.path} label={word(nav.name)} icon={icon(nav.icon)}>
        		{nav.sub.map(fn)}
      		</SubNav>
		);
	}
	return (
		<Item key={nav.path}>
      		<Link to={nav.path} className="ice-menu-link">
        		{icon(nav.icon)}
        		{word(nav.name)}
      		</Link>
   		</Item>
	);
};

function Aside({
	location,
}) {
	const {
		pathname,
	} = location;
	const regex = /^\/[a-zA-Z]+/;
	const value = regex.exec(pathname);
	const path = value ? value[0] : '/growthhacker';

	return (
		<div className="aside-custom-menu">
      		<Logo text="云图互娱平台" />
      		<Nav
        		openMode="single"
        		selectedKeys={[pathname]}
        		className="ice-menu-custom"
        		activeDirection="right"
        		defaultOpenKeys={[path]}
      		>
        		{asideMenuConfig.map(traversing)}
      		</Nav>
    	</div>
	);
}

export default withRouter(Aside);