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
import AnalysisContent from './components/AnalysisContent';

const {
	Item,
} = Tab;

const creatAnalysisConfig = (keys) => {
	return keys.map((item) => {
		const {
			id,
			name,
		} = item;
		return {
			key: id,
			tab: name,
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
		api.getMonitor().then((res) => {
			if (cancelTask) {
				return;
			}

			const {
				tab,
			} = res;
			setAnalysisConfig(creatAnalysisConfig(tab));
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
		return analysisConfig.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.margin}>
            			<AnalysisContent />
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