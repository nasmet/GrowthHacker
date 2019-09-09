// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [{
	name: '自定义sql查询',
	path: '/sql',
}, {
	name: '帮助文档',
	path: '',
}, {
	name: '通知',
	path: '',
}, {
	name: '用户',
	path: '',
}, {
	name: '语言',
	path: '',
}];

const asideMenuConfig = [{
	name: '热点系统',
	path: '/system',
	icon: 'publish',
	sub: [{
		name: '热点发现',
		path: '/system/find',
	}, {
		name: '热点监控',
		path: '/system/monitor',
	}, {
		name: '热点分析',
		path: '/system/analysis',
	}],
}, {
	name: '微博运营',
	path: '/operation',
	icon: 'publish',
	sub: [{
		name: '微博列表',
		path: '/operation/list',
	}, {
		name: '微博状态',
		path: '/operation/status',
	}, {
		name: '微博互动',
		path: '/operation/Interactive',
	}],
}, {
	name: '增长黑客',
	path: '/growthhacker',
	icon: 'publish',
	sub: [{
		name: '产品分析',
		path: '/growthhacker/productanalysis',
	}, {
		name: '用户分析',
		path: '/growthhacker/useranalysis',
	}, {
		name: '获客分析',
		path: '/growthhacker/customeranalysis',
	}, {
		name: '数据中心',
		path: '/growthhacker/datacenter',
	}, {
		name: '数据看板',
		path: '/growthhacker/databoard',
	}],
}];

export {
	headerMenuConfig,
	asideMenuConfig,
};