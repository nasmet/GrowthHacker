// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
// 
const headerMenuConfig = [{
	name: () => '自定义sql查询',
	path: '/sql',
}, {
	color: '#ea6947',
	name: () => sessionStorage.getItem('USERNAME') || '用户',
	path: '/user',
	sub: [{
		name: () => '退出',
		path: '',
		onClick: (e) => {
			e.preventDefault();
			api.loginOut().then(() => {
				model.history.push('/user/login');
			}).catch(e => {
				model.log(e);
			})
		},
	}],
}];

const asideMenuConfig = [{
	name: '数据分析',
	path: '/dataanalysis',
	sub: [{
		name: '项目列表',
		path: '/dataanalysis/projectlist',
	}, {
		name: '项目数据',
		path: '/dataanalysis/projectdata',
		auth: () => sessionStorage.getItem(config.PROJECTID),
	}],
}, {
	name: '千人千面',
	path: '/thousandfaces',
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