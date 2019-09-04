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

const {
	Item,
} = Tab;

export default function GraphAnalysis() {
	const [loading, setLoading] = useState(false);
	const [cache, setCache] = useState(['1']);
	const [trends, setTrends] = useState([]);
	const [sources, setSources] = useState([]);
	let cancelTask = false; // 防止内存泄露

	function fetch() {
		setLoading(true);
		api.getMonitorAnalysis().then((res) => {
			if (cancelTask) {
				return;
			}

			const {
				trends,
				sources,
			} = res;
			setTrends(trends);
			setSources(sources);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		fetch();
		
		return () => {
			cancelTask = true;
		};
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
		fetch();
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
				<Components.BasicPolyline data={trends} forceFit />
	     		<div className={styles.graphWrap}>
					<div className={styles.graph}>
						<span className={styles.name}>信息来源图</span>
						<Components.BasicSector data={sources} />
					</div>
					<div className={styles.graph}>
						<span className={styles.name}>媒体来源占比图</span>
						<Components.BasicSector data={sources} />
					</div>
      			</div>
	    	</Loading>
		</div>
	);
}