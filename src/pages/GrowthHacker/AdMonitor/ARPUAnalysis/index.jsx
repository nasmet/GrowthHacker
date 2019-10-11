import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	tabs,
} from './arpuConfig';

export default function ARPUAnalysis() {
	const renderTab = () => {
		return tabs.map((item) => {
			const Content = item.component;
			return (
				<Tab.Item key={item.key} title={item.tab} >
            		<Content />
        		</Tab.Item>
			);
		});
	};

	return (
		<Components.Wrap>
			<Components.Title title='ARPU分析' />
			<Tab defaultActiveKey="arpu">
	    		{renderTab()}
	  		</Tab>
    	</Components.Wrap>
	);
}