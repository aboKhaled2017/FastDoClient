import { SET_USER_IDENTITY,REMOVE_USER_IDENTITY, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,STOP_LOADING_UI, RESET_DATA_AFTERLOGOUT } from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'
import {IUserIdentity, ILoginData, I_UI_Errors} from '../../Interfaces/AccountTypes'
import {IHistory } from '../../Interfaces/DataTypes';
import { clone } from '../../Helpers/HelperArrayFuncs';
import store from '../store';
import { Fetch_Headers } from '../../config';

export const logoutUser=(history:IHistory)=>(dispatch:Dispatch)=>{
  AuthorizationHeader.removeUserIdentity();
  dispatch({type:REMOVE_USER_IDENTITY});
  dispatch({type:RESET_DATA_AFTERLOGOUT});
  if(history)
  history.push('/');
}

export const setUserIdentity=(userIdentity:IUserIdentity)=>(dispatch:Dispatch)=>{
  AuthorizationHeader.setUserIdentity(userIdentity);
  dispatch({type:SET_USER_IDENTITY,payload:userIdentity})
}

export const loginUser=(userData:ILoginData,history:IHistory)=>(dispatch:Dispatch<AnyAction>|any)=>{
    dispatch({type:LOADING_UI})
    axios.post('/auth/signin',userData)
      .then(res=>{
        dispatch({type:CLEAR_ERRORS});    
        dispatch(setUserIdentity(res.data));
        dispatch({type:STOP_LOADING_UI});
        history.push('/');
      })
      .catch(err=>{
        if(!err.response) 
        {
            alert("خطأ فى الاتصال بالسيرفر");
            dispatch({type:STOP_LOADING_UI});
            return;
        }
         var errorsResult=err.response.data.errors;
         var errors=clone(store.getState().UI.errors) as I_UI_Errors;
         errors.loginErrors={...errorsResult};
         dispatch({type:SET_ERRORS,payload:errors});
      })
}

const AuthorizationHeader={
  tokenKey:'accessToken',
  userIdentifierKey:'UserIdentifier',
  setUserIdentity(userData:IUserIdentity){
    axios.defaults.headers.common['Authorization']=`Bearer ${userData.accessToken.token}`;
   localStorage.setItem(this.userIdentifierKey,JSON.stringify(userData));
   Fetch_Headers.append('Authorization',`Bearer ${userData.accessToken.token}`);
  },
  removeUserIdentity(){
   localStorage.removeItem(this.tokenKey);
   localStorage.removeItem(this.userIdentifierKey);
  }
}
