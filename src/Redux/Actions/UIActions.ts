import { SET_USER_IDENTITY,REMOVE_USER_IDENTITY, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,  LOADING_USER, MARK_NOTIFICATIONS_READ, SET_SIGNUP_STEPPE, SET_SIGGNUP_ON_INPUT_CHANGE_PH, SET_SIGGNUP_ON_INPUT_CHANGE_STK, STOP_LOADING_UI, ClEAR_SIGNUP_STEPPER, SET_USER_TYPE, RESET_SIGNUP_CURRENT_STEP } from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'
import {IPh_Signup_Step1, IUserIdentity, I_UI_Errors, I_Ph_SignUp_Errors, I_Stk_SignUp_Errors, I_SignUp_Errors, IPh_Signup_Step2, IPh_Signup_Step3, IPh_Signup_Step4, E_UserType} from '../../Interfaces/AccountTypes'
import { I_SignUp_Stepper, I_DataOf_Signup_Ph_Steps, I_DataOf_Signup_Stk_Steps } from '../../Interfaces/States';
import store from '../store';
import { clone } from '../../Helpers/HelperArrayFuncs';
import { Base_URLs } from '../../config';
import {setUserIdentity} from './userActions'
import { IHistory } from '../../Interfaces/DataTypes';
const api = axios.create({
    baseURL: Base_URLs.BaseUrl,
    headers: {
      common: {
        Accept: 'application/json'
      },
      patch: {
        'Content-Type': 'application/json'
      }
    }
})
const api_formData = axios.create({
    baseURL: Base_URLs.BaseUrl,
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
})

