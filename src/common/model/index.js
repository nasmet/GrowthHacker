import history from './history';
import disabledDate from './disabledDate';
import log from './log';
import transformDate from './transformDate';
import * as sql from './sql';
import reversePoland from './reversePoland';
import * as assemble from './assemble';
import * as productAnalysis from './productAnalysis';
import * as operator from './operator';

export default Object.assign({
	history,
	disabledDate,
	log,
	transformDate,
	sql,
	reversePoland,
}, assemble, productAnalysis, operator)