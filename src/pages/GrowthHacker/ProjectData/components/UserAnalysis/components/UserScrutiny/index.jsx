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
	Balloon,
	Checkbox,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';
import {
	defaultTitles,
	selectTitles,
	selectTitlesMap,
} from './userScrutinyConfig';

const {
	Column,
} = Table;

export default function UserScrutiny({
	projectId,
}) {
	const [titles, setTitles] = useState([...defaultTitles]);
	const [tableData, setTableData] = useState([{
		userid: 0,
		time: new Date().toString(),
		location: '深圳',
		count: 10,
		openid: 0,
		country: 1,
		city: 2,
		province: 3,
		gender: 4,
		unionid: 5,
	}]);
	const [selectValues, setSelectValues] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);

	const filterChange = (e) => {
		console.log(e);
	};

	const renderTitle = () => {
		return titles.map((item, index) => {
			const {
				key,
				name,
			} = item;
			return (
				<Column 
					lock={index===0?true:false} 
					key={key} 
					title={name} 
					dataIndex={key} 
					width={100} 
				/>
			);
		})
	};

	const lastTitle = () => {
		return (
			<Button className={styles.lastTitle}>
				<Icon className={styles.icon} type='add' size='small'/>
				<span>业务标签</span>
			</Button>
		);
	}

	const onSelectTitleChange = (e) => {
		const increase = [];
		e.forEach((v) => {
			const index = selectTitlesMap[v];
			const {
				label,
				value,
			} = selectTitles[index];

			increase.push({
				key: value,
				name: label,
			});
		});
		setSelectValues(e);
		setTitles((pre) => {
			const clone = [...defaultTitles];
			clone.splice(1, 0, ...increase);
			return [...clone];
		});
	};

	const renderLastTitle = () => {
		return (
			<Balloon 
				trigger={lastTitle()} 
				closable={false}
				align='bl'
				triggerType='click'
				needAdjust
			>	
				<Checkbox.Group 
					itemDirection="ver" 
					dataSource={selectTitles}
					onChange={onSelectTitleChange}
					value={selectValues} 
				/>
			</Balloon>
		);
	}

	const pageChange = (e) => {
		setCurPage(e);
	};

	return (
		<div>
      		<IceContainer>
      			<Filter filterChange={filterChange} />
      		</IceContainer>
			<Table 
				loading={loading} 
				dataSource={tableData} 
				hasBorder={false}
			>
			    {renderTitle()} 
			    <Column 
			    	title={renderLastTitle()} 
			    	lock='right'
			    	width={150} 
			    />  		
			</Table>
		 	<Pagination
            	className={styles.pagination}
           		current={curPage}
            	total={total}
            	onChange={pageChange}
		    />
    	</div>
	);
}