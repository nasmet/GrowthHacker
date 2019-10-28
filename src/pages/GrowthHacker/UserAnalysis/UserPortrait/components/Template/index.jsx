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
}, ref) {
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});

	useImperativeHandle(ref, () => ({
		update: (e) => {
			fetchData(e);
		},
	}));

	function assemblingChartStyle(meta) {
		return {
			x: 'name',
			y: 'count',
			color: 'value',
			gLabel: (val, item) => {
				return item.point.value;
			}
		};
	}

	function assemblingChartData(arg, meta, index = 1) {
		const arr = [];
		const name = meta[index];
		arg.forEach((item) => {
			arr.push({
				name,
				value: item[0],
				count: item[index],
			});
		});
		return arr;
	}

	function fetchData(date) {
		setLoading(true);
		request({
			type,
			date,
		}).then((res) => {
			const {
				meta,
				data,
			} = res;
			if (data.length === 0) {
				return;
			}
			setTitles(meta);
			setTableData(data);
			setChartStyle(assemblingChartStyle(meta));
			setChartData(assemblingChartData(data, meta));
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		fetchData(date);

		return () => {
			api.cancelRequest();
		};
	}, []);

	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const onSelectChange = (e) => {
		setChartData(assemblingChartData(tableData, titles, e));
	};

	return (
		<Components.Wrap>
			<Select 
				style={{width: '200px'}}
				defaultValue={1}
				onChange={onSelectChange}
			>
				<Select.Option value={1}>新用户数</Select.Option>
				<Select.Option value={2}>访问人数</Select.Option>
			</Select>
			<Loading visible={loading} inline={false}>
				<Components.BasicSector data={chartData} {...chartStyle} forceFit />

				<Table 
					dataSource={tableData} 
					hasBorder={false}
				>
				 	{renderTitle()}	
				</Table>
			</Loading>
		</Components.Wrap>

	);
}

export default forwardRef(Template);