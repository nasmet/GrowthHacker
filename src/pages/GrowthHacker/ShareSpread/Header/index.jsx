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
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Header({
	date,
}) {
	const [loading, setLoading] = useState(false);
	const [header, setHeader] = useState(createHeader());

	useEffect(() => {
		setLoading(true);
		api.getShareHeader({
			date,
		}).then((res) => {
			const {
				new_count,
				share_count,
				share_open_count,
				share_reflux_ratio,
				share_user_count,
			} = res;
			setHeader((pre) => {
				pre[0].value = share_user_count;
				pre[1].value = share_count;
				pre[2].value = share_open_count;
				pre[3].value = utils.transformPercent(share_reflux_ratio);
				pre[4].value = new_count;
				return [...pre];
			});
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}, [date]);

	function createHeader() {
		return [{
			name: '分享人数',
			value: 0,
		}, {
			name: '分享次数',
			value: 0,
		}, {
			name: '回流量',
			value: 0,
		}, {
			name: '分享回流比',
			value: 0,
		}, {
			name: '分享新增',
			value: 0,
		}];
	}

	const renderHeader = () => {
		return header.map((item, index) => {
			return (
				<div className={styles.item} key={index}>
					<span className={styles.value}>{item.value}</span>
					<span>{item.name}</span>
				</div>
			);
		});
	}

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.list}>
				{renderHeader()}
			</div>
		</Loading>
	);
}