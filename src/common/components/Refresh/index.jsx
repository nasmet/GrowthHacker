import React from 'react';
import {
	Button,
	Icon,
} from '@alifd/next';

export default function Refresh({
	onClick,
	style={}
}) {
	const btnStyle = {
		width: '32px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};
	
	const onRefresh=()=>{
		onClick && onClick();
	};

	return (
		<div style={style}>
			<Button onClick={onRefresh} style={btnStyle} >
				<Icon type='refresh' />
			</Button>
		</div>
	);
}