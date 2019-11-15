import * as admonitor from './ad-monitor';
import * as customeranalysis from './customer-analysis';
import * as databoard from './data-board';
import * as datacenter from './data-center';
import * as productanalysis from './product-analysis';
import * as projectlist from './project-list';
import * as sharespread from './share-spread';
import * as sql from './sql';
import * as useranalysis from './user-analysis';

export default Object.assign({}, admonitor,
	customeranalysis,
	databoard,
	datacenter,
	productanalysis,
	projectlist,
	sharespread,
	sql,
	useranalysis);