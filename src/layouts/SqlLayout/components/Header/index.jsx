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
} from '../../config';

export default function Header() {
	return (
		<div className={styles.wrap}>
			<Nav
	  			direction="hoz"
	  			type='primary'
	  			defaultSelectedKeys={['/sql/queryeditor']}
	  			header={<span style={{margin:'0 20px'}}>SQL Query</span>}
			>
	  			{headerMenuConfig.map(model.traverse)}
			</Nav>
			<div className={styles.right}>
				<Link style={{textDecoration:'none'}} to='/growthhacker/projectlist'>
					<span style={{color: '#fff'}}>返回项目列表</span>
				</Link>
			</div>
		</div>
	);
}