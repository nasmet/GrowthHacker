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
import {
	asideMenuConfig,
} from '../../menuConfig';
import styles from './index.module.scss';

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
	if (nav.auth && !nav.auth()) {
		return;
	}
	if (nav.sub && utils.isArray(nav.sub)) {
		return (
			<Nav.SubNav key={nav.path} label={word(nav.name)} icon={icon(nav.icon)}>
        		{nav.sub.map(fn)}
      		</Nav.SubNav>
		);
	}
	return (
		<Nav.Item key={nav.path}>
      		<Link to={nav.path} className="ice-menu-link">
        		{icon(nav.icon)}
        		{word(nav.name)}
      		</Link>
   		</Nav.Item>
	);
};

function Aside({
	location,
}) {
	const {
		pathname,
	} = location;
	const arr = pathname.split('/');
	const selectedPath = `/${arr[1]}/${arr[2]}`;
	const regex = /^\/[a-zA-Z]+/;
	const value = regex.exec(pathname);
	const path = value ? value[0] : '/growthhacker';
	const header = <span className={styles.fusion}>增长黑客</span>;

	return (
  		<Nav
  			style={{width: '240px'}}
    		openMode="single"
    		selectedKeys={[selectedPath]}
    		activeDirection="right"
    		defaultOpenKeys={[path]}
    		type='primary'
			header={header}
  		>
    		{asideMenuConfig.map(traversing)}
  		</Nav>
	);
}

export default withRouter(Aside);