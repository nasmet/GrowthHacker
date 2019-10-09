/**
 * 定义应用路由
 */
import React, {
	Component,
	useEffect,
} from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
	Router,
	Redirect,
} from 'react-router-dom';
import routerConfig from './routerConfig';
import model from './common/model/index';

// 全局的路由拦截
const RouteIntercept = ({
	children,
	history,
}) => {
	useEffect(() => {
		const token = sessionStorage.getItem(config.TOKENKEY);
		if (!token) {
			history.push('/user/login');
		}
	}, []);

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
	if(!auth){
		return <Route key={id} path={path} component={component} />
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

const traversing = function fn(route) {
	const {
		component: RouteComponent,
		children,
		path,
		id,
	} = route;
	if (children) {
		return (
			<Route key={id} path={path} component={(props)=>{
				return(
					<RouteComponent {...props}>
	                    <Switch>
	                      	{
	                      		children.map((routeChild) => {
	                         		return fn(routeChild);
	                        	})
	                      	}
	                      </Switch>
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
		  	<Switch>
				{routerConfig.map(traversing)}
		 	</Switch>
    	</Router>
	);
};

export default router();