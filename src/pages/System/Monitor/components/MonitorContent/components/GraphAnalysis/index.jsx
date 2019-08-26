import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Tab,
	Loading,
} from '@alifd/next';
import styles from './index.module.scss';
import graphAnalysisConfig from './graphAnalysisConfig';
import BasicPolyline from '../../../../../../../components/BasicPolyline';
import BasicSector from '../../../../../../../components/BasicSector';

const {
	Item,
} = Tab;

const data = [{
	name: '一月',
	value: 2000,
}, {
	name: '二月',
	value: 3000,
}, {
	name: '三月',
	value: 2800,
}, {
	name: '四月',
	value: 4000,
}];

const theta = [{
	name: '微博',
	value: 38,
	color: 'blue',
}, {
	name: '抖音',
	value: 52,
	color: 'yellow',
}, {
	name: '快手',
	value: 61,
	color: 'green',
}];

let cache = ['1'];

export default function GraphAnalysis() {
	const [loading, setLoading] = useState(false);
	let cancelTask = false; // 防止内存泄露

	const fetch = () => {
		setLoading(true);
		setTimeout(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		}, 500);
	};

	useEffect(() => {

		fetch();

		return () => {
			cancelTask = true;
			cache = ['1'];
		}
	}, []);

	const renderTab = () => {
		return graphAnalysisConfig.map((item) => {
			return (
				<Item
          key={item.key}
          title={item.name}
        />
			);
		});
	};

	const tabChange = (e) => {
		if (!cache.includes(e)) {
			cache.push(e);
			fetch();
		}
	};

	return (
		<div className={styles.wrap}>
			<Loading visible={loading} style={{display: 'block'}}>
	      <div className={styles.TabWrap}>
	      	<span className={styles.name}>信息走势图</span>
	      	<Tab defaultActiveKey="1" shape="capsule" size="small" onChange={tabChange}>
	      		{renderTab()}
	      	</Tab>
	      </div>	
				<BasicPolyline data={data} forceFit />
	      <div className={styles.graphWrap}>
					<div className={styles.graph}>
						<span className={styles.name}>信息来源图</span>
						<BasicSector data={theta} />
					</div>
					<div className={styles.graph}>
						<span className={styles.name}>媒体来源占比图</span>
						<BasicSector data={theta} />
					</div>
	      </div>
	    </Loading>
		</div>
	);
}