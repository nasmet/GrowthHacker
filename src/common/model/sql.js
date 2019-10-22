export function eventSql(appid) {
	return `select id,appid, wechat_openid, event, game_level_var, user_level_var
			from wechat_event
			where appid = '${appid}'
			order by created_at desc
			limit 10;`
}