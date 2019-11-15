import React, {
	useRef,
} from 'react';
import {
	Tab,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import DataDisplay from './components/DataDisplay';

export default function AreaAnalysis({
	tabs,
	initValue,
	request,
}) {
	const refTab = useRef(initValue);

	const renderTab = (e) => {
		return tabs.map((item) => {
			const {
				tab,
				key,
			} = item;
			return (
				<Tab.Item key={key} title={tab} >
					<DataDisplay ref={e=>{refTab.current[key] = e}} type={key} request={request} date={refTab.current.date} />
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