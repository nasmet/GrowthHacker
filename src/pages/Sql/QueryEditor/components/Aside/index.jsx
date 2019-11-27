import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Input,
	Loading,
	Menu,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	SubMenu,
	Item
} = Menu;

export default function Aside({
	menuSelect,
}) {
	const refVariable = useRef({
		total: [],
	});
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		api.getSqlTable({
			with_columns: true,
			with_type: true,
		}).then((res) => {
			const {
				tables,
			} = res;
			setData(tables);
			refVariable.current.total = tables;
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});

		return api.cancelRequest;
	}, []);

	const onInputChange = (e) => {
		if (!e) {
			return;
		}
		const filterData = refVariable.current.total.filter((item) => {
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
        					<Item key={nav.name + ',' + item.name}>
								{item.name} ({item.type})
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
				<Components.Title title='数据表' />   	
      			<Input className={styles.input} hasClear hint='search' placeholder="请输入表名" onChange={utils.debounce(onInputChange, 500)}/>
  			    <Menu openMode="single" selectMode="single" onSelect={onMenuSelect}>
  			    	{renderMenu()}
			    </Menu>
	    	</div>
    	</Loading>
	);
}