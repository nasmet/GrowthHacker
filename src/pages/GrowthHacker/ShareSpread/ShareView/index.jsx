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
import Top from './components/Top';
import ShareDistribute from './components/ShareDistribute';
import AreaDistribute from './components/AreaDistribute';
import Header from '../Header';

export default function ShareView() {
	const [date, setDate] = useState('day:0');

	const filterChange = (e) => {
		setDate(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享概览' />
			<Components.DateFilter filterChange={filterChange} />
			<IceContainer>
				<Header date={date} />
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
				<Top name='Top10 重度用户' title='分享次数' request={api.getTop10Share} date={date} />
				<Top name='Top10 影响力用户' title='回流量' request={api.getTop10Open} date={date} />
				<Top name='Top10 贡献用户' title='分享新增' request={api.getTop10New} date={date} />
			</div>
			<IceContainer style={{padding:'10px'}}>
				<span className={styles.secondTitle}>分享人群分布</span>
			</IceContainer>
			<div className={styles.userShare}>
				<ShareDistribute name='性别分布' request={api.getGenderDistribute} date={date} />
				<ShareDistribute name='分享对象分布'	request={api.getShareDistribute} date={date} />
			</div>

			<AreaDistribute name='层级分享' request={api.getAreaDistribute} date={date} />
			<AreaDistribute name='地域分布' request={api.getAreaDistribute} date={date} />
    	</Components.Wrap>
	);
}