import React, { Component, FormEvent, Fragment } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography, Box } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendRounded'
import { IChangeEmailErrors } from '../Interfaces'
import { IUserIdentity } from '../../../Interfaces/AccountTypes'
import axios from 'axios'
import { displayError } from '../../../Helpers/HelperJsxFunctions'
import ConfirmEmailChange_View from './ConfirmEmailChange'
interface IProps {
    classes:{[key:string]:any}
    setUserIdentity:(userIdentity:IUserIdentity)=>void 
}
interface IState{
    newEmail:string
    errors:IChangeEmailErrors
    loading:boolean
    conifrmView_IsShown:boolean
    cancel:boolean
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
class ChangeEmail_View extends Component<IProps, IState> {
    constructor(props:any){
        super(props);
        this.state={...this.initState}
    }
    initState={
        newEmail:'',
        errors:{
            NewEmail:undefined,
            G:undefined}as IChangeEmailErrors,
        loading:false,
        conifrmView_IsShown:false,
        cancel:false
    }    
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        this.setState(prev=>({...prev,loading:true}));
        axios.get(`/manage/email?newEmail=${this.state.newEmail}`)
        .then(res=>{
        this.setState(prev=>({...this.initState,conifrmView_IsShown:true,cancel:false}));
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
    handleCancel=(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
       this.setState(prev=>({...prev,cancel:true,conifrmView_IsShown:false}))
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let val=e.target.value;
        this.setState(prev=>({...prev,newEmail:val}));
    }
    render() {
        const {classes}=this.props;
        const {loading,errors,conifrmView_IsShown,newEmail,cancel}=this.state;
        return (          
            <Box>                
                {!conifrmView_IsShown &&
                <Box>
                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField 
                            name="newEmail" type="email" 
                            variant="outlined"
                            id="newEmail" label="البريد الالكرونى الجديد" 
                            value={newEmail}
                            onChange={this.handleChange}
                            helperText={displayError(errors.NewEmail)}
                            error={errors.NewEmail?true:false}
                            fullWidth
                            className={classes.textField}/>                     
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
                        ارسال  
                        {
                        loading&&(
                            <CircularProgress size={30} color="secondary" className={classes.progress}/>
                        )
                        }
                    </Button>           
                    </form>
                </Box>
                }
                {!cancel &&
                <Box mt={3}>
                   {conifrmView_IsShown &&  <ConfirmEmailChange_View handleCancel={this.handleCancel}/>}
                </Box>
                }
            </Box>
        )
    }
}
export default withStyles(styles as any)(ChangeEmail_View) as any;

