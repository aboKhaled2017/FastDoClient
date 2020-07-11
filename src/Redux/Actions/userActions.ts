import { SET_USER_IDENTITY,REMOVE_USER_IDENTITY, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,  LOADING_USER, MARK_NOTIFICATIONS_READ, Stop_LOADING_USER, STOP_LOADING_UI } from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'
import {IPh_Signup_Step1, IUserIdentity, ILoginData, I_UI_Errors} from '../../Interfaces/AccountTypes'
import {IHistory } from '../../Interfaces/DataTypes';
import { clone } from '../../Helpers/HelperArrayFuncs';
import store from '../store';


export const logoutUser=(history:IHistory)=>(dispatch:Dispatch)=>{
  AuthorizationHeader.removeUserIdentity();
  dispatch({type:REMOVE_USER_IDENTITY})
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
/*export const signUpUser=(newUserData:ISignUpModel,history:IComponentHistory)=>(dispatch:Dispatch<AnyAction>|any)=>{
  //loading ui
  dispatch({type:LOADING_UI})
  axios.post('/signup',newUserData)
    .then(res=>{
      AuthorizationHeader.setToken(res.data.token)
      //get user data
      dispatch(getUserData())
      //clear errors after getting data
      dispatch({type:CLEAR_ERRORS})
      history.push('/');
    })
    .catch(err=>{
        //set errors
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
      //this.setState({errors:err.response.data,loading:false})
    })
}

export const uploadUserImage=(formdata:FormData)=>(dispatch:Dispatch)=>{
  dispatch({type:LOADING_USER});
  axios.post('/user/image',formdata).then(res=>{
       dispatch(getUserData() as any);
  })
  .catch(err=>{
    dispatch({type:LOADING_ERROR})
    console.log(err)
  })
}
*/
const AuthorizationHeader={
  tokenKey:'accessToken',
  userIdentifierKey:'UserIdentifier',
  setUserIdentity(userData:IUserIdentity){
   localStorage.setItem(this.userIdentifierKey,JSON.stringify(userData));
  },
  setToken(token:string){
    const accessToken=`Bearer ${token}`;        
    localStorage.setItem(this.tokenKey,accessToken)
    axios.defaults.headers.common['Authorization']=accessToken;
  },
  removeUserIdentity(){
   localStorage.removeItem(this.tokenKey);
   localStorage.removeItem(this.userIdentifierKey);
  }
}
