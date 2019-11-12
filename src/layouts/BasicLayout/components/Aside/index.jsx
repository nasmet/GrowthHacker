import React from 'react';
import {
	Nav,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import {
	asideMenuConfig,
} from '../../menuConfig';
import styles from './index.module.scss';

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
    		{asideMenuConfig.map(model.traverse)}
  		</Nav>
	);
}

export default withRouter(Aside);