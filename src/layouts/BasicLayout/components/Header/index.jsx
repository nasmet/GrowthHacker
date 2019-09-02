import React, {
	Component,
} from 'react';
import {
	Nav,
} from '@alifd/next';
import './index.scss';
import {
	headerMenuConfig,
} from '../../menuConfig';

const {
	Item,
} = Nav;

export default function Header() {
	return (
		<div className="header-container">
      		<div className="header-navbar">
        		<Nav
          			className="header-navbar-menu"
          			direction="hoz"
          			type="secondary"
        		>
          			{
            			headerMenuConfig.map((nav, index) => {
              				return (
                				<Item key={index}>
                  					<span>{nav.name}</span>
                				</Item>
              				);
            			})
         		 	}
        		</Nav>
      		</div>
    	</div>
	);
}