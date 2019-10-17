import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import Layout from '@icedesign/layout';
import Aside from './components/Aside';
import Main from './components/Main';

export default function QueryEditor() {
	const [query, setQuery] = useState("");
	
	const menuSelect = (e) => {
		setQuery(e);
	};

	return (
		<Layout fixable>
     		<Layout.Section>
     			<Layout.Aside style={{width: 300}}>
	        		<Aside menuSelect={menuSelect} />
	     		</Layout.Aside>
       	 		<Layout.Main scrollable>
       	 			<Main query={query} />
        		</Layout.Main>
      		</Layout.Section>
    	</Layout>
	);
}