import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI,
         SET_SIGNUP_STEPPE, SET_SIGGNUP_ON_INPUT_CHANGE_PH,
         SET_SIGGNUP_ON_INPUT_CHANGE_STK,
         ClEAR_SIGNUP_STEPPER, RESET_SIGNUP_CURRENT_STEP } from '../types';
import { I_UI_State, I_SignUp_Stepper } from '@/Interfaces/States';
import { clone } from '@/Helpers/HelperArrayFuncs';

const _intFormData=new FormData();
_intFormData.append('licenseImg',"" as any);
_intFormData.append('commerialRegImg',"" as any);
const _initialState:I_UI_State = {
 loading:false,
 errors:{
        loginErrors:{

        },
        signUp_Errors:{
            Ph_SignUp_Errors:{
                Step1_Errors:{},
                Step2_Errors:{},
                Step3_Errors:{},
                Step4_Errors:{},
                All_Form_Errors:{} as any
            },
            Stk_SignUp_Errors:{
                Step1_Errors:{},
                Step2_Errors:{},
                Step3_Errors:{},
                Step4_Errors:{},
                All_Form_Errors:{}as any
            }
        }
    },
 signUp_Stepper:{
   currentStep:0,
   isValid:false,
   selectedCity:0,
   ph_DataOfSteps:{
        step1:{
            areaId:0,
            cityId:0,
            mgrName:"",
            name:"",
            ownerName:""
        },
        step2:{
            data:_intFormData
        },
        step3:{
            address:"",
            linePhone:"",
            persPhone:""
        },
        step4:{
            confirmPassword:"",
            email:"",
            password:""
        }
   },
   stk_DataOfSteps:{
        step1:{
            areaId:0,
            cityId:0,
            mgrName:"",
            name:"",
            ownerName:""
        },
        step2:{
            data:clone(_intFormData)
        },
        step3:{
            address:"",
            linePhone:"",
            persPhone:""
        },
        step4:{
            confirmPassword:"",
            email:"",
            password:""
        }
   }
} 
};
export default   (state =clone(_initialState), { type, payload }:{type:string,payload:any}):I_UI_State => {
    switch (type) {
    case SET_ERRORS:
        return { ...clone(state), loading:false,errors:{...payload}}
    case CLEAR_ERRORS:
        return {...clone(state), errors:{...clone(_initialState).errors}};
    case LOADING_UI:
        return {...clone(state),loading:true} ;
    case STOP_LOADING_UI:
        return {...clone(state),loading:false} ;
    case SET_SIGNUP_STEPPE:
        return {...clone(state),signUp_Stepper:{...payload},loading:false};
    case RESET_SIGNUP_CURRENT_STEP:
        return {...clone(state),signUp_Stepper:{...clone(state.signUp_Stepper),currentStep:0}};
    case ClEAR_SIGNUP_STEPPER:
        return {
            /*...clone(state),
            signUp_Stepper:{...clone(_initialState.signUp_Stepper)},
            loading:false*/
            ...clone(_initialState)
        }
    case SET_SIGGNUP_ON_INPUT_CHANGE_PH:
        {  
            let stepper=clone(state.signUp_Stepper) as I_SignUp_Stepper;
            stepper.ph_DataOfSteps={...payload};
            return {...clone(state),signUp_Stepper:{...stepper}};
        }
    case SET_SIGGNUP_ON_INPUT_CHANGE_STK:
        {
            let stepper=clone(state.signUp_Stepper) as I_SignUp_Stepper;
            stepper.stk_DataOfSteps={...payload}
            return {...clone(state),signUp_Stepper:{...stepper}};
        }
    default:
        return state
    }
}
