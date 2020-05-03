import React, { Component, FormEvent, Fragment } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SendRounded'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    mobilePhone:string
    localPhone:string
    errors:any
}
interface I_PS_FProps{
    classes:{[key:string]:any}
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
const Fields=(props:I_PS_FProps)=>{
    const {classes,errors}=props;
    return(
    <Fragment>
        <TextField 
            name="mobilePhone" type="phone" 
            variant="outlined"
            id="mobilePhone" label="رقم الهاتف محمول" 
            //onChange={this.handleChange}
            helperText={errors?.mobilePhone}
            error={errors?.mobilePhone?true:false}
            fullWidth
            className={classes.textField}/>
        <TextField 
            name="localPhone" type="phone" 
            variant="outlined"
            id="localPhone" label="رقم التليفون الارضى" 
            helperText={errors?.localPhone}
            error={errors?.localPhone?true:false}                        
            //onChange={this.handleChange}
            fullWidth
            className={classes.textField}/> 
    </Fragment>
)}
export default withStyles(styles as any)(class extends Component<IProps, IState> {
    state = {localPhone:'',mobilePhone:'',errors:{} as any}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    render() {
        const {classes}=this.props;
        const {errors}=this.state;
        const loading=true;
        return (          
            <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
             <Fields classes={classes} errors={errors} />          
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
