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
	Select,
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

function PropConsumption({
	history,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [filter, setfilter] = useState({
		domain: 0,
	});
	const [titles, setTitles] = useState([]);

	let cancelTask = false; // 防止内存泄露
	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.getProp({
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
		resetPage()
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	function resetPage() {
		if (curPage === 1) {
			setCurPage(0);
		}
		setTimeout(() => {
			setCurPage(1);
		});
	}

	const filterChange = () => {
		setSort({});
		resetPage();
	};

	const onAddTitle = () => {
		setTitles((pre) => {
			pre.push(pre.length);
			return [...pre];
		})
	};

	const addTitle = () => {
		return titles.map((item) => {
			return <Column key={item} title="最后时间" dataIndex="time" sortable />;
		});
	};

	return (
		<div>
			<IceContainer>
				<Filter values={filter} filterChange={filterChange} />
			</IceContainer>

 			<Balloon type="primary" autoFocus trigger={<span>增加标签</span>} closable={false} triggerType="click">
            	<Select dataSource={['apple', 'banana', 'orange']} followTrigger />
        	</Balloon>

			<IceContainer>
	          	<Table loading={loading} dataSource={data} hasBorder={false} onSort={onSort} sort={sort} >
	            	<Column title="游戏关卡" dataIndex="game_level_var" sortable />
	            	<Column title="道具名字" dataIndex="props_name_var" />
	            	<Column title="增加_次" dataIndex="props_add_count" sortable />
	            	<Column title="消耗_次" dataIndex="props_reduce_count" sortable />
	            	{addTitle()}
	            	<Column title={<div><span>增加标签</span><Icon size='small' style={{marginLeft:'4px'}} type="add" onClick={onAddTitle} /></div>} />
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

export default withRouter(PropConsumption);