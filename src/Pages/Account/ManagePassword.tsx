import React, { Component, FormEvent } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SendRounded'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    currentPassword:string
    newPassword:string
    confirmNewPassword:string
    errors:any
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
export default withStyles(styles as any)(class extends Component<IProps, IState> {
    state = {currentPassword:'',newPassword:'',confirmNewPassword:'',errors:{} as any}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    render() {
        const {classes}=this.props;
        const {errors}=this.state;
        const loading=false;
        return (          
            <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
               <TextField 
                    name="currentPassword" type="text" 
                    variant="outlined"
                    id="currentPassword" label="كلمة السر الحالية" 
                    value={this.state.currentPassword}
                    //onChange={this.handleChange}
                    helperText={errors?.currentPassword}
                    error={errors?.currentPassword?true:false}
                    fullWidth
                    className={classes.textField}/>  
                <TextField 
                    name="newPassword" type="password" 
                    variant="outlined"
                    id="newPassword" label="كلمة السر الجديدة" 
                    value={this.state.newPassword}
                    helperText={errors?.newPassword}
                    error={errors?.newPassword?true:false}                              
                    //onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}/> 
                <TextField 
                    name="confirmNewPassword" type="password" 
                    variant="outlined"
                    id="confirmNewPassword" label="تأكيد كلمة السر الجديدة"
                    value={this.state.confirmNewPassword} 
                    helperText={errors?.confirmNewPassword}
                    error={errors?.confirmNewPassword?true:false}                         
                    //onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}/>                   
                {errors?.general && 
                <Typography variant="body2" className={classes.customeErros}>{errors?.general}</Typography>
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
        )
    }
})
