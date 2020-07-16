import React, { Component, FormEvent, Fragment, useState } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography, Box, Backdrop } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendRounded'
import { IChangeEmailErrors, IConfirmEmailErrors } from '../Interfaces'
import { IUserIdentity, ICurrentUserIdentifier } from '../../../Interfaces/AccountTypes'
import axios from 'axios'
import { displayError } from '../../../Helpers/HelperJsxFunctions'
import {setUserIdentity} from '../../../Redux/Actions/userActions'
import { IUserState } from '../../../Interfaces/States'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { clone } from '../../../Helpers/HelperArrayFuncs'
import classes from '*.module.css'
interface IProps {
    classes:{[key:string]:any}
    setUserIdentity:(userIdentity:IUserIdentity)=>void 
    userIdentity:IUserIdentity
}
interface IState{
    code:string
    errors:IConfirmEmailErrors
    loading:boolean
    isSuccess:boolean
    OpenAletr:boolean
}

const styles=(theme:Theme)=>({
     form:{
         margin:theme.spacing(3),
     },
     textField:{
       margin:'10px auto 10px auto',     
       background:'#fff',
       borderColor:'#f00' ,
     },
     button:{
       margin:theme.spacing(3,'auto',1.5,'auto'),
       position:'relative'
     },
     buttonIcon:{
         marginLeft:12
     },
     customeErros:{
       marginTop:20,
       color:'red',
       fontSize:'0.8rem'
     },
     progress:{
       position:'absolute',
     },
     backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
        
})
class ConfirmEmail_View extends Component<IProps, IState> {
    constructor(props:any){
        super(props);
        this.state={...this.initState}
    }
    initState={
        code:'',
        errors:{
            Email:undefined,
            Code:undefined,
            G:undefined}as IChangeEmailErrors,
        loading:false,
        isSuccess:false,
        OpenAletr:false
    }    
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        this.setState(prev=>({...prev,loading:true}));
        let data={
            email:this.props.userIdentity.user.email,
            code:this.state.code
        }
        axios.post(`/auth/confirmemail`,data)
        .then(res=>{
          this.setState(prev=>({...this.initState,isSuccess:true,OpenAletr:true}));
          var identity=clone(this.props.userIdentity) as IUserIdentity;
          identity.user.emailConfirmed=true;
         setTimeout(() => {
            this.props.setUserIdentity({...identity});
         }, 1200);
        })
        .catch(err=>{
        if(!err.response) 
        {
            alert("خطأ فى الاتصال بالسيرفر");
            this.setState(prev=>({...prev,loading:false}));
            return;
        }
       var errorsResult=err.response.data.errors;
       this.setState(prev=>({...prev,errors:{...errorsResult},loading:false}));
    });
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let val=e.target.value;
        this.setState(prev=>({...prev,code:val}));
    }
    render() {
        const {classes,userIdentity:{user}}=this.props;
        const {loading,errors,code,isSuccess,OpenAletr}=this.state;
        return (  
            <Box>
                <Backdrop className={classes.backdrop}
                          open={OpenAletr} 
                          onClick={()=>{this.setState(p=>({...p,OpenAletr:false}))}}>
                    <Alert severity="success">تم تأكيد بريدك الالكترونى</Alert>
                </Backdrop>
                {!isSuccess&&
                <Box>
                   <SendCodeMeAgain email={user.email}/>
                </Box>}               
                {!isSuccess&&
                <Box>              
                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField 
                            name="code" type="text" 
                            variant="outlined"
                            id="code" label="كود  تفعيل البريد الالكترونى" 
                            value={code}
                            onChange={this.handleChange}
                            helperText={displayError(errors.Code)}
                            error={errors.Code?true:false}
                            fullWidth
                            className={classes.textField}/>    
                        {errors.Email && 
                        <Typography variant="body2" className={classes.customeErros}>
                            {displayError(errors.Email)}
                        </Typography>
                        }                  
                        {errors.G && 
                        <Typography variant="body2" className={classes.customeErros}>
                            {displayError(errors.G)}
                        </Typography>
                        }           
                        <Button 
                            type="submit" variant="contained" 
                            disabled={loading}
                            className={classes.button} color="primary"
                            startIcon={<SendIcon className={classes.buttonIcon}/>}>
                            تأكيد  
                            {
                            loading&&(
                                <CircularProgress size={30} color="secondary" className={classes.progress}/>
                            )
                            }
                        </Button>           
                    </form>
                </Box>}            
            </Box>  
        )
    }
}
function SendCodeMeAgain(props:{email:string}){
    const {email}=props;
    const [resMessg,setResMessg]=useState('');
    const [loading,setLoading]=useState(false);
    const handleClick=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        setLoading(true);
        setResMessg('');
        axios.get(`/auth/SendMeEmailConfirmCodeAgain?email=${email}`)
        .then(res=>{
         setLoading(false);
         setResMessg(`تم ارسال كود التفعيل الى  ${email}`);
        })
        .catch(err=>{
        if(!err.response) 
        {
            setLoading(false);
            setResMessg(`خطأ فى الاتصال بالسيرفر`);
            return;
        }
        setLoading(false);
       var errorsResult=err.response.data.errors;
       setResMessg(`لايمكن ارسال الكود الان ,حاول فى مرة لاحقة`);
       });
    }
    return (<>
       <Box>
           <span>لم يصلنى كود التفعيل </span>
           <Button variant="text" color="primary" onClick={handleClick}>
               ارسل مرة اخرى
               {
                loading&&(
                    <CircularProgress size={30} color="secondary" style={{position:'absolute'}}/>
                )
                }
           </Button>
       </Box>
       <Box mt={1}>           
           {resMessg&& <Alert severity="warning">{resMessg}</Alert>}
       </Box>
    </>);
}

export default connect((state:{user:IUserState})=>({
    userIdentity:state.user.userIdentity
}), {setUserIdentity})(withStyles(styles as any)(ConfirmEmail_View) as any)

