import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Tab,
	Loading,
	Message,
} from '@alifd/next';
import styles from './index.module.scss';
import MonitorContent from './components/MonitorContent';

const {
	Item,
} = Tab;

const creatMonitorConfig = (keys) => {
	return keys.map((item) => {
		const {
			id,
			name,
		} = item;
		return {
			key: id,
			tab: name,
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
		api.getMonitor().then((res) => {
			if (cancelTask) {
				return;
			}

			const {
				tab,
			} = res;
			setMonitorConfig(creatMonitorConfig(tab));
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});

		return () => {
			cancelTask = true;
		};
	}, []);

	const rendTab = () => {
		return monitorConfig.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
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
	      		<Tab defaultActiveKey="1">
	        		{rendTab()}
	      		</Tab>
      		</Loading>
    	</div>
	);
}