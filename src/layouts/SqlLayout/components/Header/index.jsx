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

const {
  Item,
} = Nav;

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
    <div className={styles.container}>
        	<div className={styles.title}>SQL Query</div>

      		<div className={styles.navbar}>
        		<Nav
          			className={styles.menu}
          			direction="hoz"
          			type="line"
          			defaultSelectedKeys={pathname}
        		>
          			{
            			headerMenuConfig.map((nav, index) => {
              				return (
                				<Item key={nav.path}>
                  					<Link to={nav.path}>
						        		<span>{nav.name}</span>
						      		</Link>
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