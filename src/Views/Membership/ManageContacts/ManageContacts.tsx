import React, { Component, FormEvent } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography, Box } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SendRounded'
import { IChangeContactErrors} from '../Interfaces'
import axios from 'axios'
import { displayError } from '../../../Helpers/HelperJsxFunctions'
import Alert from '@material-ui/lab/Alert'
import { IUserState } from '../../../Interfaces/States'
import { connect } from 'react-redux'
import {ICurrentUserIdentifier, E_UserType, IUserIdentity } from '../../../Interfaces/AccountTypes'
import {setUserIdentity} from '../../../Redux/Actions/userActions'
interface IProps {
    classes:{[key:string]:any}
    userIdentity:ICurrentUserIdentifier
    setUserIdentity:(userIdentity:IUserIdentity)=>void
}
interface IState{
    landlinePhone:string
    address:string
    errors:IChangeContactErrors
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
class ManageContacts_View extends Component<IProps, IState> {
    constructor(props:any){
        super(props);
        this.state={
            ...this.initState()
        }
    }
    initState=()=>({
        landlinePhone:this.props.userIdentity.landlinePhone,
        address:this.props.userIdentity.address,
        loading:false,
        isSuccess:false,
        errors:{
            LandlinePhone: undefined,
            Address: undefined,
            G: undefined
        } as IChangeContactErrors 
    })
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        this.setState(prev=>({...prev,loading:true}));
        const data={
            landlinePhone:this.state.landlinePhone,
            address:this.state.address
        }
        let path=`/${this.props.userIdentity.userType==E_UserType.pharmacier?'ph':'stk'}/membership/contacts`;
        axios.patch(path,data)
        .then(res=>{
          this.setState(prev=>({...prev,isSuccess:true,loading:false}));
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
        let name=e.target.name,val=e.target.value;
        this.setState(prev=>({...prev,[name]:val}));
    }
    render() {
        const {classes}=this.props;
        const {errors,address,landlinePhone,loading,isSuccess}=this.state;
        return (  
            <Box> 
                <Box>
                    {isSuccess&&
                    <Alert severity="success">
                       تم تغيير معلومات التواصل بنجاح
                    </Alert>        
                    }
                </Box> 
                <Box mt={2}>
                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField 
                            name="landlinePhone" type="phone" 
                            variant="outlined"
                            id="landlinePhone" label="رقم التليفون الارضى" 
                            value={landlinePhone}
                            onChange={this.handleChange}
                            helperText={displayError(errors.LandlinePhone)}
                            error={errors.LandlinePhone?true:false}
                            fullWidth
                            className={classes.textField}/>  
                        <TextField 
                            name="address" type="text" 
                            variant="outlined"
                            id="address" label="العنوان بالتفصيل" 
                            value={address}
                            helperText={displayError(errors.Address)}
                            error={errors.Address?true:false}                              
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.textField}/>                    
                        {errors.G && 
                        <Typography variant="body2" className={classes.customeErros}>{displayError(errors.G)}</Typography>
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

export default connect((state:{user:IUserState})=>({
    userIdentity:state.user.userIdentity.user
}), {setUserIdentity})(withStyles(styles as any)(ManageContacts_View)) as any

