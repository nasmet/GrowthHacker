export function initAnalysisData(type, location) {
	let initRequest = false;
	let initSave = {};
	let initTitle;
	let initCondition;
	switch (type) {
		case 1:
			initTitle = '新建事件分析';
			initCondition = {
				dimensions: [],
				metrics: [],
				segmentation_id: 0,
			};
			break;
		case 2:
			initCondition = {
				steps: [],
				segmentation_id: 0,
			};
			initTitle = '新建漏斗分析';
			break;
		case 3:
			initCondition = {
				segmentation_id: 0,
				init_event: '',
				retention_event: '',
			};
			initTitle = '新建留存分析';
			break;
	}
	let initDate = 'day:0';
	let initDateFilter = {};
	let initOrders = {};

	if (location.state && location.state.boardInfo) {
		const {
			name,
			desc,
			date,
			segmentation_id,
			metrics,
			dimensions,
			orders,
			steps,
			init_event,
			retention_event,
		} = location.state.boardInfo;

		initRequest = true;
		initTitle = name;
		initSave.disable = false;
		initDate = date || initDate;
		initDateFilter = {
			initTabValue: 'NAN',
			initCurDateValue: model.transformDate(initDate),
		};
		switch (type) {
			case 1:
				initCondition = {
					segmentation_id,
					dimensions,
					metrics,
				};
				break;
			case 2:
				initCondition = {
					steps,
					segmentation_id,
				};
				break;
			case 3:
				initCondition = {
					segmentation_id,
					init_event,
					retention_event,
				};
				break;
		}
		initOrders = orders || initOrders;
	}
	return {
		initRequest,
		initSave,
		initTitle,
		initCondition,
		initDate,
		initDateFilter,
		initOrders,
	}
}