import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import { connect } from 'react-redux';
import { IUserState } from '../Interfaces/States';
 

interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    role:string
    authenticationPath: string;
    targetRole:string
}

 class ProtectedRoute extends Route<ProtectedRouteProps> {
     render() {
        let redirectPath: string = '';
        const {authenticationPath,isAuthenticated,role,targetRole}=this.props;
        if (!isAuthenticated) {
            redirectPath =authenticationPath;
        }
        else if(targetRole!=role){
            redirectPath="/unAuthorized";
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
    authenticationPath:'/login',
    role:state.user.userIdentity.user.role
 }), {})(ProtectedRoute as any) as (props:RouteProps &{targetRole?:string})=>React.ReactElement