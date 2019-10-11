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
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Template({
	type,
	request,
	date,
}) {
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});

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

	useEffect(() => {
		function fetchData() {
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

		fetchData();
	}, [date]);

	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const onSelectChange = (e) => {
		setChartData(assemblingChartData(tableData, titles, e));
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
				<div>
					<Select 
						className={styles.select} 
						defaultValue={1}
						onChange={onSelectChange}
					>
						<Select.Option value={1}>新用户数</Select.Option>
						<Select.Option value={2}>访问人数</Select.Option>
					</Select>
					
					<Components.BasicSector data={chartData} {...chartStyle} forceFit />
				</div>

				<Table 
					dataSource={tableData} 
					hasBorder={false}
				>
				 	{renderTitle()}	
				</Table>
			</div>
		</Loading>
	);
}