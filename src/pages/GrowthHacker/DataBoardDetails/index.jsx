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
	Icon,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import dataBoardDetailsConfig from './dataBoardDetailsConfig';

const {
	Item,
} = Tab;

function DataBoardDetails({
	location,
}) {
	const {
		state,
	} = location;
	console.log(state);

	const rendTab = () => {
		return dataBoardDetailsConfig.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content />
          			</div>
        		</Item>
			);
		});
	};

	return (
		<Tab defaultActiveKey="gl">
    		{rendTab()}
  		</Tab>
	);
}

export default withRouter(DataBoardDetails);