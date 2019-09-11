import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Balloon,
	Checkbox,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import * as propConfig from './propConfig';
import Template from '../Template';

function PropConsumption() {
	return (
		<Template titleConfig={propConfig.titles} request={api.getProp} />
	);
}

export default withRouter(PropConsumption);