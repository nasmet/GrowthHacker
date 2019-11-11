import {
	cancelRequest,
	cancelUpload,
} from './base';
import growthhacker from './growthhacker/index';
import * as thousandfaces from './thousandfaces/index';

export default Object.assign({}, {
	cancelRequest,
	cancelUpload,
}, growthhacker, thousandfaces);