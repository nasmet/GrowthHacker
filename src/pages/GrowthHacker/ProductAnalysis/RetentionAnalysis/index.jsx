import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Message,
	Loading,
	DatePicker,
	Button,
	Dialog,
	Input,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import styles from './index.module.scss';
import Filter from './components/Filter';
import * as retentionAnalysisConfig from './retentionAnalysisConfig';

moment.locale('zh-cn');
const {
	RangePicker,
} = DatePicker;
const {
	Column,
} = Table;
const limit = 10;

export default function RetentionAnalysis() {
	const [showDatePopup, setShowDatePopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [showDialog, setShowDialog] = useState(false);
	const [value, setValue] = useState('');
	const [dialogLoading, setDialogLoading] = useState(false);
	const [values, setValues] = useState({});
	let cancelTask = false; // 防止内存泄漏
	const projectId = sessionStorage.getItem('projectId');

	const filterChange = (e) => {
		setValues(e);
	};

	const onDateChange = () => {

	};

	const onVisibleChange = (e) => {
		setShowDatePopup(e);
	};

	const handleOtherDate = (e) => {
		setShowDatePopup(false);
	};

	const footerRender = () => {
		return (
			<div className={styles.footer}>
				{retentionAnalysisConfig.otherDates.map((item)=>
					<span
						className={styles.item} 
						key={item.id} 
						status="default"
						onClick={handleOtherDate.bind(this,item.id)}
					>
						{item.name}
					</span>
				)}
		    </div>
		);
	};

	const renderTitle = () => {
		return titles.map((item, index) => {
			const {
				id,
				name,
				key,
			} = item;
			return <Column key={id} title={name} dataIndex={index.toString()} />
		})
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onOK = () => {
		setDialogLoading(true);
		api.createBoard({
			id: projectId,
			trend: { ...values,
				name: value,
				type: 'retention'
			}
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			Message.success('成功添加到看板');
			setShowDialog(false);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			setDialogLoading(false);
		});
	};

	const onInputChange = (e) => {
		setValue(e);
	};

	const onSave = () => {
		setShowDialog(true);
	};

	return (
		<div className={styles.wrap}>
			<p className={styles.titleWrap}>
				<span className={styles.title}>新建留存分析</span>
				<Button type='primary' onClick={onSave}>保存</Button>
			</p>
      		<Filter filterChange={filterChange} />
      		{/*
      		<div className={styles.item}>
      			<RangePicker 
      				defaultValue={[moment(),moment()]}
      				onChange={onDateChange}
      				footerRender={footerRender}
      				visible={showDatePopup}
      				onVisibleChange={onVisibleChange}
      			/>
      		</div>
      		<Table loading={loading} dataSource={data} hasBorder={false}>
			    {renderTitle()}       		
			</Table>*/}
			<Dialog autoFocus visible={showDialog} onClose={onClose} footer={false}>
      			<Loading visible={dialogLoading} inline={false}>
					<div style={{margin:'20px'}}>
						<p className={styles.name}>请输入看板名称</p>
						<Input onChange={onInputChange} style={{marginBottom:'20px'}} />
						<div>
							<Button type='primary' onClick={onOK} style={{marginRight:'20px'}}>确定</Button>
							<Button onClick={onClose}>取消</Button>
						</div>
					</div>
				</Loading>	
			</Dialog>	
    	</div>
	);
}