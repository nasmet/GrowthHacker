import React, {
	Component,
} from 'react';
import {
	Grid,
	Select,
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import * as filterConfig from './filterConfig';
import styles from './index.module.scss';

const {
	Row,
	Col,
} = Grid;

export default function Filter({
	values,
	filterChange,
}) {
	const formChange = () => {
		filterChange();
	};

	return (
		<IceFormBinderWrapper
        	value={values}
        	onChange={formChange}
      	>	
      		<div role="grid">
	        <Row wrap justify='start' gutter="20">
	          	<Col>
		            <div className={styles.contain}>
		              	<span className={styles.name}>选择事件：</span>
		              	<IceFormBinder triggerType="onBlur" name="event">
							<Select  
								className={styles.select}
								mode="multiple"
								dataSource={filterConfig.events}  
								showSearch
							/>
		              	</IceFormBinder>
		            </div>
	          	</Col>
	          	<Col>
		            <div className={styles.contain}>
		              	<span className={styles.name}>按以下维度拆分：</span>
		              	<IceFormBinder triggerType="onBlur" name="dimension">
							<Select 
								className={styles.select}
								mode="multiple"
								dataSource={filterConfig.dimensions} 
								showSearch
							/>
		              	</IceFormBinder>
		            </div>
	          	</Col>
	          	<Col>
		            <div className={styles.contain}>
		              	<span className={styles.name}>目标用户：</span>
		              	<IceFormBinder triggerType="onBlur" name="user">
							<Select 
								className={styles.select}
								mode="multiple"
								dataSource={filterConfig.users} 
								showSearch
							/>
		              	</IceFormBinder>
		            </div>
	          	</Col>
	        </Row>
	        </div>
     	</IceFormBinderWrapper>
	);
}