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
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import Layout from '@icedesign/layout';
import IceContainer from '@icedesign/container';
import './index.scss';
import Aside from './components/Aside';
import Main from './components/Main';

export default function QueryEditor() {
	return (
		<Layout fixable>
     		<Layout.Section>
     			<Layout.Aside scrollable width={300}>
	        		<Aside />
	     		</Layout.Aside>
       	 		<Layout.Main scrollable>
          			<div className="main-container">
            			<Main />
          			</div>
        		</Layout.Main>
      		</Layout.Section>
    	</Layout>
	);
}