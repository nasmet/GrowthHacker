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

const traversing = function fn(nav) {
	if (nav.sub && utils.isArray(nav.sub)) {
		return (
			<SubMenu key={nav.name} label={nav.name}>
        		{nav.sub.map(fn)}
      		</SubMenu>
		);
	}
	return (
		<Item key={nav.name}>
			{nav.name}
   		</Item>
	);
};

const menuConfig = [{
	name: 'events',
	sub: [{
		name: 'event',
	}, {
		name: 'user_id',
	}],
}];

export default function Aside() {
	const onInputChange = (e) => {
		console.log(e);
	};

	const onMenuSelect = (e) => {
		console.log(e);
	}

	return (
		<div className={styles.wrap}>
      		<div className={styles.title}>辅助</div>
      		<div className={styles.content}>
      			<div className={styles.title}>数据表</div>
      			<Input className={styles.input} hasClear hint='search' placeholder="请输入表名" onChange={utils.debounce(onInputChange, 500)}/>
  			    <Menu openMode="single" selectMode="single" onSelect={onMenuSelect}>
  			    	{menuConfig.map(traversing)}
			    </Menu>
      		</div>
    	</div>
	);
}