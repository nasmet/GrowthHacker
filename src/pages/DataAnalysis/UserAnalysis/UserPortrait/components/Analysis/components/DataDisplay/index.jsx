import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Table,
	Loading,
	Select,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function Template({
	type,
	request,
	date,
	name,
}, ref) {
	useImperativeHandle(ref, () => ({
		update: date => {
			updateParameter({ ...parameter,
				date
			});
		},
	}));

	const chartStyle = {
		x: 'name',
		y: 'count',
		color: 'value',
		gLabel: (val, item) => {
			return item.point.value;
		},
		forceFit: true,
	};

	function assembleChartData() {
		const temp = [];
		const name = meta[index];
		data.forEach((item) => {
			temp.push({
				name,
				value: item[0],
				count: item[index],
			});
		});
		return temp;
	}

	const [index, setIndex] = useState(1);

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(request, {
		type,
		date,
	});
	const {
		total = 0,
			meta = [],
			data = [],
	} = response;

	const renderTitle = () => {
		return meta.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const onSelectChange = (e) => {
		setIndex(e);
	};
	
	const onRefresh=()=>{
		updateParameter(parameter);
	};

	return (
		<Components.Wrap>
			<Select 
				style={{width: '200px'}}
				defaultValue={index}
				onChange={onSelectChange}
			>
				<Select.Option value={1}>新用户数</Select.Option>
				<Select.Option value={2}>访问人数</Select.Option>
			</Select>
			<Loading visible={loading} inline={false}>
				<Components.BasicSector data={assembleChartData()} {...chartStyle} />
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName={name} data={data} meta={meta} type={4} />}
				</div>
				<Table 
					dataSource={data} 
					hasBorder={false}
				>
				 	{renderTitle()}	
				</Table>
			</Loading>
		</Components.Wrap>

	);
}

export default forwardRef(Template);