enum SignUpType{
    pharmacy,
    stock
}
var _getStepPrefix_Ph_URL=(step:number|null,type:SignUpType)=>{
    if(type==SignUpType.pharmacy){
        switch(step){
            case 0:return "ph/signup/step1";
            case 1:return "ph/signup/step2";
            case 2:return "ph/signup/step3";
            case 3:return "ph/signup/step4";
            case null:return 'ph/signup';
            default:return "ph/signup";
        }
    }
    else {
        switch(step){
            case 0:return "stk/signup/step1";
            case 1:return "stk/signup/step2";
            case 2:return "stk/signup/step3";
            case 3:return "stk/signup/step4";
            case null:return 'stk/signup';
            default:return "stk/signup";
        }
    }
}
let history:IHistory;
export const signUp_Step_Try=(
    userData:IPh_Signup_Step1|IPh_Signup_Step2|IPh_Signup_Step3|IPh_Signup_Step4,
    step:number,
    type:SignUpType)=>(dispatch:Dispatch<AnyAction>|any)=>{

    dispatch({type:LOADING_UI});
    var Request=(step==1)
    ?api_formData.post(_getStepPrefix_Ph_URL(step,type),(userData as any).data)
    :api.post(_getStepPrefix_Ph_URL(step,type),userData);
   
    Request.then(res=>{
        if(step==3){
            dispatch(finalSignUp(type) as any);         
        }else{
           dispatch(Set_SignUp_Stepper(step+1 as number,false) as any);       
        }
        dispatch({type:CLEAR_ERRORS});
    })
    .catch(err=>{
        if(!err.response) 
        {
            alert("خطأ فى الاتصال بالسيرفر");
            dispatch({type:STOP_LOADING_UI});
            return;
        }
         var errorsResult=err.response.data.errors;
         var errors=clone(store.getState().UI.errors);
         if(type==SignUpType.pharmacy){
            var currentPhErrors=clone(store.getState().UI.errors.signUp_Errors.Ph_SignUp_Errors);
            switch(step){
                case 0:currentPhErrors.Step1_Errors={...errorsResult};break;
                case 1:currentPhErrors.Step2_Errors={...errorsResult};break;
                case 2:currentPhErrors.Step3_Errors={...errorsResult};break;
                case 3:currentPhErrors.Step4_Errors={...errorsResult};break;
                default:currentPhErrors=currentPhErrors;break;
            }
            errors.signUp_Errors.Ph_SignUp_Errors=currentPhErrors;
         }
         else{
            var currentStkErrors=clone(store.getState().UI.errors.signUp_Errors.Stk_SignUp_Errors) ;
            switch(step){
                case 0:currentStkErrors.Step1_Errors={...errorsResult};break;
                case 1:currentStkErrors.Step2_Errors={...errorsResult};break;
                case 2:currentStkErrors.Step3_Errors={...errorsResult};break;
                case 3:currentStkErrors.Step4_Errors={...errorsResult};break;
                default:currentStkErrors=currentStkErrors;break;
            }       
            errors.signUp_Errors.Stk_SignUp_Errors=currentStkErrors    
         }  
         dispatch({type:SET_ERRORS,payload:errors});
    })
}
export const finalSignUp=(type:SignUpType)=>(dispatch:Dispatch<AnyAction>|any)=>{
    dispatch({type:LOADING_UI});
    if(type==SignUpType.pharmacy)
    dispatch(finalSignUp_Ph(type) as any);
    else
    dispatch(finalSignUp_Stk(type) as any);
}
export const finalSignUp_Ph=(type:SignUpType)=>(dispatch:Dispatch<AnyAction>|any)=>{
    var stepsOfData=clone(store.getState().UI.signUp_Stepper.ph_DataOfSteps) as I_DataOf_Signup_Ph_Steps;
    var data=clone(stepsOfData.step2.data)as FormData;
    
    data.append('mgrName',stepsOfData.step1.mgrName.toString());
    data.append('name',stepsOfData.step1.name.toString());
    data.append('ownerName',stepsOfData.step1.ownerName.toString());
    data.append('areaId',stepsOfData.step1.areaId.toString());
    data.append('cityId',stepsOfData.step1.cityId.toString());

    data.append('address',stepsOfData.step3.address.toString());
    data.append('persPhone',stepsOfData.step3.persPhone.toString());
    data.append('linePhone',stepsOfData.step3.linePhone.toString());

    data.append('email',stepsOfData.step4.email.toString());
    data.append('password',stepsOfData.step4.password.toString());
    data.append('confirmPassword',stepsOfData.step4.confirmPassword.toString());

    var request=api_formData.post(_getStepPrefix_Ph_URL(null,type),data);
    request.then(res=>{
        dispatch({type:ClEAR_SIGNUP_STEPPER});  
        dispatch({type:SET_USER_TYPE,payload:E_UserType.pharmacier});
        dispatch(setUserIdentity(res.data));
        history.goBack();
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
         errors.signUp_Errors.Ph_SignUp_Errors.All_Form_Errors={...errorsResult};
         dispatch({type:SET_ERRORS,payload:errors});
    });
}
export const finalSignUp_Stk=(type:SignUpType)=>(dispatch:Dispatch<AnyAction>|any)=>{
    //dispatch({type:LOADING_UI});
    var stepsOfData=clone(store.getState().UI.signUp_Stepper.stk_DataOfSteps) as I_DataOf_Signup_Stk_Steps;
    var data=clone(stepsOfData.step2.data)as FormData;
    
    data.append('mgrName',stepsOfData.step1.mgrName.toString());
    data.append('name',stepsOfData.step1.name.toString());
    data.append('ownerName',stepsOfData.step1.ownerName.toString());
    data.append('areaId',stepsOfData.step1.areaId.toString());
    data.append('cityId',stepsOfData.step1.cityId.toString());

    data.append('address',stepsOfData.step3.address.toString());
    data.append('persPhone',stepsOfData.step3.persPhone.toString());
    data.append('linePhone',stepsOfData.step3.linePhone.toString());

    data.append('email',stepsOfData.step4.email.toString());
    data.append('password',stepsOfData.step4.password.toString());
    data.append('confirmPassword',stepsOfData.step4.confirmPassword.toString());

    var request=api_formData.post(_getStepPrefix_Ph_URL(null,type),data);
    request.then(res=>{
        dispatch({type:ClEAR_SIGNUP_STEPPER}); 
        dispatch({type:SET_USER_TYPE,payload:E_UserType.stocker});   
        dispatch(setUserIdentity(res.data));
        history.goBack();
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
         errors.signUp_Errors.Stk_SignUp_Errors.All_Form_Errors={...errorsResult};
         dispatch({type:SET_ERRORS,payload:errors});
    });
}

