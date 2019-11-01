import React, {
	useEffect
} from 'react';
import {
	Tab,
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import chartTypes from './chartsDisplayConfig';

export default function ChartsDisplay({
	tableData,
	renderTitle,
	chartStyle,
	chartData,
	loading,
	fixedHeader = false,
	onSort,
	onRefresh,
	showBtn = false,
	type = 1,
	meta = [],
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
				return <Components.BasicPolyline data={chartData} forceFit {...chartStyle} />
			case '2':
				return <Components.BasicColumn data={chartData} forceFit {...chartStyle} />
			case '3':
				return <Components.BasicColumn data={chartData} forceFit transpose {...chartStyle} />
			default:
				return null;
		}
	};

	const renderTab = () => {
		return chartTypes.map((item) => {
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
			{showBtn && <div className={styles.btnWrap}>
				<Components.Refresh onClick={onRefresh} />
				{tableData.length > 0 && <Components.ExportExcel data={tableData} meta={meta} type={type} />}
			</div>}
			<Tab defaultActiveKey="0">
				{renderTab()}      		
			</Tab>
		</div>
	);
}