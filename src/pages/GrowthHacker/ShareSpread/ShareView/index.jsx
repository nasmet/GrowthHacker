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
import Filter from '../Filter';

const {
	Column,
} = Table;

export default function ShareView() {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;

	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState(['0']);
	const [header, setHeader] = useState(createHeader());
	const [shareTableData, setShareTableData] = useState([]);
	const [openTableData, setOpenTableData] = useState([]);
	const [newTableData, setNewTableData] = useState([]);
	const [genderData, setGenderData] = useState([]);
	const [shareData, setShareData] = useState([]);
	const [areaData, setAreaData] = useState([]);
	const chartStyle = {
		x: 'desc',
		y: 'count',
		color: 'desc',
		showTitle: false,
	};

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				let date = '';
				if (values.length === 1) {
					date = `day:${values[0]}`;
				} else {
					date = `abs:${values[0].valueOf()},${values[1].valueOf()}`;
				}
				await api.getShareHeader({
					projectId,
					trend: {
						date,
					}
				}).then((res) => {
					if (cancelTask) {
						return;
					}
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
						pre[3].value = `${(share_reflux_ratio * 100).toFixed(2)}%`;
						pre[4].value = new_count;
						return [...pre];
					});
				});
				await api.getTop10Share({
					projectId,
					trend: {
						date,
					}
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setShareTableData(res.users);
				});
				await api.getTop10Open({
					projectId,
					trend: {
						date,
					}
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setOpenTableData(res.users);
				});
				await api.getTop10New({
					projectId,
					trend: {
						date,
					}
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setNewTableData(res.users);
				});
				await api.getGenderDistribute({
					projectId,
					trend: {
						date,
					}
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setGenderData(res.data);
				});
				await api.getShareDistribute({
					projectId,
					trend: {
						date,
					}
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setShareData(res.data);
				});
				await api.getAreaDistribute({
					projectId,
					trend: {
						date,
					}
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setAreaData(res.data);
				});
			} catch (e) {
				Message.success(e.toString());
			}
			if (cancelTask) {
				return;
			}
			setLoading(false);
		}

		fetchData();

		return () => {
			cancelTask = true;
		};
	}, [values]);

	const filterChange = (e) => {
		setValues(e);
	};

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

	const renderTop30 = () => {
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
		<div className={styles.wrap}>
			<p className={styles.title}>分享概览</p>
			<Filter filterChange={filterChange} />
			<IceContainer>
				<div className={styles.list}>
					{renderTop30()}
				</div>
				<div>
					<p>Top30用户裂变效果图</p>
					<div className={styles.level}>
						<Components.BasicColumn data={[]} />
					</div>
				</div>
			</IceContainer>
			<IceContainer style={{padding:'10px'}}>
				<span className={styles.secondTitle}>关键用户分享</span>
			</IceContainer>
			<div className={styles.userShare}>
				<div className={styles.userShareItem}>
					<p style={{paddingLeft:'20px'}}>Top10重度用户</p>
					<div className={styles.userShareItemChart}>
						<Table loading={loading} dataSource={shareTableData} hasBorder={false}>
							<Column title='Top排名' dataIndex='ranking_num' />
							<Column title='头像' dataIndex='avatar' />
							<Column title='昵称' dataIndex='name' />
							<Column title='分享次数' dataIndex='count' />
						</Table>
					</div>
				</div>
				<div className={styles.userShareItem}>
					<p style={{paddingLeft:'20px'}}>Top10影响用户</p>
					<div className={styles.userShareItemChart}>
						<Table loading={loading} dataSource={openTableData} hasBorder={false}>
							<Column title='Top排名' dataIndex='ranking_num' />
							<Column title='头像' dataIndex='avatar' />
							<Column title='昵称' dataIndex='name' />
							<Column title='回流量' dataIndex='count' />
						</Table>
					</div>
				</div>
				<div className={styles.userShareItem}>
					<p style={{paddingLeft:'20px'}}>Top10贡献用户</p>
					<div className={styles.userShareItemChart}>
						<Table loading={loading} dataSource={newTableData} hasBorder={false}>
							<Column title='Top排名' dataIndex='ranking_num' />
							<Column title='头像' dataIndex='avatar' />
							<Column title='昵称' dataIndex='name' />
							<Column title='分享新增' dataIndex='count' />
						</Table>
					</div>
				</div>
			</div>
			<IceContainer style={{padding:'10px'}}>
				<span className={styles.secondTitle}>分享人群分布</span>
			</IceContainer>
			<div className={styles.userShare}>
				<div className={styles.userShareItem}>
					<p style={{paddingLeft:'20px'}}>性别分布</p>
					<div className={styles.userShareItemChart}>
						<Components.BasicColumn data={genderData} {...chartStyle} />
					</div>
				</div>
				<div className={styles.userShareItem}>
					<p style={{paddingLeft:'20px'}}>分享对象分布</p>
					<div className={styles.userShareItemChart}>
						<Components.BasicColumn data={shareData} {...chartStyle} />
					</div>
				</div>
			</div>
			<IceContainer>
				<span>层级分享</span>
				<div className={styles.level}>
					<Components.BasicColumn data={[]} />
				</div>
			</IceContainer>
			<IceContainer>
				<span>地域分布</span>
				<div className={styles.area}>
					<Components.BasicColumn data={areaData} {...chartStyle} />
				</div>
			</IceContainer>
    	</div>
	);
}