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
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	tabs,
} from './areaAnalysisConfig';
import Filter from '../Filter';

const {
	Item,
} = Tab;

export default function AreaAnalysis() {
	const renderTab = (e) => {
		return tabs.map((item) => {
			const {
				tab,
				key,
				Component,
			} = item;
			return (
				<Item key={key} title={tab}>
					<Component type={key} request={api.getPortraitArea} />
				</Item>
			);
		});
	};

	const filterChange = (e) => {
		console.log(e);
	};

	return (
		<div className={styles.wrap}>
			<Filter filterChange={filterChange} />
		    <IceContainer>
			  	<Tab 
	  				defaultActiveKey='province' 
	  				size="small" 
		  		>
		  			{renderTab()}
			    </Tab>
		    </IceContainer>
	    </div>
	);
}