import React, {
	useRef,
} from 'react';
import {
	Tab,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import {
	tabs,
} from './modelAnalysisConfig';

export default function ModelAnalysis() {
	const refTab = useRef({
		curKey: 'phone_brand',
		date: 'day:0',
	});

	const renderTab = (e) => {
		return tabs.map((item) => {
			const {
				tab,
				key,
				Component,
			} = item;
			return (
				<Tab.Item key={key} title={tab}>
					<Component ref={e=>{refTab.current[key] = e}} type={key} request={api.getPortraitModel} date={refTab.current.date} />
				</Tab.Item>
			);
		});
	};

	const filterChange = (e) => {
		refTab.current[refTab.current.curKey].update(e);
	};

	const onChange = e => {
		refTab.current.curKey = e;
	};

	return (
		<Components.Wrap>
			<Components.DateFilter filterChange={filterChange} />
		    <IceContainer>
			  	<Tab 
	  				defaultActiveKey={refTab.current.curKey} 
	  				size="small"
	  				onChange={onChange}  
		  		>
		  			{renderTab()}
			    </Tab>
		    </IceContainer>
     	</Components.Wrap>
	);
}