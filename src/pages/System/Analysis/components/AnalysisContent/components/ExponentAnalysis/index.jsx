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
import exponentAnalysisConfig from './exponentAnalysisConfig';

const {
	Item,
} = Tab;
const cols = {
	value: {
		formatter: val => {
			return (val * 100).toFixed(0) + "%";
		}
	},
};

export default function ExponentAnalysis() {
	const [loading, setLoading] = useState(false);
	const [trends, setTrends] = useState([]);
	const [ages, setAges] = useState([]);
	const [genders, setGenders] = useState([]);
	const [areas, setAreas] = useState([]);
	let cancelTask = false; // 防止内存泄露

	function fecth() {
		setLoading(true);
		api.getExponentAnalysis().then((res) => {
			if (cancelTask) {
				return;
			}

			const {
				trends,
				ages,
				genders,
				areas,
			} = res;
			setTrends(trends);
			setAges(ages);
			setGenders(genders);
			setAreas(areas);
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
	}

	useEffect(() => {
		fecth();
	}, []);

	const renderExponentTab = () => {
		return exponentAnalysisConfig.map((item) => {
			return (
				<Item key={item.key} title={item.name} >
          			<div className={styles.first}>
            			<Tab shape="capsule" defaultActiveKey="1" >
             				<Item key="1" title="趋势属性">
                				<Components.BasicPolyline data={trends} forceFit />
              				</Item>
            			</Tab>
          			</div>

          			<div className={styles.second}>
            			<Tab shape="capsule" defaultActiveKey="1" onChange={attrTabChange} >
              				<Item key="1" title="人群属性">
                				<div className={styles.content}>
                  					<div className={styles.item1}>
                    					<span className={styles.title}>年龄分布:</span>
                    					<Components.BasicColumn data={ages} cols={cols} />
                  					</div>
                  					<div className={styles.item1}>
                    					<span className={styles.title}>性别分布:</span>
                    					<Components.BasicColumn data={genders} cols={cols} />
                  					</div>
                				</div>
              				</Item>

              				<Item key="2" title="地域属性">
                				<Components.BasicColumn data={areas} cols={cols} forceFit />
              				</Item>
            			</Tab>
         			</div>
        		</Item>
			);
		});
	};

	const exponentTabChange = (e) => {
		fecth();
	};

	const attrTabChange = (e) => {
		console.log(e);
	};

	return (
		<Loading visible={loading}>
			<div className={styles.wrap}>
				<Tab size="small" shape="capsule" defaultActiveKey="1" onChange={exponentTabChange} >
		  			{renderExponentTab()}
		  		</Tab>
			</div>
		</Loading>
	);
}