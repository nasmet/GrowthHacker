import {
	Message,
} from '@alifd/next';

export default (e) => {
	Message.success(e.toString());
	// console.error(e);
}