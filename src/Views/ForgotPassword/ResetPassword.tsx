import React, { Component, FormEvent, ReactElement, Ref, createRef } from 'react'
import { Grid, Typography, TextField, Button, CircularProgress, Theme,
         withStyles,  
         Divider,
         Box,
         Backdrop} from '@material-ui/core'
import PaswordIcon from '@material-ui/icons/LockOpenRounded'
import {displayError} from '../../Helpers/HelperJsxFunctions'
import axios from 'axios'
import { IResetPassword_Errors } from './Interfaces'
import Alert from '@material-ui/lab/Alert'
import { createHistoryInstance } from 'searchkit'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    code:string
    newPassword:string
    errors:IResetPassword_Errors
    loading:boolean 
    isSuccess:boolean
    [key:string]:any
}
const styles=(theme:Theme)=>({
    ...(theme as any).spreadCommonJoinView,
      pageTitle:{
       margin:'10px auto 10px auto'
     },
     textField:{
       margin:'10px auto 10px auto',
       '& input':{
        background:'transparent !important'
       }
     },
     button:{
       margin:theme.spacing(3,'auto',1.5,'auto'),
       position:'relative'
     },
     customeErros:{
       marginTop:20,
       color:'red',
       fontSize:'0.8rem'
     },
     alert:{
      border: '2px dashed rgb(30, 70, 32)',
      padding: 2
     },
     progress:{
       position:'absolute',
     },
     backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
        
})
const ForgotPassword_View= withStyles(styles as any)(class extends Component<IProps&{email:string},IState> {
    constructor(props:any){
      super(props);
      this.state={...this.initState};
    }
    initState:IState={
      code:'',
      newPassword:'',
      loading:false,
      isSuccess:false,
      errors:{
        Code:undefined,
        Email:undefined,
        G:undefined
      }
    }
    browserHistory=createHistoryInstance()
    handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const resetData={
          email:this.props.email,
          code:this.state.code,
          newPassword:this.state.newPassword,
        };
        this.setState(prev=>({...prev,loading:true}));
         axios.post(`/auth/resetpassword`,resetData)
        .then(()=>{
          this.setState(prev=>({...this.initState,isSuccess:true}));
          setTimeout(() => {
            this.setState(prev=>({...prev,isSuccess:false}));
            this.browserHistory.goBack();
          }, 5000);
        })
        .catch(err=>{
        if(!err.response) 
        {
          this.setState(prev=>({...prev,loading:false}));
            alert(`خطأ فى الاتصال بالسيرفر`);
            return;
        }
        var errorsResult=err.response.data.errors;
        this.setState(prev=>({...prev,loading:false,errors:{...errorsResult}})); 
       });
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      let val=e.target.value,name=e.target.name;
         this.setState({[name]:val});
    }
    render() {
        const {classes,email}=this.props;
        const {newPassword,errors,loading,code,isSuccess}=this.state;
        return (
            <Box>  
                    <Backdrop className={classes.backdrop} open={isSuccess} onClick={
                                            ()=>{this.setState(prev=>({...prev,isSuccess:false}));}}>
                        <Alert severity="success">
                              لقد تم تغيير كلمة السر بنجاح ,سوف يتم تحويلك الى صفحة الدخول خلال 5 ثوانى
                        </Alert>
                    </Backdrop>
                    <Box my={1}>
                       <Divider orientation="horizontal" variant="fullWidth" />
                    </Box>           
                    <Alert severity="success" className={classes.alert}>
                      لقد ارسلنا كود الاسترجاع الى بريدك اللكترونى 
                    </Alert>
                    <Box>
                      {errors.G && 
                      <Typography variant="body2" className={classes.customeErros}>{displayError(errors.G)}</Typography>
                      }
                      {errors.Email && 
                      <Typography variant="body2" className={classes.customeErros}>{displayError(errors.Email)}</Typography>
                      } 
                    </Box>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                                name="newPassword" type="password" 
                                id="newPassword" label="كلمة السر الجديدة" 
                                value={this.state.newPassword}
                                onChange={this.handleChange}
                                helperText={displayError(errors.NewPassword)}
                                error={errors.NewPassword?true:false}
                                fullWidth
                                className={classes.textField}/>
                    <TextField 
                                name="code" type="text" 
                                id="code" label="الكود المرسل" 
                                value={this.state.code}
                                helperText={displayError(errors.Code)}
                                error={errors.Code?true:false}                              
                                onChange={this.handleChange}
                                fullWidth
                                className={classes.textField}/>                                                                                       
                    <Button 
                            type="submit" variant="contained" 
                            disabled={loading}
                            className={classes.button} color="primary">
                        ارسال 
                        {
                        loading&&(
                            <CircularProgress size={30} color="secondary" className={classes.progress}/>
                        )
                        }
                    </Button>            
                    </form>
            </Box>
        )
    }
})
export default ForgotPassword_View as (props:{email:string})=>ReactElement;