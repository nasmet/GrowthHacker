export function eventSql(appid) {
	return `select *
			from event
			where appid = '${appid}'
			order by created_at desc
			limit 10;`
}