import React from 'react';
import {
	Nav,
} from '@alifd/next';
import {
	headerMenuConfig,
} from '../../config';

export default function Header() {
	const style={
	  	width: '100%',
	    padding: '0 20px',
	  	display: 'flex',
	  	alignItems: 'center',
	  	justifyContent: 'flex-end',
	};

	return (
		<div style={style}>
    		<Nav
      			direction="hoz"
      			triggerType="hover"
      			type='primary'
    		>
      			{headerMenuConfig.map(model.traverse)}        			
    		</Nav>
    	</div>
	);
}

