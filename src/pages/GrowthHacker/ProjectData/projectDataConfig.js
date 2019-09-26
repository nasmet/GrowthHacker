const baseUrl = '/growthhacker/projectdata';

export default [{
	name: '数据看板',
	path: `${baseUrl}/db`,
}, {
	name: '产品分析',
	path: `${baseUrl}/pa`,
	sub: [{
		name: '事件分析',
		path: `${baseUrl}/pa/eventanalysis`,
	}, {
		name: '留存分析',
		path: `${baseUrl}/pa/retentionanalysis`,
	}, {
		name: '漏斗分析',
		path: `${baseUrl}/pa/funnelanalysis`,
	}],
}, {
	name: '用户分析',
	path: '/ua',
	sub: [{
		name: '用户分群',
		path: `${baseUrl}/ua/usergroup`,
	}, {
		name: '用户细查',
		path: `${baseUrl}/ua/userscrutiny`,
	}, {
		name: '用户画像',
		path: `${baseUrl}/ua/userportrait`,
	}],
}, {
	name: '获客分析',
	path: `${baseUrl}/ca`,
}, {
	name: '数据中心',
	path: `${baseUrl}/dc`,
}];