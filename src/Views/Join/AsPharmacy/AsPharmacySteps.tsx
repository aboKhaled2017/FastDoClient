import React, { Component, createRef } from "react";
import { TextField, Theme, withStyles, Typography, FormControl, InputLabel, MenuItem, Select, FormHelperText, Grid, Box, Button } from "@material-ui/core";
import {
    IPh_Signup_Step1,IPh_Signup_Step2,IPh_Signup_Step3,IPh_Signup_Step4,
    IPh_Signup_Step1_Error,IPh_Signup_Step2_Error,IPh_Signup_Step3_Error,IPh_Signup_Step4_Error, I_UI_Errors} from '../../../Interfaces/AccountTypes';
import { IDataState, I_UI_State, I_DataOf_Signup_Ph_Steps } from "../../../Interfaces/States";
import { ISelectInputChange } from "../../../Interfaces/EventTypes";
import { connect } from "react-redux";
import {On_Ph_Signup_Input_change,Set_Selected_City} from '../../../Redux/Actions/UIActions'
import ImageUploadIcon from '@material-ui/icons/ImageRounded'
import ImageUploader from 'react-images-upload';
import { RegImageType } from "../../../Interfaces/DataTypes";
import {displayError} from '../../../Helpers/HelperJsxFunctions'
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
const PH_Identity_Step=withStyles(styles)(class  extends Component<IStep1_Props>{
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
})

const PH_Proof_Step=withStyles(styles)(class  extends Component<IStep_Props>{
    private _upload_lincenseImg_btn:React.RefObject<HTMLInputElement>
    private _upload_commertialImg_btn:React.RefObject<HTMLInputElement>

    private licenseImgPreview:React.RefObject<HTMLImageElement>
    private commertialImgPreview:React.RefObject<HTMLImageElement>
    constructor(props:any){
       super(props)
       this._upload_lincenseImg_btn=createRef()
       this._upload_commertialImg_btn=createRef()
       this.licenseImgPreview=createRef()
       this.commertialImgPreview=createRef()
    }
    licenseRef=createRef<HTMLImageElement>()
    commertialRegImgRef=createRef<HTMLImageElement>()
    getImgUrlFromFile(file:File,onLoad:(src:string)=>void){
        var reader=new FileReader();
        reader.onload=(e)=>{
            onLoad(e.target?.result as string);
        }
        reader.readAsDataURL(file);
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>,type:RegImageType)=>{
        var target=e.target as EventTarget&HTMLInputElement;
        if(!target || !target.files) return;
        var file=target.files[0];
        if(!file)return;
        var name="";
        this.getImgUrlFromFile(file,src=>{
            if(type==RegImageType.license){
                name="licenseImg";
              (this.licenseImgPreview.current as HTMLImageElement).src=src;
            }
            else{
                name="commerialRegImg";
                (this.commertialImgPreview.current as HTMLImageElement).src=src;
            }
            this.props.On_Ph_Signup_Input_change(name,file,1,file.name);
        })
        
        
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();       
    }
    handleImgUpload=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>,type:RegImageType)=>{
        if(type==RegImageType.license)
        this._upload_lincenseImg_btn.current?.click()
        else 
        this._upload_commertialImg_btn.current?.click()
    }
    componentDidMount(){
        const {data}=this.props.ph_DataOfSteps.step2;
        if(data.get('licenseImg')){
            this.getImgUrlFromFile(data.get('licenseImg') as File,src=>{
                (this.licenseImgPreview.current as  HTMLImageElement).src=src;
            });
        }
        if(data.get('commerialRegImg')){
            this.getImgUrlFromFile(data.get('commerialRegImg') as File,src=>{
                (this.commertialImgPreview.current as HTMLImageElement).src=src;
            });
        }
    }
    render(){
        const {classes}=this.props;
        const errors=this.props.errors.signUp_Errors?.Ph_SignUp_Errors?.Step2_Errors;
        const {data}=this.props.ph_DataOfSteps.step2;
        
        return (
            <Box>         
                <Box mb={2}>
                    <Box>
                        <input accept="image/*" 
                               hidden type="file" 
                               ref={this._upload_lincenseImg_btn} 
                               onChange={e=>this.handleChange(e,RegImageType.license)}/>
                        <Button name="btn1" variant="contained" color="primary" 
                                onClick={e=>this.handleImgUpload(e,RegImageType.license)}
                                className={classes.afterWelocmGridButton}                               
                                endIcon={
                                    <ImageUploadIcon className={classes.ImgUploadIcon}/>
                                }>ارفع  ملف صورة الترخيص 
                        </Button>
                        {errors.LicenseImg && 
                        <Typography variant="body2" className={classes.customeErros}>{displayError(errors.LicenseImg)}</Typography>
                        } 
                    </Box>
                    <Box className={classes.imgBox}>
                        <div>                            
                            <img ref={this.licenseImgPreview} alt=" صورة الترخيص"/>
                        </div>                     
                    </Box> 
                </Box>
                <Box mb={2}>    
                    <Box>
                    <input accept="image/*" 
                           hidden type="file" 
                           ref={this._upload_commertialImg_btn} 
                           onChange={e=>this.handleChange(e,RegImageType.commercialReg)}/>
                        <Button variant="contained" color="primary" name="btn2" 
                                onClick={e=>this.handleImgUpload(e,RegImageType.commercialReg)}
                                className={classes.afterWelocmGridButton}                               
                                endIcon={
                                    <ImageUploadIcon className={classes.ImgUploadIcon}/>
                                }>ارفع ملف صورة السجيل التجارى
                        </Button>
                        {errors.CommerialRegImg && 
                        <Typography variant="body2" className={classes.customeErros}>{displayError(errors.CommerialRegImg)}</Typography>
                        }
                    </Box>
                    <Box className={classes.imgBox}>
                        <div>
                           <img ref={this.commertialImgPreview} alt=" صورة التسجيل التجارى"/>
                        </div>                        
                    </Box> 
                </Box>
                <Box>    
                {errors.G && 
                <Typography variant="body2" className={classes.customeErros}>{errors.G}</Typography>
                } 
                </Box>
            </Box>   
        )
    }
})

