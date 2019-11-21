import React, {
	useRef,
} from 'react';
import {
	Input,
	Button,
	Dialog,
	Icon,
} from '@alifd/next';
import ExportJsonExcel from 'js-export-excel';

export default function ExportExcel({
	data = [],
	meta = [],
	type = 1,
	fileName = '新建表格',
}) {
	const refVarible = useRef({
		name: fileName,
	});
	const sheetName = 'sheet';

	const onExport = () => {
		const option = getHandData();
		const toExcel = new ExportJsonExcel(option);
		toExcel.saveExcel();
	};

	// 事件分析
	const handTableData_1 = () => {
		const sheetHeader = meta.map(item => item.name);
		return [{
			sheetName,
			sheetData: data,
			sheetHeader,
		}];
	}

	// 留存分析
	const handTableData_2 = () => {
		const arr = [0, 1];
		const sheetData = data.map(item => {
			return item.map((v, index) => {
				if (arr.includes(index)) {
					return v;
				}
				return `${v}\n${item[1]===0?'0.00%':utils.transformPercent(v/item[1])}`;
			});
		});
		return [{
			sheetName,
			sheetData,
			sheetHeader: meta,
		}];
	};

	// 漏斗分析
	const handTableData_3 = () => {
		const sheetHeader = meta.map((item, index) => {
			if (index === 0) {
				return item.step_name;
			}
			if (index === meta.length - 1) {
				return '';
			}
			return item.step_num;
		});
		const temp = data.map(item => `${item.unique_count}\n${utils.transformPercent(item.percentage)}`);
		return [{
			sheetName,
			sheetData: [temp],
			sheetHeader,
		}];
	};

	const handTableData_4 = () => {
		return [{
			sheetName,
			sheetData: data,
			sheetHeader: meta,
		}];
	};

	const getHandData = () => {
		const option = {};
		switch (type) {
			case 1:
				option.datas = handTableData_1();
				break;
			case 2:
				option.datas = handTableData_2();
				break;
			case 3:
				option.datas = handTableData_3();
				break;
			case 4:
				option.datas = handTableData_4();
				break;
		}
		option.fileName = refVarible.current.name;
		return option;
	}

	return (
		<div>
			<Button onClick={onExport} ><Icon type='download' /></Button>
		</div>
	);
}