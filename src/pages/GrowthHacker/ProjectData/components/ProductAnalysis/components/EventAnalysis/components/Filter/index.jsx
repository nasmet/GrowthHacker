import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Grid,
	Select,
	Loading,
	Message,
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	Row,
	Col,
} = Grid;

export default function Filter({
	filterChange,
}) {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);

	let cancelTask = false; // 防止内存泄漏
	useEffect(() => {
		setLoading(true);
		api.getDataCenter().then((res) => {
			if (cancelTask) {
				return;
			}
			dividingData(res.event_entities);
			setLoading(false);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}, []);

	function dividingData(data) {
		const dimensions = [];
		const metrics = [];
		data.forEach((item) => {
			const obj = {
				label: item.name,
				value: item.entity_key,
			};
			if (item.type === 'event') {
				metrics.push(obj);
			} else {
				dimensions.push(obj);
			}
		});
		setMetricData(metrics);
		setDimensionData(dimensions);
	}

	const formChange = (values) => {
		filterChange(values);
	};

	return (
		<Loading visible={loading} inline={false}>
			<IceFormBinderWrapper
	        	value={values}
	        	onChange={formChange}
	      	>	
	      		<div role="grid">
			        <Row wrap justify='start' gutter="20">
			          	<Col>
				            <div className={styles.contain}>
				              	<span className={styles.name}>选择事件：</span>
				              	<IceFormBinder triggerType="onBlur" name="event">
									<Select  
										className={styles.select}
										mode="multiple"
										dataSource={metricData}  
										showSearch
									/>
				              	</IceFormBinder>
				            </div>
			          	</Col>
			          	<Col>
				            <div className={styles.contain}>
				              	<span className={styles.name}>按以下维度拆分：</span>
				              	<IceFormBinder triggerType="onBlur" name="dimension">
									<Select 
										className={styles.select}
										mode="multiple"
										dataSource={dimensionData} 
										showSearch
									/>
				              	</IceFormBinder>
				            </div>
			          	</Col>
			        </Row>
		        </div>
	     	</IceFormBinderWrapper>
     	</Loading>
	);
}