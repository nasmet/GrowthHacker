/**
 * 定义应用路由
 */
import React, {
	useEffect,
	Suspense,
} from 'react';
import {
	Loading,
} from '@alifd/next';
import {
	BrowserRouter,
	Switch,
	Route,
	Router,
	Redirect,
} from 'react-router-dom';
import routerConfig from './routerConfig';
import model from './common/model/index';
import cookies from './common/cookies/index';

// 全局的路由拦截
const RouteIntercept = ({
	children,
	history,
}) => {
	const token = cookies.get(config.TOKENKEY);
	if (!token) {
		history.push('/user/login');
		return null;
	}
	
	return (
		<div>{children}</div>
	);
};

const RouteItem = (route) => {
	const {
		id,
		redirect,
		path,
		component,
		auth,
	} = route;
	const Component = component;
	if (redirect) {
		return <Redirect key={id} exact from={path} to={redirect} />;
	}
	if (!auth) {
		return <Route key={id} path={path} render={props=><Component {...props} />
	}
	/>
}
return (
		<Route key={id} path={path} render={props=>{
				return (
					<RouteIntercept {...props}>
						<Component />
					</RouteIntercept>
				)}
			} />
	);
};

const fallback = <Loading style={{top: '50px'}} inline={false} visible={true} tip='资源加载中' />;

const traversing = function fn(route) {
	const {
		component: RouteComponent,
		children,
		path,
		id,
	} = route;
	if (children) {
		return (
			<Route key={id} path={path} render={(props)=>{
				return(
					<RouteComponent {...props}>
						<Suspense fallback={fallback}>
		                    <Switch>
		                      	{
		                      		children.map((routeChild) => {
		                         		return fn(routeChild);
		                        	})
		                      	}
		                      </Switch>
	                      </Suspense>
	                </RouteComponent>
				);
			}} />
		);
	}
	return RouteItem(route);
};

const router = () => {
	return (
		<Router history={model.history}>
			<Suspense fallback={fallback}>
			  	<Switch>
					{routerConfig.map(traversing)}
			 	</Switch>
		 	</Suspense>
    	</Router>
	);
};

export default router();