const PH_Contacts_Step=withStyles(styles)(class  extends Component<IStep_Props>{
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.props.On_Ph_Signup_Input_change(e.target.name,e.target.value,2)
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        
    }
    render(){
        const {classes}=this.props;
        const errors=this.props.errors.signUp_Errors.Ph_SignUp_Errors.Step3_Errors;
        const {address,linePhone,persPhone}=this.props.ph_DataOfSteps.step3;
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
})

const PH_Account_Step=withStyles(styles)(class  extends Component<IStep_Props>{
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
})

const step1=connect((state:{data:IDataState,UI:I_UI_State}) => ({
    data:state.data,
    errors:state.UI.errors,
    ph_DataOfSteps:state.UI.signUp_Stepper?.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps,
    selectedCityId:state.UI.signUp_Stepper.selectedCity
}),{On_Ph_Signup_Input_change,Set_Selected_City})(PH_Identity_Step as any);

const step2=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    ph_DataOfSteps:state.UI.signUp_Stepper.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps
}),{On_Ph_Signup_Input_change})(PH_Proof_Step as any);

const step3=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    ph_DataOfSteps:state.UI.signUp_Stepper?.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps
}),{On_Ph_Signup_Input_change})(PH_Contacts_Step as any);

const step4=connect((state:{UI:I_UI_State}) => ({
    errors:state.UI.errors,
    ph_DataOfSteps:state.UI.signUp_Stepper?.ph_DataOfSteps as I_DataOf_Signup_Ph_Steps
}),{On_Ph_Signup_Input_change})(PH_Account_Step as any);
export default {step1,step2,step3,step4}