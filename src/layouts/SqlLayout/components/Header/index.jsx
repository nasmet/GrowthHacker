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
import styles from './index.module.scss';
import {
	headerMenuConfig,
} from '../../menuConfig';

function Header({
	location,
}) {
	let {
		pathname,
	} = location;
	if (pathname === '/sql') {
		pathname = '/sql/queryeditor';
	}

	return (
		<Nav
  			className={styles.menu}
  			direction="hoz"
  			type='primary'
  			defaultSelectedKeys={pathname}
  			header={<span style={{margin:'0 20px'}}>SQL Query</span>}
		>
  			{
    			headerMenuConfig.map((nav, index) => {
      				return (
        				<Nav.Item key={nav.path}>
          					<Link to={nav.path}>
				        		<span>{nav.name}</span>
				      		</Link>
        				</Nav.Item>
      				);
    			})
 		 	}
		</Nav>
	);
}

export default withRouter(Header);