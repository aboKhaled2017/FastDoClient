import {  Theme, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import {On_Ph_Signup_Input_change,Set_Selected_City} from '../../../../Redux/Actions/UIActions'
import { IDataState, I_UI_State, I_DataOf_Signup_Ph_Steps } from "../../../../Interfaces/States";
import PH_Identity_Step from "./Step1_Identity";
import PH_Proof_Step from "./Step2_Proof";
import PH_Contacts_Step from "./Step3_Contacts";
import PH_Account_Step from "./Step4_Account";
const styles=(theme:Theme)=>({
    ...(theme as any).spreadCommonJoinView,
    formControl: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,
    },
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
    ph_DataOfSteps:state.UI.signUp_Stepper?.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps,
    selectedCityId:state.UI.signUp_Stepper.selectedCity
}),{On_Ph_Signup_Input_change,Set_Selected_City})(withStyles(styles)(PH_Identity_Step));

const step2=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    ph_DataOfSteps:state.UI.signUp_Stepper.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps
}),{On_Ph_Signup_Input_change})(withStyles(styles)(PH_Proof_Step));

const step3=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    ph_DataOfSteps:state.UI.signUp_Stepper?.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps
}),{On_Ph_Signup_Input_change})(withStyles(styles)(PH_Contacts_Step));

const step4=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    ph_DataOfSteps:state.UI.signUp_Stepper?.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps
}),{On_Ph_Signup_Input_change})(withStyles(styles)(PH_Account_Step));
export default {step1,step2,step3,step4}