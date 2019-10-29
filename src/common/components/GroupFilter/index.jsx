import React, {
	useEffect,
	useRef,
} from 'react';
import {
	Select,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

export default function GroupFilter({
	filterChange,
}) {
	const refForm = useRef(null);

	useEffect(() => {
		function fetchData() {
			api.getUserGroups().then((res) => {
				dividingGroupData(res.segmentations);
			}).catch(e => {
				console.error(e);
			});
		}

		fetchData();

		return () => {
			api.cancelRequest();
		};
	}, []);


	function dividingGroupData(data) {
		const groups = data.map((item) => {
			return {
				label: item.name,
				value: item.id,
			};
		});
		groups.splice(0, 0, {
			label: '全部用户',
			value: 0,
		});
		refForm.current.state.store.setFieldProps('id', {
			dataSource: groups,
		});
		refForm.current.state.store.setFieldValue('id', groups[0].value);
	}

	const onChange = (e) => {
		filterChange(e.id);
	};

	return (
		<div className={styles.wrap}>
			<Form
				ref={refForm}
				onChange={onChange}
				renderField={({label, component}) => (
					<div className={styles.field}>
						<span>{label}</span>
						<span>{component}</span>
					</div>
				)
			} >
				<Field label='目标用户：' name='id'>
					<Select  
						style={{width:'200px'}}
						dataSource={[]} 
						showSearch
					/>
				</Field>
		 	</Form>  
	 	</div>
	);
}