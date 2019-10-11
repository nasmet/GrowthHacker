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

export default function AreaAnalysis() {
	const [date, setDate] = useState('day:0');

	const renderTab = (e) => {
		return tabs.map((item) => {
			const {
				tab,
				key,
				Component,
			} = item;
			return (
				<Tab.Item key={key} title={tab}>
					<Component type={key} request={api.getPortraitArea} date={date} />
				</Tab.Item>
			);
		});
	};

	const filterChange = (e) => {
		setDate(e);
	};

	return (
		<div className={styles.wrap}>
			<Components.DateFilter filterChange={filterChange} />
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