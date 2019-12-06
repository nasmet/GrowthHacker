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
	all = true,
	mode='single'
}) {
	const refForm = useRef(null);

	useEffect(() => {
		function getUserGroups() {
			api.getUserGroups().then((res) => {
				assembleGroupData(res.segmentations);
			}).catch(e => {
				model.log(e);
			});
		}

		getUserGroups();

		return () => {
			api.cancelRequest();
		};
	}, []);


	function assembleGroupData(data) {
		if (!all && data.length === 0) {
			return;
		}
		const groups = model.assembleGroupData(data, all);
		refForm.current.state.store.setFieldProps('id', {
			dataSource: groups,
		});
		if (!all) {
			const value = [groups[0].value];
			refForm.current.state.store.setFieldValue('id', value);
			filterChange(value);
		}else{
			refForm.current.state.store.setFieldValue('id', groups[0].value);
		}
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
					</div>)
			} >
				<Field label='目标用户：' name='id'>
					<Select  
						style={{minWidth:'200px'}}
						dataSource={[]} 
						showSearch
						mode={mode}
					/>
				</Field>
			</Form>    
		</div>
	);
}