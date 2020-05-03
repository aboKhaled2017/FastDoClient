import React, { Component } from "react";
import { TextField, Theme, withStyles, Typography } from "@material-ui/core";
interface IPropseStep{
    classes:{[key:string]:string}
}
interface IStateStep1{
    phName:string
    mngName:string
    ownName:string
    errors:any
}
interface IStateStep2{
    license:string
    commercialReg:string
    errors:any
}
interface IStateStep3{
    persPhone:string
    pharmPhone:string
    destId:string
    addressDetails:string
    errors:any
}
interface IStateStep4{
    userName:string
    password:string
    confirmPassword:string
    errors:any
}
const styles=(theme:Theme)=>({
    ...(theme as any).spreadCommonJoinView,

})
const PHInfoStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep1>{
    state={errors:{} as any,phName:'',mngName:'',ownName:''}
    render(){
        const {classes}=this.props;
        const {errors}=this.state;
        return (
            <>
             <TextField 
                        name="phName" type="text" 
                        id="phName" label="اسم الصيدلية" 
                        value={this.state.phName}
                        //onChange={this.handleChange}
                        //helperText={errors?.email}
                        //error={errors?.email?true:false}
                        fullWidth
                        className={classes.textField}/>
            <TextField 
                        name="mngName" type="text" 
                        id="mngName" label="اسم المدير للصيدلية" 
                        value={this.state.mngName}
                        /*helperText={errors?.password}
                        error={errors?.password?true:false}                        
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/> 
            <TextField 
                        name="ownName" type="text" 
                        id="ownName" label="اسم المالك للصيدلية"
                        value={this.state.ownName} 
                        /*helperText={errors?.confirmPassword}
                        error={errors?.confirmPassword?true:false}                       
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/>                          
            {errors?.general && 
            <Typography variant="body2" className={classes.customeErros}>{errors?.general}</Typography>
            } 
            </>
        )
    }
})
const PHIdentityStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep2>{
    state={errors:{} as any,license:'',commercialReg:''}
    render(){
        const {classes}=this.props;
        const {errors}=this.state;
        return (
            <>
             <TextField 
                        name="license" type="file" 
                        id="license" label="صورة الترخيص" 
                        value={this.state.license}
                        //onChange={this.handleChange}
                        //helperText={errors?.email}
                        //error={errors?.email?true:false}
                        fullWidth
                        className={classes.textField}/>
             <TextField 
                        name="commercialReg" type="file" 
                        id="commercialReg" label="صورة التسجيل التجارى" 
                        value={this.state.commercialReg}
                        /*helperText={errors?.password}
                        error={errors?.password?true:false}                       
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/>                        
            {errors?.general && 
            <Typography variant="body2" className={classes.customeErros}>{errors?.general}</Typography>
            } 
            </>
        )
    }
})
const PHContactStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep3>{
    state={errors:{} as any,persPhone:'',pharmPhone:'',addressDetails:'',destId:''}
    render(){
        const {classes}=this.props;
        const {errors}=this.state;
        return (
            <>
             <TextField 
                        name="persPhone" type="phone" 
                        id="persPhone" label="رقم تليفون محمول" 
                        value={this.state.persPhone}
                        //onChange={this.handleChange}
                        //helperText={errors?.email}
                        //error={errors?.email?true:false}
                        fullWidth
                        className={classes.textField}/>
            <TextField 
                        name="pharmPhone" type="text" 
                        id="pharmPhone" label="رقم التليفون الارضى" 
                        value={this.state.pharmPhone}
                        /*helperText={errors?.password}
                        error={errors?.password?true:false}                       
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/> 
            <TextField 
                        name="addressDetails" type="text" 
                        id="addressDetails" label="العنوان التفصيلى" 
                        value={this.state.addressDetails}
                        multiline
                        rows={3}
                        /*helperText={errors?.confirmPassword}
                        error={errors?.confirmPassword?true:false}                       
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/> 
                        
            {errors?.general && 
            <Typography variant="body2" className={classes.customeErros}>{errors?.general}</Typography>
            } 
            </>
        )
    }
})
const PHAccountStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep4>{
    state={errors:{} as any,userName:'',password:'',confirmPassword:''}
    render(){
        const {classes}=this.props;
        const {errors}=this.state;
        return (
            <>
             <TextField 
                        name="userName" type="text" 
                        id="userName" label="اسم المستخدم" 
                        value={this.state.userName}
                        //onChange={this.handleChange}
                        //helperText={errors?.email}
                        //error={errors?.email?true:false}
                        fullWidth
                        className={classes.textField}/>
            <TextField 
                        name="password" type="password" 
                        id="password" label="كلمة السر" 
                        value={this.state.password}
                        /*helperText={errors?.password}
                        error={errors?.password?true:false}                        
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/> 
            <TextField 
                        name="confirmPassword" type="password" 
                        id="confirmPassword" label="تأكيد كلمة السر" 
                        value={this.state.confirmPassword}
                        /*helperText={errors?.confirmPassword}
                        error={errors?.confirmPassword?true:false}                       
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/>                         
            {errors?.general && 
            <Typography variant="body2" className={classes.customeErros}>{errors?.general}</Typography>
            } 
            </>
        )
    }
})
export default {PHInfoStep,PHIdentityStep,PHContactStep,PHAccountStep}