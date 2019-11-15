import Analysis from './components/Analysis';

export const tabs = [{
	key: 'aa',
	tab: '区域分析',
	init: {
		tabs: [{
			key: 'province',
			tab: '按省',
		}, {
			key: 'city',
			tab: '按市',
		}],
		initValue: {
			curKey: 'province',
			date: 'day:0',
		},
	},
	Component: Analysis,
}, {
	key: 'ma',
	tab: '机型分析',
	init: {
		tabs: [{
			key: 'phone_brand',
			tab: '品牌',
		}, {
			key: 'phone_model',
			tab: '机型',
		}],
		initValue: {
			curKey: 'phone_brand',
			date: 'day:0',
		},
	},
	Component: Analysis,
}, {
	key: 'ta',
	tab: '终端分析',
	init: {
		tabs: [{
			key: 'phone_platform',
			tab: '系统',
		}],
		initValue: {
			curKey: 'phone_platform',
			date: 'day:0',
		},
	},
	Component: Analysis,
}]