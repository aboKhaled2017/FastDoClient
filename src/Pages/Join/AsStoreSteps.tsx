import React, { Component } from "react";
import { TextField, Theme, withStyles, Typography } from "@material-ui/core";
interface IPropseStep{
    classes:{[key:string]:string}
}
interface IStateStep1{
    sName:string
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
    sPhone:string
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
const SInfoStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep1>{
    state={errors:{} as any,sName:'',mngName:'',ownName:''}
    render(){
        const {classes}=this.props;
        const {errors}=this.state;
        return (
            <>
             <TextField 
                        name="sName" type="text" 
                        id="sName" label="اسم المخزن" 
                        value={this.state.sName}
                        //onChange={this.handleChange}
                        //helperText={errors?.email}
                        //error={errors?.email?true:false}
                        fullWidth
                        className={classes.textField}/>
            <TextField 
                        name="mngName" type="text" 
                        id="mngName" label="اسم المدير للمخزن" 
                        value={this.state.mngName}
                        /*helperText={errors?.password}
                        error={errors?.password?true:false}                        
                        onChange={this.handleChange}*/
                        fullWidth
                        className={classes.textField}/> 
            <TextField 
                        name="ownName" type="text" 
                        id="ownName" label="اسم المالك للمخزن"
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
const SIdentityStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep2>{
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
const SContactStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep3>{
    state={errors:{} as any,persPhone:'',sPhone:'',addressDetails:'',destId:''}
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
                        name="sPhone" type="text" 
                        id="sPhone" label="رقم التليفون الارضى" 
                        value={this.state.sPhone}
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
const SAccountStep=withStyles(styles)(class  extends Component<IPropseStep,IStateStep4>{
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
export default {SInfoStep,SIdentityStep,SContactStep,SAccountStep}