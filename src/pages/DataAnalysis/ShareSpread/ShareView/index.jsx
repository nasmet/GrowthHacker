import React, {
	useState,
	useRef,
} from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Top from './components/Top';
import Header from '../Header';

export default function ShareView() {
	const date = 'day:0';
	const headRef = useRef(null);
	const shareRef = useRef(null);
	const newRef = useRef(null);
	const openRef = useRef(null);

	const dateChange = (e) => {
		headRef.current.update(e);
		shareRef.current.update(e);
		newRef.current.update(e);
		openRef.current.update(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享概览' />
			<Components.DateFilter filterChange={dateChange} />
			<IceContainer>
				<Header date={date} ref={headRef} />
			</IceContainer>
			<IceContainer style={{padding:'10px'}}>
				<span className={styles.secondTitle}>关键用户分享</span>
			</IceContainer>
			<Top name='Top10 重度用户' title='分享次数' request={api.getTop10Share} date={date} ref={shareRef} />
			<Top name='Top10 影响力用户' title='回流量' request={api.getTop10Open} date={date} ref={openRef} />
			<Top name='Top10 贡献用户' title='分享新增' request={api.getTop10New} date={date} ref={newRef} />
		</Components.Wrap>
	);
}