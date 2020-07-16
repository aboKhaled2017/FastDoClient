import React, { Component } from "react";
import { TextField, Typography, Box, } from "@material-ui/core";
import {I_UI_Errors} from '../../../../Interfaces/AccountTypes';
import { I_DataOf_Signup_Ph_Steps } from "../../../../Interfaces/States";
import {displayError} from '../../../../Helpers/HelperJsxFunctions'

interface IStep_Props{
    classes:{[key:string]:string}
    errors:I_UI_Errors  
    ph_DataOfSteps:I_DataOf_Signup_Ph_Steps
    On_Ph_Signup_Input_change:(name:string,value:any,step:number,imgName?:string)=>void    
}
class PH_Account_Step extends Component<IStep_Props>{
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.props.On_Ph_Signup_Input_change(e.target.name,e.target.value,3)
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        
    }
    render(){
        const {classes}=this.props;
        const errors=this.props.errors.signUp_Errors?.Ph_SignUp_Errors?.Step4_Errors;
        const {email,password,confirmPassword}=this.props.ph_DataOfSteps.step4;
        const allErrors=this.props.errors.signUp_Errors.Ph_SignUp_Errors.All_Form_Errors;
        return (
            <>
            <Box>
                {allErrors.Name && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.Name)}</Typography>
                }
                {allErrors.MgrName && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.MgrName)}</Typography>
                }
                {allErrors.OwnerName && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.OwnerName)}</Typography>
                }
                {allErrors.CityId && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.CityId)}</Typography>
                }
                {allErrors.AreaId && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.AreaId)}</Typography>
                }
                {allErrors.LicenseImg && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.LicenseImg)}</Typography>
                }
                {allErrors.CommerialRegImg && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.CommerialRegImg)}</Typography>
                }
                {allErrors.Address && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.Address)}</Typography>
                }
                {allErrors.PersPhone && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.PersPhone)}</Typography>
                }
                {allErrors.LinePhone && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.LinePhone)}</Typography>
                }
                {allErrors.Email && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.Email)}</Typography>
                }
                {allErrors.Password && 
                <Typography variant="body2" className={classes.customeErros}>{displayError(allErrors.Password)}</Typography>
                }
                {allErrors.G && 
                <Typography variant="body2" className={classes.customeErros}>{allErrors.G}</Typography>
                }
            </Box>
             <TextField 
                        name="email" type="text" 
                        id="email" label="البريد الالكترونى" 
                        value={email}
                        onChange={this.handleChange}
                        helperText={displayError(errors.Email)}
                        error={errors.Email?true:false}
                        fullWidth
                        className={classes.textField}/>
            <TextField 
                        name="password" type="password" 
                        id="password" label="كلمة السر" 
                        value={password}
                        helperText={displayError(errors.Password)}
                        error={errors.Password?true:false}                        
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}/> 
            <TextField 
                        name="confirmPassword" type="password" 
                        id="confirmPassword" label="تأكيد كلمة السر" 
                        value={confirmPassword}
                        helperText={displayError(errors.ConfirmPassword)}
                        error={errors.ConfirmPassword?true:false}                       
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
export default PH_Account_Step;