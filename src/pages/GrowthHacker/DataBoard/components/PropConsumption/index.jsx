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
import * as propConfig from './propConfig';

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
	const [extraTitles, setExtraTitles] = useState([]);
	const [titles, setTitles] = useState(propConfig.titles);
	const [selectedTitle,setSelectedTitle] = useState([]);

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

	const addTitle = () => {
		return extraTitles.map((item) => {
			return <Column key={item} title={propConfig.titleMap[item]} dataIndex={item} sortable />;
		});
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
		setExtraTitles(e);
		setSelectedTitle(e);
	};

	const renderAddTitle = () => {
		return (
			<div>
				<span>增加标签</span>
				<Balloon 
					type="primary" 
					autoFocus 
					trigger={renderIcon()} 
					closable={false} 
					triggerType="click"
				>
				 	<Checkbox.Group itemDirection="ver" dataSource={titles} value={selectedTitle} onChange={onTitleChange} />
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
	          	<Table loading={loading} dataSource={data} hasBorder={false} onSort={onSort} sort={sort} >
	            	<Column title="游戏关卡" dataIndex="game_level_var" sortable />
	            	<Column title="道具名字" dataIndex="props_name_var" />
	            	<Column title="增加_次" dataIndex="props_add_count" sortable />
	            	<Column title="消耗_次" dataIndex="props_reduce_count" sortable />
	            	{addTitle()}
	            	<Column title={renderAddTitle()} />
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