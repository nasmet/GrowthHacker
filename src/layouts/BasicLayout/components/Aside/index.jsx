import React from 'react';
import {
	Nav,
} from '@alifd/next';
import {
	asideMenuConfig,
} from '../../config';

export default function Aside() {
	const {
		pathname,
	} = location;
	const arr = pathname.split('/');
	const selectedPath = `/${arr[1]}/${arr[2]}`;
	const regex = /^\/[a-zA-Z]+/;
	const value = regex.exec(pathname);
	const path = value ? value[0] : '/dataanalysis';
	const header = <span style={{marginLeft: '40px',fontSize: '20px'}}>增长黑客</span>;

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