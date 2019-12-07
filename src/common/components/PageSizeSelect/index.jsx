import React from 'react';
import {
	Select,
} from '@alifd/next';
import {data} from './config';

export default function PageSizeSelect({
	filterChange,
	defaultValue=10,
}) {
	const onChange = (e) => {
		filterChange(e);
	};

	return (
		<div style={{marginBottom: '10px'}}>	
			<span style={{marginRight: '4px'}}>每页显示</span>
			<Select  
				defaultValue={defaultValue}
				dataSource={data}
				onChange={onChange}
			/>
		</div>
	);
}