import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	tags,
} from './strategyConfig';

export default function Strategy() {
	const initStrategy = () => {
		return {
			timeStamp: Date.now(),
			disabled: true,
			refForm: null,
			values: {},
			onChange: function(e) {
				this.values = e;
				let disabled = true;
				if (e[tags[0].key] && e[tags[0].key].length !== 0 && Object.keys(e).length === 4) {
					disabled = false
				}
				if (this.disabled === disabled) {
					return;
				}
				this.refForm.store.setFieldProps('btn', {
					disabled,
				});
				this.disabled = disabled;
			},
		}
	}

	const [strategys, setStrategys] = useState([initStrategy()]);

	const renderTags = () => {
		return tags.map(item => {
			const {
				id,
				name,
				style,
			} = item;
			return <span key={id} className={styles.tag} >{name}</span>
		});
	};

	const onAddStrategy = () => {
		setStrategys(pre => {
			return [...pre, initStrategy()];
		});
	};

	const renderBtn = ({
		text = '',
		event = null,
		disabled = false,
	}) => {
		return <Button style={{borderRadius: '20px'}} disabled={disabled} type='primary' onClick={event}>{text}</Button>;
	}

	const renderField = ({
		width = 120,
		dataSource = [{
			label: '1',
			value: '1',
		}],
		mode = 'single',
		name,
		style,
	}) => {
		return (
			<Field name={name} >
				<Select  
					style={{width:`${width}px`, marginRight: '10px'}}
					dataSource={dataSource}
					mode={mode}
					showSearch
				/>
			</Field>
		);
	};

	const onSaveStrategy = (item) => {
		Dialog.confirm({
			content: '是否确认保存该策略？',
			onOk: () => {
				const index = strategys.indexOf(item);
				setStrategys(pre => {
					pre.splice(index, 1);
					return [...pre];
				});
			},
		});
	};

	const renderStrategys = () => {
		return strategys.map(item => {
			return (
				<div key={item.timeStamp} className={styles.item} >
					<Form 
						style={{display:'flex'}} 
						onChange={item.onChange.bind(item)}
						ref={(ref)=>{
							item.refForm = ref;
						}}
					>	
						{renderField({name:tags[0].key,mode:'multiple',width:300})}
						{renderField({name:tags[1].key})}
						{renderField({name:tags[2].key})}
						{renderField({name:tags[3].key})}
						<Field name='btn'>
							{renderBtn({text:'保存策略',event:onSaveStrategy.bind(this,item),disabled:item.disabled})}
						</Field>
					</Form>
				</div>
			);
		});
	};

	return (
		<Components.Wrap>
      		<div className={styles.tagWrap}>
      			{renderTags()}
				{renderBtn({text:'增加策略',event:onAddStrategy})}
      		</div>
      		<IceContainer>
      			{renderStrategys()}
      		</IceContainer>
    	</Components.Wrap>
	);
}