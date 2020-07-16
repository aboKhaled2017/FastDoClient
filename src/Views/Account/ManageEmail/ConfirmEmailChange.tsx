import React, { Component, FormEvent, Fragment, ReactElement } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography, Box } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendRounded'
import { IConfirmEmailChangeErrors } from '../Interfaces'
import {setUserIdentity}from '../../../Redux/Actions/userActions'
import { connect } from 'react-redux'
import { IUserIdentity } from '../../../Interfaces/AccountTypes'
import axios from 'axios'
import { displayError } from '../../../Helpers/HelperJsxFunctions'
import Alert from '@material-ui/lab/Alert'
interface IProps {
    classes:{[key:string]:any}
    setUserIdentity:(userIdentity:IUserIdentity)=>void 
    handleCancel:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}
interface IState{
    newEmail:string
    code:string
    errors:IConfirmEmailChangeErrors
    loading:boolean
    isEmailChanged:boolean
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
     }
})
class ConfirmEmailChange_View extends Component<IProps, IState> {
    constructor(props:any){
       super(props);
       this.state={...this.initState};
    }
    initState={
        newEmail:'',
        errors:{
            Code:undefined,
            NewEmail:undefined,
            G:undefined
        } as IConfirmEmailChangeErrors,
        loading:false,
        code:'',
        isEmailChanged:false}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        this.setState(prev=>({...prev,loading:true}));
        axios.post('/manage/email',{newEmail:this.state.newEmail,code:this.state.code})
        .then(res=>{
        this.setState({...{},isEmailChanged:true});
        this.props.setUserIdentity(res.data);
        })
    .catch(err=>{      
      if(!err.response) 
      {
          alert("خطأ فى الاتصال بالسيرفر");
          this.setState(prev=>({...prev,loading:false}));
          return;
      }
      if(err.response.status=="404"){
        var errors=this.state.errors;
        errors.G="هذا البريد غير موجود أو الكود غير صحيح";
        this.setState(prev=>({...prev,loading:false,errors:{...errors}}));
        return;
       }
       var errorsResult=err.response.data.errors;
       this.setState(prev=>({...prev,errors:{...errorsResult},loading:false}));
    })
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let name=e.target.name,val=e.target.value;
        this.setState(prev=>({...prev,[name]:val}));
    }
    render() {
        const {classes}=this.props;
        const {errors,loading,code,isEmailChanged,newEmail}=this.state;
        return (<>
            {!isEmailChanged&&
            <Alert severity="info">
                <div>
                لقد ارسالنا كود الى بريدك الالكترونى الجديد!
                </div>
                <div>
                    من فضلك اذهب الى وقم بنسخ الكود المرسل لتأكيد التغيير
                </div>
            </Alert>        
            }
            {isEmailChanged&&
            <Alert severity="success">
                تم تغيير بريد الالكترونى بنجاح
            </Alert>        
            }
            {!isEmailChanged &&
            <Box mt={1}>
                <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                <TextField 
                        name="newEmail" type="email" 
                        variant="outlined"
                        id="newEmail" label="بريدك الالكترونى الجديد" 
                        value={this.state.newEmail}
                        onChange={this.handleChange}
                        helperText={displayError(errors.NewEmail)}
                        error={errors.NewEmail?true:false}
                        fullWidth
                        className={classes.textField}/>
                    <TextField 
                        name="code" type="text" 
                        variant="outlined"
                        id="code" label="الكود المرسل" 
                        value={this.state.code}
                        onChange={this.handleChange}
                        helperText={displayError(errors.Code)}
                        error={errors.Code?true:false}
                        fullWidth
                        className={classes.textField}/>                    
                    {errors.G && 
                    <Typography variant="body2" className={classes.customeErros}>{displayError(errors.G)}</Typography>
                    }           
                    <Box>
                        <Box display="inline-block">
                            <Button 
                                type="submit" variant="contained" 
                                disabled={loading}
                                className={classes.button} color="primary"
                                startIcon={<SendIcon className={classes.buttonIcon}/>}>
                                ارسال  
                                {loading&& <CircularProgress size={30} color="secondary" className={classes.progress}/>}
                            </Button>
                        </Box>  
                        <Box marginX={1} display="inline-block">
                            <Button 
                                variant="contained" 
                                disabled={loading}
                                onClick={this.props.handleCancel}
                                className={classes.button} color="secondary"
                                startIcon={<SendIcon className={classes.buttonIcon}/>}>
                                الغاء تغيير البريد                           
                            </Button>
                        </Box>  
                    </Box>         
                </form>
            </Box>
            }
        </>)
    }
}


export default connect(null, {setUserIdentity}) (withStyles(styles as any)(ConfirmEmailChange_View as any)) as
 (props:{handleCancel:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void})=>ReactElement;
