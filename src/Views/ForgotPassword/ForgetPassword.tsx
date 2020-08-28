import React, { useState } from 'react';
import { IForgotPassword_Errors } from './Interfaces';
import ResetPassword_View from './ResetPassword'
import { Box, Button, Theme, Backdrop, CircularProgress, makeStyles, createStyles, TextField, Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOpenIcon from '@material-ui/icons/LockOpenRounded'
import axios from 'axios'
import { displayError } from '../../Helpers/HelperJsxFunctions';
import { TermQuery, FilterBasedAccessor } from 'searchkit';
interface IStatus{
    loading:boolean 
    openBackDrop:boolean
    email:string
    isSent:boolean
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainView:{
            margin:'auto',
            textAlign:'center',
            [`${theme.breakpoints.only('sm')}`]:{
                width:'80%',
            },
            [`${theme.breakpoints.down('xs')}`]:{
                width:'95%',
            }
        },
        forgotPassordView:{

        },
        pageTitle:{
            margin:'10px auto 10px auto'
        },
        icon:{
            margin:'20px auto 20px auto',
            fontSize:100
        },
        textField:{
        margin:'10px auto 10px auto',
       '& input':{
        background:'transparent !important'
       }
        },
        customeErros:{
        marginTop:20,
        color:'red',
        fontSize:'0.8rem'
        },
        resetPasswordView:{},
        backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        },
    }),
);
function ForgetPasswordView(){
    const classes=useStyles();
    const [errors,setErrors]=useState<IForgotPassword_Errors>({
        Email:undefined,
        G:undefined
    });
    const [openAlertForSendAgain,setOpenAlertForSendAgain]=useState(false);
    const [status,setStatus]=useState<IStatus>({
       loading:true,openBackDrop:false,email:'',isSent:false
    });
    const handleClick=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
         setStatus({...status,loading:true,openBackDrop:true});
         axios.post(`/auth/forgotpassword`,{Email:status.email})
        .then(()=>{
         setStatus({...status,loading:false,openBackDrop:false,isSent:true});
         /*setTimeout(() => {
            setStatus({...status,openBackDrop:false});
         }, 2000);*/
        })
        .catch(err=>{
        if(!err.response) 
        {
            setStatus({...status,loading:false});
            alert(`خطأ فى الاتصال بالسيرفر`);
            return;
        }
        setStatus({...status,loading:false,openBackDrop:false});
       var errorsResult=err.response.data.errors;
        setErrors({...errorsResult});
       });
    }
    const handleSendCodeAgain=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        setStatus({...status,openBackDrop:true});       
        axios.post(`/auth/forgotpassword`,{Email:status.email})
       .then(()=>{
        setStatus({...status,openBackDrop:false});
        setOpenAlertForSendAgain(true);
        setTimeout(() => {
            setOpenAlertForSendAgain(false);
        },5000);
       })
       .catch(err=>{
       if(!err.response) 
       {
           setStatus({...status,openBackDrop:false});
           alert(`خطأ فى الاتصال بالسيرفر`);
           return;
       }
       setStatus({...status,openBackDrop:false});
      var errorsResult=err.response.data.errors;
       setErrors({...errorsResult});
      });
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{  
        setStatus({...status,email:e.target.value})
    }
    return (
        <Grid container className={classes.mainView}>
            <Grid item md/>
                <Grid item xs={12} md>
                    <LockOpenIcon className={classes.icon} color="primary" fontSize="large"/>
                    <Typography color="primary" variant="h6" className={classes.pageTitle}>استرجاع كلمة السر</Typography>
                    <Box>
                        <Box className={classes.forgotPassordView}>
                                <Backdrop className={classes.backdrop} open={status.openBackDrop} onClick={
                                            ()=>{setStatus({...status,openBackDrop:false})}}>
                                        <CircularProgress color="inherit" />
                                </Backdrop>
                                 <Alert severity="info" color="info">
                                    يمكنك استرجاع كلمة السر عن طريق تغيير كلمة السر <br/>
                                    سنقوم بارسال كود الى بريدك الالكترونى الذى سجلت به من قبل <br/>
                                    هذا الكود يساعدك على اعادة ضبط كلمة السر مرة اخرى
                                 </Alert>
                                {!status.isSent&&
                                <Box mt={2}>
                                    <Box mb={1}>
                                            <TextField 
                                                name="email" 
                                                type="email" 
                                                id="email"
                                                label="ادخل بريدك الالكترونى الذى سجلت به لدينا هنا" 
                                                value={status.email}
                                                helperText={displayError(errors.Email)}
                                                error={errors.Email?true:false}                              
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                className={classes.textField}
                                            />
                                    </Box>
                                    <Box>         
                                        {errors.G  && <Typography variant="body2" className={classes.customeErros}>
                                            {displayError(errors.G)}
                                        </Typography>}
                                    </Box>
                                    <Button variant="contained" color="primary" onClick={handleClick}>ارسل الكود</Button>
                                </Box> 
                                }
                                {status.isSent&& 
                                <Box mt={2}>
                                    <div>لم استلم اى كود على بريدى الالكترونى</div>
                                    <Button variant="text" color="primary" onClick={handleSendCodeAgain}>
                                            ارسل الكود مرة اخرى الى {status.email}
                                    </Button>
                                    {openAlertForSendAgain && 
                                    <Alert severity="success" variant="filled">
                                         تم ارسال الكود مرة اخرى الى بريدك الالكترونى
                                    </Alert>
                                    }
                                </Box>
                                }                               
                        </Box>
                        {status.isSent&& 
                        <Box mt={1} className={classes.resetPasswordView}>
                            <ResetPassword_View email={status.email}/>
                        </Box>
                        }
                    </Box>
                </Grid>
            <Grid item md/>
        </Grid>);
}
export default ForgetPasswordView as any;