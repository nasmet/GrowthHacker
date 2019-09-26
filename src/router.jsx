/**
 * 定义应用路由
 */
import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
	Router,
	Redirect,
} from 'react-router-dom';
import routerConfig from './routerConfig';
import model from './common/model/index';

const RouteItem = (route) => {
	const {
		id,
		redirect,
		path,
		component,
		exact,
	} = route;
	if (redirect) {
		return (
			<Redirect key={id} exact={exact} from={path} to={redirect} />
		);
	}
	return (
		<Route key={id} path={path} component={component} />
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
			<Route key={id} component={(props)=>{
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