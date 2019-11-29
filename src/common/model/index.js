import history from './history';
import disabledDate from './disabled-date';
import log from './log';
import * as transformDate from './transform-date';
import * as sql from './sql';
import reversePoland from './reverse-poland';
import * as assemble from './assemble';
import * as productAnalysis from './product-analysis';
import * as operator from './operator';
import traverse from './traverse';
import * as context from './context';
import * as rules from './rules';
import onFire from './onfire';

export default Object.assign({
	history,
	disabledDate,
	log,
	sql,
	reversePoland,
	traverse,
	onFire,
}, assemble, productAnalysis, operator, context, rules, transformDate)