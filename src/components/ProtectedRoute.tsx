import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import { connect } from 'react-redux';
import { IUserState } from '../Interfaces/States';
 

interface ProtectedRouteProps extends RouteProps {
    isAuthenticated?: boolean;
    authenticationPath: string;
}

 class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (!this.props.isAuthenticated) {
            redirectPath = this.props.authenticationPath;
        }

        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{pathname: redirectPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}
 export default connect((state:{user:IUserState})=>({
    isAuthenticated:state.user.authenticated,
    authenticationPath:'/login'
 }), {})(ProtectedRoute) as any as (props:RouteProps)=>React.ReactElement