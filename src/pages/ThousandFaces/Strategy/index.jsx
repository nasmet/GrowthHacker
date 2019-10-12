import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Button,
	Message,
	Loading,
	Dialog,
	Select,
} from '@alifd/next';
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
	const [loading, setLoading] = useState(false);

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

	const [strategys, setStrategys] = useState([]);

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
		width = 140,
		dataSource = [{
			label: '1',
			value: '1',
		}],
		mode = 'single',
		name,
		style,
		placeholder = '请选择用户标签',
	}) => {
		return (
			<Field name={name} >
				<Select  
					placeholder={placeholder}
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
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
				}, 500);
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
						style={{display:'flex',flexWrap: 'wrap'}} 
						onChange={item.onChange.bind(item)}
						ref={(ref)=>{
							item.refForm = ref;
						}}
					>	
						{renderField({name:tags[0].key,mode:'multiple',width:300})}
						{renderField({name:tags[1].key,placeholder:'请选择展示策略'})}
						{renderField({name:tags[2].key,placeholder:'请选择数值策略'})}
						{renderField({name:tags[3].key,placeholder:'请选择广告策略'})}
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
      			<Loading visible={loading} inline={false}>
      				{renderStrategys()}
      				{strategys.length===0 && <Components.NotData text='暂未增加策略' />}
      			</Loading>
      		</IceContainer>
    	</Components.Wrap>
	);
}