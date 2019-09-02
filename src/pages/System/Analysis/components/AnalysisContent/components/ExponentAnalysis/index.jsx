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

const attrData = [{
	name: '≤19',
	value: 0.50,
}, {
	name: '20-29',
	value: 0.20,
}, {
	name: '30-39',
	value: 0.14,
}, {
	name: '40-49',
	value: 0.10,
}, {
	name: '≥50',
	value: 0.06,
}];

const areaData = [{
	name: '广东省',
	value: 0.50,
}, {
	name: '江苏省',
	value: 0.20,
}, {
	name: '上海市',
	value: 0.14,
}, {
	name: '北京市',
	value: 0.10,
}, {
	name: '其他',
	value: 0.06,
}];

const genderData = [{
	name: '男生',
	value: 0.30,
}, {
	name: '女生',
	value: 0.70,
}];

const cols = {
	value: {
		formatter: val => {
			return (val * 100).toFixed(0) + "%";
		}
	},
};

export default function ExponentAnalysis() {
	const [loading, setLoading] = useState(false);

	let cancelTask = false; // 防止内存泄露
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		}, 500);

		return () => {
			cancelTask = true;
		}
	}, []);

	const renderExponentTab = () => {
		return exponentAnalysisConfig.map((item) => {
			return (
				<Item key={item.key} title={item.name} >
          			<div className={styles.first}>
            			<Tab shape="capsule" defaultActiveKey="1" >
             				<Item key="1" title="趋势属性">
                				<Components.BasicPolyline data={data} forceFit />
              				</Item>
            			</Tab>
          			</div>

          			<div className={styles.second}>
            			<Tab shape="capsule" defaultActiveKey="1" onChange={attrTabChange} >
              				<Item key="1" title="人群属性">
                				<div className={styles.content}>
                  					<div className={styles.item1}>
                    					<span className={styles.title}>年龄分布:</span>
                    					<Components.BasicColumn data={attrData} cols={cols} />
                  					</div>
                  					<div className={styles.item1}>
                    					<span className={styles.title}>性别分布:</span>
                    					<Components.BasicColumn data={genderData} cols={cols} />
                  					</div>
                				</div>
              				</Item>

              				<Item key="2" title="地域属性">
                				<Components.BasicColumn data={areaData} cols={cols} forceFit />
              				</Item>
            			</Tab>
         			</div>
        		</Item>
			);
		});
	};

	const exponentTabChange = (e) => {
		console.log(e);
	};

	const attrTabChange = (e) => {
		console.log(e);
	};

	return (
		<div className={styles.wrap}>
      		<Loading visible={loading} style={{display: 'block'}}>
	  			<Tab size="small" shape="capsule" defaultActiveKey="1" onChange={exponentTabChange} >
	      			{renderExponentTab()}
	      		</Tab>
      		</Loading>
		</div>
	);
}