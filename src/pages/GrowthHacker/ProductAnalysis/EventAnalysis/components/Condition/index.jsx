import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	Select,
	Loading,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const commonStyle = {
	minWidth: '300px',
};

export default function Condition({
	filterChange,
	initValues={}
}) {
	const refForm = useRef(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getDataCenter().then((res) => {
					assembleEventData(res.event_entities);
				});

				await api.getUserGroups().then((res) => {
					assembleGroupData(res.segmentations);
				});
			} catch (e) {
				model.log(e);
			}
			setLoading(false);
		}

		fetchData();

		return () => {
			api.cancelRequest();
		};
	}, []);

	function assembleEventData(data) {
		const {
			metrics,
			dimensions,
		} = model.assembleEventData(data);
		refForm.current.state.store.setFieldProps('metrics', {
			dataSource: metrics,
		});
		refForm.current.state.store.setFieldProps('dimensions', {
			dataSource: dimensions,
		});
	}

	function assembleGroupData(data) {
		const groups = model.assembleGroupData(data);
		refForm.current.state.store.setFieldProps('segmentation_id', {
			dataSource: groups,
		});
		refForm.current.state.store.setValues(initValues);
	}

	const formChange = (values) => {
		const {
			dimensions,
			metrics,
			segmentation_id,
		} = values;
		let flag = true;
		if (dimensions && dimensions.length > 0 && metrics && metrics.length > 0 && segmentation_id !== undefined) {
			flag = false;
		}
		filterChange(values, flag);
	};

	return (
		<Loading visible={loading} inline={false}>
			<Form 
				onChange={formChange} 
				ref={refForm}
				renderField={({label, component, error}) => (
		            <div className={styles.field}>
		              	<span style={{marginBottom: '4px'}}>{label}</span>
		              	<span>{component}</span>
		            </div>
		        )}
			>	
				<Field label='选择事件' name='metrics'>
					<Select  
						style={commonStyle}
						mode="multiple"
						dataSource={[]}  
						showSearch
					/>
				</Field>
				<Field label='按以下维度拆分' name='dimensions'>
					<Select  
						style={commonStyle}
						mode="multiple"
						dataSource={[]}  
						showSearch
					/>
				</Field>
				<Field label='目标用户' name='segmentation_id'>
					<Select  
						style={commonStyle}
						dataSource={[]} 
						showSearch
					/>
				</Field>
			</Form>
		</Loading>
	);
}