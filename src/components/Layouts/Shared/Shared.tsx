import React, { Component } from 'react'
import { AppVariables } from '../../../config'
import { connect } from 'react-redux'
import { IUserState } from '../../../Interfaces/States'
import EmailConfirm from './EmailConfirm';
interface Props {
    user:IUserState
}
interface State {
    
}

class Shared extends Component<Props, State> {
    render() {
        const {user}=this.props;
        return (
            <>
            <div>
                {user.authenticated && !user.userIdentity.user.emailConfirmed && <EmailConfirm/>}
            </div>
            </>
        )
    }
}
export default connect((state:{user:IUserState})=>({
    user:state.user
    }), {})(Shared as any)