export const Set_Selected_City=(id:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
    var stepper=clone(store.getState().UI.signUp_Stepper) as I_SignUp_Stepper;
     stepper.selectedCity=id;
    dispatch({type:SET_SIGNUP_STEPPE,payload:stepper})
}
export const Set_SignUp_Stepper=(currentStep:number,isValid:boolean)=>(dispatch:Dispatch<AnyAction>|any)=>{
 var stepper=clone(store.getState().UI.signUp_Stepper) as I_SignUp_Stepper;
 stepper.currentStep=currentStep;
 stepper.isValid=isValid;
 dispatch({type:SET_SIGNUP_STEPPE,payload:{...stepper}});
}

export const On_Ph_Signup_Input_change=(name:string,value:any,step:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
    let data=clone(store.getState().UI.signUp_Stepper.ph_DataOfSteps) as I_DataOf_Signup_Ph_Steps;
    switch(step){
        case 0:(data?.step1 as any)[name]=value;break;
        case 1:{
            data.step2.data.delete(name);
            data.step2.data.append(name,value);
        };break;
        case 2:(data?.step3 as any)[name]=value;break;
        case 3:(data?.step4 as any)[name]=value;break;
        default: return;
    }
    dispatch({type:SET_SIGGNUP_ON_INPUT_CHANGE_PH,payload:data})
}
export const On_Stk_Signup_Input_change=(name:string,value:any,step:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
    let data=clone(store.getState().UI.signUp_Stepper.stk_DataOfSteps) as I_DataOf_Signup_Stk_Steps;
    switch(step){
        case 0:(data?.step1 as any)[name]=value;break;
        case 1:{
            data.step2.data.delete(name);
            data.step2.data.append(name,value);
        };break;
        case 2:(data?.step3 as any)[name]=value;break;
        case 3:(data?.step4 as any)[name]=value;break;
        default: return;
    }
    dispatch({type:SET_SIGGNUP_ON_INPUT_CHANGE_STK,payload:data})
}

export const Execute_SignUp_Ph_Step=(stepNumber:number,_history:IHistory)=>(dispatch:Dispatch<AnyAction>|any)=>{
 history=_history;
 var data=clone(store.getState().UI.signUp_Stepper.ph_DataOfSteps) as I_DataOf_Signup_Ph_Steps;
 switch(stepNumber){
     case 0: dispatch(signUp_Step_Try(data?.step1,0,SignUpType.pharmacy));break;
     case 1: dispatch(signUp_Step_Try(data?.step2,1,SignUpType.pharmacy));break;
     case 2: dispatch(signUp_Step_Try(data?.step3,2,SignUpType.pharmacy));break;
     case 3: dispatch(signUp_Step_Try(data?.step4,3,SignUpType.pharmacy));break;
     default :return;
 }
}
export const Execute_SignUp_Stk_Step=(stepNumber:number,_history:IHistory)=>(dispatch:Dispatch<AnyAction>|any)=>{
    history=_history;
    var data=clone(store.getState().UI.signUp_Stepper.stk_DataOfSteps) as I_DataOf_Signup_Stk_Steps;
    switch(stepNumber){
        case 0: dispatch(signUp_Step_Try(data?.step1,0,SignUpType.stock));break;
        case 1: dispatch(signUp_Step_Try(data?.step2,1,SignUpType.stock));break;
        case 2: dispatch(signUp_Step_Try(data?.step3,2,SignUpType.stock));break;
        case 3: dispatch(signUp_Step_Try(data?.step4,3,SignUpType.stock));break;
        default :return;
        }
}

export const Reset_SignUp_Current_Step=()=>(dispatch:Dispatch<AnyAction>|any)=>{
    dispatch({type:RESET_SIGNUP_CURRENT_STEP});
}