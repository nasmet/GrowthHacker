import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Tab,
	Table,
	Message,
	Loading
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import * as templateConfig from './templateConfig';

const {
	Column
} = Table;
const {
	Item
} = Tab;

export default function Template({
	boardInfo,
	tableData,
	renderTitle,
	chartStyle,
	chartData,
	loading,
}) {
	const {
		id,
		name,
		desc
	} = boardInfo;
	const info = [{
		id: 0,
		name: '看板名称',
		value: name
	}, {
		id: 1,
		name: '看板描述',
		value: desc
	}];

	const renderTable = () => {
		return (
			<Table 
				dataSource={tableData} 
				hasBorder={false} 
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
				return <Components.BasicPolyline data={chartData} forceFit {...chartStyle} />
			case '2':
				return <Components.BasicColumn data={chartData} forceFit {...chartStyle} />
			case '3':
				return <Components.BasicColumn data={chartData} forceFit transpose {...chartStyle} />
			default:
				return null;
		};

	};

	const renderTab = () => {
		return templateConfig.chartTypes.map((item) => {
			const {
				name,
				key
			} = item;
			return (
				<Item 
					key={key}
          			title={name}
        		>
	        		<Loading visible={loading} inline={false}>
	        			<IceContainer className={styles.chartWrap}>
							{rendTabComponent(key)}
						</IceContainer>  
					</Loading>
        		</Item>
			);
		});
	};

	return (
		<div>
			<Components.Introduction info={info} />
			<Tab defaultActiveKey="0">
	      		{renderTab()}
	      	</Tab>
		</div>
	);
}