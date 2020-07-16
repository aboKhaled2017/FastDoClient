import React, { Component, FormEvent, Fragment } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography, Box, Backdrop } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendRounded'
import { IChangePhoneErrors } from '../Interfaces'
import { IUserIdentity } from '../../../Interfaces/AccountTypes'
import axios from 'axios'
import { displayError } from '../../../Helpers/HelperJsxFunctions'
import { connect } from 'react-redux'
import { IUserState } from '../../../Interfaces/States'
import {setUserIdentity} from '../../../Redux/Actions/userActions'
import Alert from '@material-ui/lab/Alert'
interface IProps {
    classes:{[key:string]:any}
    setUserIdentity:(userIdentity:IUserIdentity)=>void 
}
interface IState{
    newPhone:string
    errors:IChangePhoneErrors
    loading:boolean
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
    }
})
class ChangePhone_View extends Component<IProps, IState> {
    constructor(props:any){
        super(props);
        this.state={...this.initState}
    }
    initState={
        newPhone:'',
        errors:{
            NewPhone:undefined,
            G:undefined}as IChangePhoneErrors,
        loading:false,
        OpenAletr:false
    }    
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        this.setState(prev=>({...prev,loading:true}));
        axios.post('/manage/phone',{newPhone:this.state.newPhone})
        .then(res=>{
        this.setState(prev=>({...this.initState,OpenAletr:true}));
        setTimeout(() => {
            this.setState(prev=>({...this.initState,OpenAletr:false}));
        }, 1200);
        this.props.setUserIdentity(res.data);
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
        this.setState(prev=>({...prev,newPhone:val}));
    }
    render() {
        const {classes}=this.props;
        const {loading,errors,OpenAletr,newPhone}=this.state;
        return (          
            <Box>  
                <Backdrop className={classes.backdrop}
                          open={OpenAletr} 
                          onClick={()=>{this.setState(p=>({...p,OpenAletr:false}))}}>
                    <Alert severity="success">تم تغيير رقم الهاتف خاصتك بنجاح</Alert>
                </Backdrop>              
                <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                <TextField 
                        name="newPhone" type="phone" 
                        variant="outlined"
                        id="newPhone" label="رقم الهاتف الجديد" 
                        value={newPhone}
                        onChange={this.handleChange}
                        helperText={displayError(errors.NewPhone)}
                        error={errors.NewPhone?true:false}
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
        )
    }
}
export default connect((state:{user:IUserState})=>({
}), {setUserIdentity})(withStyles(styles as any)(ChangePhone_View)) as any

