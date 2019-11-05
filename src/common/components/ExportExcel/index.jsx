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
	fileName ='新建表格',
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

	const handTableData_1 = () => {
		const sheetHeader = meta.map(item => item.name);
		const sheetData = data;
		return [{
			sheetName,
			sheetData,
			sheetHeader,
		}];
	}

	const handTableData_2 = () => {
		const sheetHeader = meta;
		const sheetData = data;
		return [{
			sheetName,
			sheetData,
			sheetHeader,
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