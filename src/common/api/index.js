import {
	cancelRequest,
	cancelUpload,
} from './base';
import dataanalysis from './dataanalysis/index';
import * as thousandfaces from './thousandfaces/index';

export default Object.assign({}, {
	cancelRequest,
	cancelUpload,
}, dataanalysis, thousandfaces);