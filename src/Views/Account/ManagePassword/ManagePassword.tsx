import React, { Component, FormEvent } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography, Box } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SendRounded'
import { IChangePasswordErrors} from '../Interfaces'
import axios from 'axios'
import { displayError } from '../../../Helpers/HelperJsxFunctions'
import Alert from '@material-ui/lab/Alert'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    oldPassword:string
    newPassword:string
    confirmPassword:string
    errors:IChangePasswordErrors
    loading:boolean
    isSuccess:boolean
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
class ManagePassword_View extends Component<IProps, IState> {
    constructor(props:any){
        super(props);
        this.state={...this.initState}
    }
    initState = {
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        loading:false,
        isSuccess:false,
        errors:{
            OldPassword:undefined,
            NewPassword:undefined,
            ConfirmPassword:undefined,
            G:undefined
       } as IChangePasswordErrors
    }
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        this.setState(prev=>({...prev,loading:true}));
        const data={
            oldPassword:this.state.oldPassword,
            newPassword:this.state.newPassword,
            confirmPassword:this.state.confirmPassword
        }
        axios.post(`/manage/password`,data)
        .then(()=>{
          this.setState(prev=>({...this.initState,isSuccess:true}));
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
        let name=e.target.name,val=e.target.value;
        this.setState(prev=>({...prev,[name]:val}));
    }
    render() {
        const {classes}=this.props;
        const {errors,confirmPassword,newPassword,oldPassword,loading,isSuccess}=this.state;
        return (  
            <Box> 
                <Box>
                    {isSuccess&&
                    <Alert severity="success">
                        تم تغيير كلمة المرور بنجاح
                    </Alert>        
                    }
                </Box> 
                <Box mt={2}>
                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField 
                            name="oldPassword" type="password" 
                            variant="outlined"
                            id="oldPassword" label="كلمة السر الحالية" 
                            value={oldPassword}
                            onChange={this.handleChange}
                            helperText={errors.OldPassword}
                            error={errors.OldPassword?true:false}
                            fullWidth
                            className={classes.textField}/>  
                        <TextField 
                            name="newPassword" type="password" 
                            variant="outlined"
                            id="newPassword" label="كلمة السر الجديدة" 
                            value={newPassword}
                            helperText={errors.NewPassword}
                            error={errors.NewPassword?true:false}                              
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.textField}/> 
                        <TextField 
                            name="confirmPassword" type="password" 
                            variant="outlined"
                            id="confirmPassword" label="تأكيد كلمة السر "
                            value={confirmPassword} 
                            helperText={errors.ConfirmPassword}
                            error={errors.ConfirmPassword?true:false}                         
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.textField}/>                   
                        {errors.G && 
                        <Typography variant="body2" className={classes.customeErros}>{errors.G}</Typography>
                        }           
                        <Button 
                            type="submit" variant="contained" 
                            disabled={loading}
                            className={classes.button} color="primary"
                            startIcon={<SaveIcon className={classes.buttonIcon}/>}>
                        حفظ  
                        {
                        loading&&(
                            <CircularProgress size={30} color="secondary" className={classes.progress}/>
                        )
                        }
                    </Button>           
                    </form>    
                </Box>      
            </Box>
            )
    }
}
export default withStyles(styles as any)(ManagePassword_View as any);

