const baseUrl = '/dataanalysis/projectdata';

export const navs = [{
	name: '数据看板',
	path: `${baseUrl}/db`,
}, {
	name: '产品分析',
	path: `${baseUrl}/pa`,
	sub: [{
		name: '事件分析',
		path: `${baseUrl}/pa/eventanalysis/new`,
	}, {
		name: '留存分析',
		path: `${baseUrl}/pa/retentionanalysis/new`,
	}, {
		name: '漏斗分析',
		path: `${baseUrl}/pa/funnelanalysis/new`,
	}],
}, {
	name: '用户分析',
	path: `${baseUrl}/ua`,
	sub: [{
		name: '用户分群',
		path: `${baseUrl}/ua/usergroup`,
	}, {
		name: '用户细查',
		path: `${baseUrl}/ua/userscrutiny`,
	}, {
		name: '用户画像',
		path: `${baseUrl}/ua/userportrait`,
	}, {
		name: '首页热力图',
		path: `${baseUrl}/ua/heatmap`,
	}],
}, {
	name: '分享传播',
	path: `${baseUrl}/fs`,
	sub: [{
		name: '分享概览',
		path: `${baseUrl}/fs/shareview`,
	}, {
		name: '分享趋势',
		path: `${baseUrl}/fs/sharetrend`,
	}, {
		name: '分享触发分析',
		path: `${baseUrl}/fs/shareanalysis`,
	}, {
		name: '用户分享',
		path: `${baseUrl}/fs/usershare`,
	}],
}, {
	name: '广告监测',
	path: `${baseUrl}/ad`,
	sub: [{
		name: '生命周期广告次数',
		path: `${baseUrl}/ad/adcount`,
	}, {
		name: '付费率分析',
		path: `${baseUrl}/ad/adanalysis`,
	}, {
		name: 'ARPU分析',
		path: `${baseUrl}/ad/arpuanalysis`,
	}],
}, {
	name: '获客分析',
	path: `${baseUrl}/ca`,
	sub: [{
		name: '单用户价值评估',
		path: `${baseUrl}/ca/userworth`,
	}, {
		name: '分群用户价值评估',
		path: `${baseUrl}/ca/groupworth`,
	}],
}, {
	name: '数据中心',
	path: `${baseUrl}/dc`,
}, {
	name: '最新打点事件',
	path: `${baseUrl}/newevent`,
}];