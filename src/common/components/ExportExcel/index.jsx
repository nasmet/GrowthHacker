import React from 'react';
import {
	Button,
	Icon,
} from '@alifd/next';
import ExportJsonExcel from 'js-export-excel';

export default function ExportExcel({
	fileName = '新建表格',
	handle,
}) {
	const onExport = () => {
		if (!handle) {
			throw new Error('handle为空');
		}
		const option = {
			fileName,
			datas: [{
				sheetName: 'sheet',
				...handle(),
			}]
		};
		const toExcel = new ExportJsonExcel(option);
		toExcel.saveExcel();
	};

	return (
		<div>
			<Button onClick={onExport} ><Icon type='download' /></Button>
		</div>
	);
}