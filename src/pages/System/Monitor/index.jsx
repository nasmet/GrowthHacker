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
import MonitorContent from './components/MonitorContent';

const {
	Item,
} = Tab;

const creatMonitorConfig = (keys) => {
	return keys.map((item, index) => {
		return {
			key: `${index}`,
			tab: item,
			component: MonitorContent,
		}
	});
}

export default function Monitor() {
	const [monitorConfig, setMonitorConfig] = useState([]);
	const [loading, setLoading] = useState(false);

	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			if (cancelTask) {
				return;
			}
			setMonitorConfig(creatMonitorConfig(['长安十二时辰', '陈情令', '复仇者联盟']));
			setLoading(false);
		}, 500);
		return () => {
			cancelTask = true;
		}
	}, []);

	const rendTab = () => {
		return monitorConfig.map((item) => {
			const Content = item.component;
			return (
				<Item
          key={item.key}
          title={item.tab}
        >
          <div className={styles.margin}>
            <MonitorContent />
          </div>
        </Item>
			);
		});
	};

	return (
		<div>
		 	<Loading visible={loading} inline={false}>
	      <Tab defaultActiveKey="0">
	        {rendTab()}
	      </Tab>
      </Loading>
    </div>
	);
}