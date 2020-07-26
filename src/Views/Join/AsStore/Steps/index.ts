import {  Theme, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import {On_Stk_Signup_Input_change,Set_Selected_City} from '../../../../Redux/Actions/UIActions'
import { IDataState, I_UI_State, I_DataOf_Signup_Stk_Steps } from "../../../../Interfaces/States";
import STK_Identity_Step from "./Step1_Identity";
import STK_Proof_Step from "./Step2_Proof";
import STK_Contacts_Step from "./Step3_Contacts";
import STK_Account_Step from "./Step4_Account";
const styles=(theme:Theme)=>({
    ...(theme as any).spreadCommonJoinView,
     
    formHelperText:{
        color:'#f00'
    },
    imgBox:{
        width: '220px',
        height: '110px',
        border:' 1px solid #d5d5d5',
        borderRadius: '7px',
        padding: '5px',
        margin: '3px',
        '&  img':{
            width: '100%',
            height:' -webkit-fill-available'
        }
    },
    ImgUploadIcon:{
        marginRight:10
    }
})

const step1=connect((state:{data:IDataState,UI:I_UI_State}) => ({
    data:state.data,
    errors:state.UI.errors,
    stk_DataOfSteps:state.UI.signUp_Stepper?.stk_DataOfSteps as I_DataOf_Signup_Stk_Steps,
    selectedCityId:state.UI.signUp_Stepper.selectedCity
}),{On_Stk_Signup_Input_change,Set_Selected_City})(withStyles(styles)(STK_Identity_Step));

const step2=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    stk_DataOfSteps:state.UI.signUp_Stepper.stk_DataOfSteps as I_DataOf_Signup_Stk_Steps
}),{On_Stk_Signup_Input_change})(withStyles(styles)(STK_Proof_Step));

const step3=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    stk_DataOfSteps:state.UI.signUp_Stepper?.stk_DataOfSteps as I_DataOf_Signup_Stk_Steps
}),{On_Stk_Signup_Input_change})(withStyles(styles)(STK_Contacts_Step));

const step4=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    stk_DataOfSteps:state.UI.signUp_Stepper?.stk_DataOfSteps as I_DataOf_Signup_Stk_Steps
}),{On_Stk_Signup_Input_change})(withStyles(styles)(STK_Account_Step));
export default {step1,step2,step3,step4}