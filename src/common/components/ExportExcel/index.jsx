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
}) {
	const refDialog = useRef(null);
	const refVarible = useRef({
		name: '',
	});
	const sheetName = 'sheet';

	const click = () => {
		refDialog.current.onShow();
	};

	const onInputChange = e => {
		refVarible.current.name = e;
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

	const onOk = (success, fail) => {
		const option = getHandData();
		const toExcel = new ExportJsonExcel(option);
		toExcel.saveExcel();
		success();
	};

	return (
		<div>
			<Button onClick={click} ><Icon type='download' /></Button>
			<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
		</div>
	);
}