import React, { Component } from "react";
import { TextField, Typography} from "@material-ui/core";
import { I_UI_Errors} from '../../../../Interfaces/AccountTypes';
import {displayError} from '../../../../Helpers/HelperJsxFunctions';
import { I_DataOf_Signup_Stk_Steps } from "../../../../Interfaces/States";

interface IStep_Props{
    classes:{[key:string]:string}
    errors:I_UI_Errors  
    stk_DataOfSteps:I_DataOf_Signup_Stk_Steps
    On_Stk_Signup_Input_change:(name:string,value:any,step:number,imgName?:string)=>void    
}

class STK_Contacts_Step  extends Component<IStep_Props>{
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.props.On_Stk_Signup_Input_change(e.target.name,e.target.value,2)
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        
    }
    render(){
        const {classes}=this.props;
        const errors=this.props.errors.signUp_Errors.Stk_SignUp_Errors.Step3_Errors;
        const {address,linePhone,persPhone}=this.props.stk_DataOfSteps.step3;
        return (
            <>
             <TextField 
                        name="persPhone" type="phone" 
                        id="persPhone" label="رقم تليفون محمول" 
                        value={persPhone}
                        onChange={this.handleChange}
                        helperText={displayError(errors.PersPhone)}
                        error={errors.PersPhone?true:false}
                        fullWidth
                        className={classes.textField}/>
            <TextField 
                        name="linePhone" type="text" 
                        id="linePhone" label="رقم التليفون الارضى" 
                        value={linePhone}
                        helperText={displayError(errors.LinePhone)}
                        error={errors.LinePhone?true:false}                       
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}/> 
            <TextField 
                        name="address" type="text" 
                        id="address" label="العنوان التفصيلى" 
                        value={address}
                        multiline
                        rows={3}
                        helperText={displayError(errors.Address)}
                        error={errors.Address?true:false}                       
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}/> 
                        
            {errors.G && 
            <Typography variant="body2" className={classes.customeErros}>{errors.G}</Typography>
            } 
            </>
        )
    }
}
export default STK_Contacts_Step;