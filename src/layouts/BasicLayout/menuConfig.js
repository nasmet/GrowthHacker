// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [{
	name: '自定义sql查询',
	path: '/sql',
}, {
	name: '用户',
	path: '/user',
	sub: [{
		name: '退出',
		path: '',
		onClick: (e) => {
			e.preventdefault();
			api.loginOut().then(() => {
				model.history.push('/user/login');
			}).catch(e => {
				model.log(e);
			})
		},
	}],
}];

/**
 * 热点系统和微博运营
 */
/* {
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
}, */

const asideMenuConfig = [{
	name: '数据分析',
	path: '/growthhacker',
	icon: '',
	sub: [{
		name: '项目列表',
		path: '/growthhacker/projectlist',
	}, {
		name: '项目数据',
		path: '/growthhacker/projectdata',
		auth: () => sessionStorage.getItem(config.PROJECTID),
	}],
}, {
	name: '千人千面',
	path: '/thousandfaces',
	icon: '',
	auth: () => sessionStorage.getItem(config.PROJECTID),
	sub: [{
		name: '标签库',
		path: '/thousandfaces/taglibrary',
	}, {
		name: '用户标签',
		path: '/thousandfaces/usertag',
	}, {
		name: '规则配置',
		path: '/thousandfaces/rule',
	}, {
		name: '策略配置',
		path: '/thousandfaces/strategy',
	}, {
		name: '方案配置',
		path: '/thousandfaces/plan',
	}],
}];

export {
	headerMenuConfig,
	asideMenuConfig,
};