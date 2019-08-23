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
import AnalysisContent from './components/AnalysisContent';

const {
	Item,
} = Tab;

const creatAnalysisConfig = (keys) => {
	return keys.map((item, index) => {
		return {
			key: index + '',
			tab: item,
			component: AnalysisContent,
		}
	});
}

export default function Monitor() {
	const [analysisConfig, setAnalysisConfig] = useState([]);
	const [loading, setLoading] = useState(false);

	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			if (cancelTask) {
				return;
			}
			setAnalysisConfig(creatAnalysisConfig(['长安十二时辰', '陈情令', '复仇者联盟']));
			setLoading(false);
		}, 500);
		return () => {
			cancelTask = true;
		}
	}, []);

	const rendTab = () => {
		return analysisConfig.map((item) => {
			const Content = item.component;
			return (
				<Item
          key={item.key}
          title={item.tab}
        >
          <div className={styles.margin}>
            <AnalysisContent />
          </div>
        </Item>
			);
		});
	};

	return (
		<div>
		 	<Loading visible={loading} style={{display: 'block'}}>
	      <Tab defaultActiveKey="0">
	        {rendTab()}
	      </Tab>
      </Loading>
    </div>
	);
}