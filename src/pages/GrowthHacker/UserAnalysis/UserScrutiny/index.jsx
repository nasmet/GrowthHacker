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

function UserScrutiny({
	history,
}) {
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [selectValues, setSelectValues] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	let cancelTask = false;
	const projectId = sessionStorage.getItem('projectId');

	function getUserScrutiny() {
		setLoading(true);
		api.getUserScrutiny({
			id: projectId,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				meta,
				data,
			} = res;
			if (data.length === 0) {
				return;
			}
			setTitles(meta);
			setTableData(data);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		getUserScrutiny();

		return () => {
			cancelTask = true;
		};
	}, []);

	const filterChange = (e) => {
		console.log(e);
	};

	const jumpUserDetails = (e) => {
		history.push({
			pathname: '/growthhacker/projectdata/pa/userscrutinydetails',
			state: {
				id: e,
			}
		});
	};

	const renderCell = (value, index, record) => {
		const val = record[0] || '';
		return (
			<span className={styles.user} onClick={jumpUserDetails.bind(this,val)}>{val}</span>
		);
	}

	const renderTitle = () => {
		return titles.map((item, index) => {
			if (index === 0) {
				return <Column key={index} title={item} cell={renderCell} />
			}
			return <Column key={index} title={item} dataIndex={index.toString()} />
		});
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
		<div className={styles.wrap}> 
			{/*
      		<IceContainer>
      			<Filter filterChange={filterChange} />
      		</IceContainer>
      		*/}
			<Table 
				loading={loading} 
				dataSource={tableData} 
				hasBorder={false}
			>
			    {renderTitle()} 
			    {/*
			    <Column 
			    	title={renderLastTitle()} 
			    	lock='right'
			    	width={150} 
			    /> 
				*/} 		
			</Table>
			{/*
		 	<Pagination
            	className={styles.pagination}
           		current={curPage}
            	total={total}
            	onChange={pageChange}
		    />
			*/}
    	</div>
	);
}

export default withRouter(UserScrutiny);