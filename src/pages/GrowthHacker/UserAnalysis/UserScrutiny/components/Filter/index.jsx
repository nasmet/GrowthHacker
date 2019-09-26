import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Grid,
	Select,
	Loading,
	Message,
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	Row,
	Col,
} = Grid;
const {
	Option,
} = Select;

export default function Filter({
	filterChange,
}) {
	const [values, setValues] = useState({
		date: 0,
	});

	const formChange = (values) => {
		filterChange(values);
	};

	return (
		<IceFormBinderWrapper onChange={formChange} value={values}>	
      		<div role="grid">
		        <Row wrap justify='start' gutter="20">
		          	<Col>
		              	<IceFormBinder triggerType="onBlur" name="date">
							<Select className={styles.select} showSearch>
								<Option value={0}>今日访问用户</Option>
								<Option value={1}>昨日访问用户</Option>
							</Select>
		              	</IceFormBinder>
		          	</Col>
		        </Row>
	        </div>
     	</IceFormBinderWrapper>
	);
}