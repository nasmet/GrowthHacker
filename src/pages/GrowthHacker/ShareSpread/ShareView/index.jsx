import React, {
	useState,
	useRef,
} from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Top from './components/Top';
import ShareDistribute from './components/ShareDistribute';
import AreaDistribute from './components/AreaDistribute';
import Header from '../Header';

export default function ShareView() {
	const date = 'day:0';
	const headRef = useRef(null);
	const shareRef = useRef(null);
	const newRef = useRef(null);
	const openRef = useRef(null);
	const distributeRef = useRef(null);

	const filterChange = (e) => {
		headRef.current.update(e);
		shareRef.current.update(e);
		newRef.current.update(e);
		openRef.current.update(e);
		distributeRef.current.update(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享概览' />
			<Components.DateFilter filterChange={filterChange} />
			<IceContainer>
				<Header date={date} ref={headRef} />
			</IceContainer>
			<IceContainer style={{padding:'10px'}}>
				<span className={styles.secondTitle}>关键用户分享</span>
			</IceContainer>
			<div className={styles.userShare}>
				<Top name='Top10 重度用户' title='分享次数' request={api.getTop10Share} date={date} ref={shareRef} />
				<Top name='Top10 影响力用户' title='回流量' request={api.getTop10Open} date={date} ref={openRef} />
				<Top name='Top10 贡献用户' title='分享新增' request={api.getTop10New} date={date} ref={newRef} />
			</div>
			<IceContainer style={{padding:'10px'}}>
				<span className={styles.secondTitle}>分享人群分布</span>
			</IceContainer>
			<div className={styles.userShare}>
				<ShareDistribute name='分享对象分布'	request={api.getShareDistribute} date={date} ref={distributeRef} />
			</div>
    	</Components.Wrap>
	);
}