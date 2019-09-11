import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
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
	Balloon,
	Checkbox,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';

const {
	Column,
} = Table;
const limit = 10;

function Template({
	titleConfig,
	request,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [filter, setfilter] = useState({
		domain: 0,
	});
	const [total, setTotal] = useState(titleConfig);
	const [titles, setTitles] = useState(titleConfig);
	const [selectedTitle, setSelectedTitle] = useState(() => {
		const arr = [];
		titleConfig.forEach((item) => {
			if (!item.disabled) {
				arr.push(item.value);
			}
		});
		return arr;
	});

	let cancelTask = false; // 防止内存泄露
	useEffect(() => {
		function fetchData(fn) {
			setLoading(true);
			request({
				limit,
				offset: (curPage - 1) * limit,
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					total,
					list,
				} = res;
				setCount(total);
				setData(list);
			}).catch((e) => {
				Message.success(e.toString());
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		if (curPage > 0) {
			fetchData();
		}

		return () => {
			cancelTask = true;
		};
	}, [curPage]);

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order,
		});
		resetPage();
	};

	function resetPage() {
		if (curPage === 1) {
			setCurPage(0);
		}
		setTimeout(() => {
			setCurPage(1);
		});
	}

	const pageChange = (e) => {
		setCurPage(e);
	};

	const filterChange = () => {
		setSort({});
		resetPage();
	};

	const renderTitle = () => {
		return titles.map((item, index) => {
			const {
				label,
				value,
				sortable,
			} = item;
			return <Column key={value} title={label} dataIndex={value} sortable={sortable} />
		})
	};

	function renderIcon() {
		return (
			<Icon 
				size='small' 
				style={{marginLeft:'4px'}} 
				type="add" 
			/>
		);
	}

	const onTitleChange = (e) => {
		setSelectedTitle(e);
	};

	const onClose = () => {
		const filterData = total.filter((item) => {
			return selectedTitle.includes(item.value) || item.disabled;
		});
		setTitles(filterData);
	};

	const renderCustomTitle = () => {
		return (
			<div>
				<span>业务标签</span>
				<Balloon 
					className={styles.select}
					type="primary" 
					autoFocus 
					trigger={renderIcon()} 
					triggerType="click"
					onClose={onClose}
					needAdjust={true}
					offset={[-100, -100 ]}
				>	
				 	<Checkbox.Group itemDirection="ver" dataSource={total} value={selectedTitle} onChange={onTitleChange} />
				</Balloon>
	    	</div>
		);
	};

	return (
		<div>
			<IceContainer>
				<Filter values={filter} filterChange={filterChange} />
			</IceContainer>
			<IceContainer>
	         	<Table 
		            loading={loading} 
		            dataSource={data} 
		            hasBorder={false} 
		            onSort={onSort} 
		            sort={sort}
	          	>
	          		{
	          			renderTitle()	
	          		}
	          		<Column title={renderCustomTitle()} />
	          	</Table>

	            <Pagination
	            	className={styles.pagination}
	           		current={curPage}
	            	total={count}
	            	onChange={pageChange}
	         	/>
	    	</IceContainer>
    	</div>
	);
}

export default withRouter(Template);