import React from 'react';
import {
	Tab,
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	tabs,
} from './config';

export default function ChartsDisplay({
	tableData,
	renderTitle,
	chartStyle,
	chartData,
	loading,
	onSort,
	fixedHeader = false,
}) {
	const renderTable = () => {
		return (
			<Table 
				dataSource={tableData} 
				hasBorder={false}
				maxBodyHeight={400}
				fixedHeader={fixedHeader}
				onSort={onSort}
			>
				{renderTitle()}			   	   		
			</Table>
		);
	};

	const rendTabComponent = (key) => {
		switch (key) {
			case '0':
				return renderTable();
			case '1':
				return <Components.BasicPolyline data={chartData} forceFit height={500} {...chartStyle} />
			case '2':
				return <Components.BasicColumn data={chartData} forceFit height={500} {...chartStyle} />
			case '3':
				return <Components.BasicColumn data={chartData} forceFit height={500} transpose {...chartStyle} />
			default:
				return null;
		}
	};

	const renderTab = () => {
		return tabs.map((item) => {
			const {
				name,
				key,
			} = item;
			return (
				<Tab.Item 
					key={key}
					title={name}          			
				>        		
					<Loading visible={loading} inline={false}>	        		
						<IceContainer className={styles.chartWrap}>	        			
							{rendTabComponent(key)}
						</IceContainer>  
					</Loading>
				</Tab.Item>
			);
		});
	};

	return (
		<div>
			<Tab defaultActiveKey="0">
				{renderTab()}      		
			</Tab>
		</div>
	);
}