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

const {
	Row,
	Col,
} = Grid;

const {
	Option,
} = Select;

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
	        <Row wrap gutter="20">
	          	<Col l="6">
		            <div>
		              	<span>域名：</span>
		              	<IceFormBinder triggerType="onBlur" name="domain">
			                <Select style={{ width: '200px' }}>
			                  	<Option value={0}>www.ss.com</Option>
			                  	<Option value={1}>www.dd.com</Option>
			                </Select>
		              	</IceFormBinder>
		            </div>
	          	</Col>
	        </Row>
     	</IceFormBinderWrapper>
	);
}