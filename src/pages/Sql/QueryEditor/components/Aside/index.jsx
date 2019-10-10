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
	Menu,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	SubMenu,
	Item
} = Menu;

export default function Aside({
	menuSelect,
}) {

	const [total, setTotal] = useState([]);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		setLoading(true);
		api.getSqlTable().then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				tables,
			} = res;
			setData(tables);
			setTotal(tables);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}, []);

	const onInputChange = (e) => {
		if (!e) {
			return;
		}
		const filterData = total.filter((item) => {
			return item['name'].indexOf(e) !== -1;
		});
		setData(filterData);
	};

	const onMenuSelect = (e) => {
		const values = e[0].split(',');
		const sql = `select ${values[1]} from ${values[0]}`;
		menuSelect(sql);
	};

	const renderMenu = () => {
		return data.map((nav) => {
			if (nav.columns && utils.isArray(nav.columns)) {
				return (
					<SubMenu key={nav.name} label={nav.name}>	
        				{nav.columns.map((item, index) =>
        					<Item key={nav.name + ',' + item[0]}>
								{item[0]} ({item[1]})
			   				</Item>
        				)}
      				</SubMenu>
				);
			}
			return (
				<Item key={nav}>
					{nav.name}
				</Item>
			);
		})
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
	      		<div className={styles.title}>辅助</div>
	      		<div className={styles.content}>
	      			<div className={styles.title}>数据表</div>
	      			<Input className={styles.input} hasClear hint='search' placeholder="请输入表名" onChange={utils.debounce(onInputChange, 500)}/>
	  			    <Menu openMode="single" selectMode="single" onSelect={onMenuSelect}>
	  			    	{renderMenu()}
				    </Menu>
	      		</div>
	    	</div>
    	</Loading>
	);
}