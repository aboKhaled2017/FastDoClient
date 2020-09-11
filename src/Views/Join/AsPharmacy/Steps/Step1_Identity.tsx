import React, { Component, Fragment } from "react";
import { TextField, Typography, FormControl, InputLabel, MenuItem, Select, FormHelperText, Grid, Box, Button, CircularProgress } from "@material-ui/core";
import {
    IPh_Signup_Step1, I_UI_Errors} from '../../../../Interfaces/AccountTypes';
import { IDataState, I_DataOf_Signup_Ph_Steps } from "../../../../Interfaces/States";
import { ISelectInputChange } from "../../../../Interfaces/EventTypes";
import {displayError} from '../../../../Helpers/HelperJsxFunctions'
import store from "../../../../Redux/store";

interface IStep_Props{
    classes:{[key:string]:string}
    errors:I_UI_Errors  
    ph_DataOfSteps:I_DataOf_Signup_Ph_Steps
    On_Ph_Signup_Input_change:(name:string,value:any,step:number,imgName?:string)=>void    
}
interface IStep1_Props extends IStep_Props{
    data:IDataState
    Set_Selected_City:(id:number)=>void
    selectedCityId:number
}
interface IStep1_State extends IPh_Signup_Step1{
    selectedCityId:number
    [key:string]:string|number
}

class PH_Identity_Step extends Component<IStep1_Props>{    
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.props.On_Ph_Signup_Input_change(e.target.name,e.target.value,0)
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
       
    }
    handleSelectCityChange:ISelectInputChange=(e,child)=>{
      this.props.On_Ph_Signup_Input_change(e.target.name as string,e.target.value,0)
      this.props.Set_Selected_City(e.target.value as number)
    }
    handleSelectDestrictChange:ISelectInputChange=(e,child)=>{
        this.props.On_Ph_Signup_Input_change(e.target.name as string,e.target.value,0)
    }
    render(){
        const {classes,selectedCityId,data:{loading:loadingData,areas:{cities,destricts}}}=this.props;
        const errors=this.props.errors.signUp_Errors.Ph_SignUp_Errors.Step1_Errors;
        const {areaId,cityId,ownerName,mgrName,name}=this.props.ph_DataOfSteps.step1;
        const loadingInitialFormData:boolean=store.getState().data.loading;
        return(
            <>
             <TextField 
                        name="name" type="text" 
                        id="name" label="اسم الصيدلية" 
                        value={name}
                        onChange={this.handleChange}
                        helperText={displayError(errors?.Name)}
                        error={errors.Name?true:false}
                        fullWidth
                        className={classes.textField}/>
            <TextField 
                        name="mgrName" type="text" 
                        id="mgrName" label="اسم المدير للصيدلية" 
                        value={mgrName}
                        helperText={displayError(errors?.MgrName)}
                        error={errors?.MgrName?true:false}                        
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}/> 
            <TextField 
                        name="ownerName" type="text" 
                        id="ownerName" label="اسم المالك للصيدلية"
                        value={ownerName} 
                        helperText={displayError(errors?.OwnerName)}
                        error={errors?.OwnerName?true:false}                       
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}/>   
            <FormControl className={classes.formControl}>
                <InputLabel id="CityIdSelect" 
                            className={classes.inputLabel}>
                                اختر المحافظة/المدينة
                </InputLabel>       
                <Select
                    variant="outlined"
                    id="citySelect"   
                    name="cityId"                                         
                    //open={open}
                    //onClose={handleClose}
                    //onOpen={handleOpen}
                    value={cityId}
                    fullWidth
                    onChange={this.handleSelectCityChange}
                    >
                    {loadingInitialFormData && <MenuItem disabled>
                        تحميل البيانات ... 
                        <CircularProgress size={20}
                                          color="secondary" 
                                          style={{marginRight:100}}
                                          className={classes.progress}/>
                        </MenuItem>
                    }
                    {cities.map((item,i)=>(
                        <MenuItem  className={classes.menuItem} key={i} value={item.id}>{item.name}</MenuItem>
                    ))}              
                </Select>
                <FormHelperText className={classes.formHelperText}>{displayError(errors?.CityId)}</FormHelperText>
            </FormControl> 
            <FormControl className={classes.formControl}>
                <InputLabel id="DestrictIdSelect" 
                            className={classes.inputLabel}>
                                اختر المركز
                </InputLabel>       
                <Select
                    variant="outlined"
                    id="destrictSelect"   
                    name="areaId"                                     
                    //open={open}
                    //onClose={handleClose}
                    //onOpen={handleOpen}
                    value={areaId}
                    onChange={this.handleSelectDestrictChange}
                    >
                    {destricts.filter(des=>des.superAreaId==selectedCityId).map((item,i)=>(
                        <MenuItem  className={classes.menuItem} key={i} value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
                <FormHelperText className={classes.formHelperText}>{displayError(errors?.AreaId)}</FormHelperText>
            </FormControl>                                      
            {displayError(errors?.G) && 
            <Typography variant="body2" className={classes.customeErros}>{errors?.G}</Typography>
            } 
            </>
        )
    }
}
export default PH_Identity_Step;