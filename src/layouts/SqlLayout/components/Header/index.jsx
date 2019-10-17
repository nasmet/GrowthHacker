import React from 'react';
import {
	Link,
} from 'react-router-dom';
import {
	Nav,
} from '@alifd/next';
import styles from './index.module.scss';
import {
	headerMenuConfig,
} from '../../menuConfig';

export default function Header() {
	return (
		<div className={styles.wrap}>
			<Nav
	  			direction="hoz"
	  			type='primary'
	  			defaultSelectedKeys={['/sql/queryeditor']}
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
			<div className={styles.right}>
				<Link to='/growthhacker/projectlist'>
					<span style={{color: '#fff'}}>返回项目列表</span>
				</Link>
			</div>
		</div>
	);
}