import React, { Component, FormEvent } from 'react'
import { Theme, withStyles, Container, Typography, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendOutlined'
import { IPostComplainErrors } from './Interfaces'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import { displayError } from '../../Helpers/HelperJsxFunctions'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    name:string
    email:string
    subject:string 
    message:string
    errors:IPostComplainErrors
    loading:boolean
    OpenAletr:boolean
}

const styles=(theme:Theme)=>({
    contactUsContainer:{
        padding: theme.spacing(5),
        borderRadius: 14,
        '& .contactForm':{
            margin:theme.spacing(3,'auto',0,'auto'),
            width:'50%',
            [`${theme.breakpoints.down('sm')}`]:{
                width:'100%'
            }
        }
    },
    textField:{
        background:'#fff',
        '& .MuiFormLabel-root':{
            fontSize:'1.2rem'
        },
        '& label':{
            color:'#666'
        }
    },
    formButton:{
     marginTop:theme.spacing(2)
    },
    formButtonIcon:{
        marginLeft:theme.spacing(1.5)
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

class ContactUs extends Component<IProps, IState> {
    constructor(props:any){
        super(props);
        this.state={...this.initState};
    }
    initState:IState= {
        name:'',
        email:'',
        subject:'',
        message:'',
        errors:{
            Name:undefined,
            Email:undefined,
            Subject:undefined,
            Message:undefined,
            G:undefined}as IPostComplainErrors,
        loading:false,
        OpenAletr:false
    }
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        this.setState(prev=>({...prev,loading:true}));
        const data={
            name:this.state.name,
            email:this.state.email,
            subject:this.state.subject,
            message:this.state.message
        }
        axios.post('/complains',data)
        .then(res=>{
        this.setState(prev=>({...this.initState,OpenAletr:true}));
        setTimeout(() => {
            this.setState(prev=>({...this.initState,OpenAletr:false}));
        }, 6000);
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
        let name=e.target.name, val=e.target.value;
        this.setState(prev=>({...prev,[name]:val}));
    }
    render() {
        const {classes}=this.props;
        const {subject,message,OpenAletr,errors,loading,email,name}=this.state;
        return (
        <Container className={classes.contactUsContainer}>
            <Typography variant="h4" color="primary" align="center">اترك لنا رسالتك</Typography>
            <Backdrop className={classes.backdrop}
                          open={OpenAletr} 
                          onClick={()=>{this.setState(p=>({...p,OpenAletr:false}))}}>
                    <Alert severity="success">
                        <span>لقد تم ارسال رسالتك ,سنقوم بالرد عليك فى خلال 48 ساعة</span>
                        <span>شكرا لك على الاهتمام والابلاغ</span>
                    </Alert>
            </Backdrop>
            <form className="contactForm" noValidate onSubmit={this.handleSubmit}>
               <TextField 
                    id="name"
                    name="name"
                    label="الاسم"
                    type="text"
                    variant="outlined"
                    fullWidth                  
                    className={classes.textField}
                    margin="dense"
                    size="medium"
                    value={name}
                    onChange={this.handleChange}
                    helperText={displayError(errors.Name)}
                    error={errors.Name?true:false}
               />
               <TextField 
                    id="email"
                    name="email"
                    label="البريد الالكترونى"
                    type="email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    margin="dense"
                    size="medium"
                    value={email}
                    onChange={this.handleChange}
                    helperText={displayError(errors.Email)}
                    error={errors.Email?true:false}
               />
               <TextField 
                    id="subject"
                    name="subject"
                    label="الموضوع"
                    type="text"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    margin="dense"
                    size="medium"
                    value={subject}
                    onChange={this.handleChange}
                    helperText={displayError(errors.Subject)}
                    error={errors.Subject?true:false}
               />
               <TextField 
                    id="message"
                    name="message"
                    label="الرسالة"
                    type="text"
                    rows={6}
                    rowsMax={8}
                    multiline
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    margin="dense"
                    size="medium"
                    value={message}
                    onChange={this.handleChange}
                    helperText={displayError(errors.Message)}
                    error={errors.Message?true:false}
               />
                {errors.G && 
                    <Typography variant="body2" className={classes.customeErros}>
                        {displayError(errors.G)}
                    </Typography>
                } 
               <Button 
                        variant="contained" color="primary" 
                        className={classes.formButton} 
                        type="submit"                               
                        startIcon={
                            <SendIcon className={classes.formButtonIcon}/>
                        }> 
                         ارسال
                        {loading&&(<CircularProgress size={30} color="secondary" className={classes.progress}/>)}
               </Button>
            </form>
        </Container>)
    }
}

export default withStyles(styles as any)(ContactUs) as any;
