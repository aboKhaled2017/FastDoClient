 
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { IUserState } from '../../Interfaces/States';
import {ICurrentUserIdentifier, ITokenIdentifier, IUserIdentity, E_UserType } from '../../Interfaces/AccountTypes';
import {REMOVE_USER_IDENTITY,SET_USER_IDENTITY, LOADING_USER, Stop_LOADING_USER, SET_USER_TYPE, RESET_DATA_AFTERLOGOUT } from '../types';
import { clone } from '../../Helpers/HelperArrayFuncs';

const initialState:IUserState = {
authenticated:false,
loading:false,
userIdentity:{
    user:{} as ICurrentUserIdentifier,
    accessToken:{} as ITokenIdentifier
} as IUserIdentity
}

const reducer:Reducer<IUserState,AnyAction&{payload?:any}>= (state = clone(initialState), { type, payload })
 :IUserState => {
    switch (type) {
    case SET_USER_IDENTITY:
        return { ...state, authenticated:true,loading:false,userIdentity:{...clone(payload)}}
    case RESET_DATA_AFTERLOGOUT:
        return {...clone(initialState)};
    case Stop_LOADING_USER:
        return {...state,loading:false}
    case LOADING_USER:
        return {...state,loading:true}               
    default:
        return state
    }
}
export default reducer as ()=>IUserState;