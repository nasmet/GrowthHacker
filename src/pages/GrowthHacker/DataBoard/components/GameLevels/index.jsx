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
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';
import * as gameLevelsConfig from './gameLevelsConfig';

const {
	Column,
} = Table;
const limit = 10;
const {
	categorys,
} = gameLevelsConfig;

function GameLevels() {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [filter, setfilter] = useState({
		category: 0,
		domain: 0,
	});
	const [category, setCategory] = useState(categorys[filter.category]);

	let cancelTask = false; // 防止内存泄露
	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.getGameLevels({
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
		const value = categorys[filter.category];
		setSort({});
		setCategory(value);
		resetPage();
	};

	const renderCategory = () => {
		return category.map((item, index) => {
			const {
				title,
				dataIndex,
				sortable,
			} = item;
			return <Column key={index} title={title} dataIndex={dataIndex} sortable={sortable} />
		})
	};

	return (
		<div>
			<IceContainer>
				<Filter values={filter} filterChange={filterChange} />
			</IceContainer>
			<IceContainer id="wrap">
	         	<Table 
		            loading={loading} 
		            dataSource={data} 
		            hasBorder={false} 
		            onSort={onSort} 
		            sort={sort}
	          	>
	          		{
	          			renderCategory()	
	          		}
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

export default withRouter(GameLevels);