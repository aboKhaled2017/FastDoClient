import React, { Component, FormEvent, Fragment } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SendRounded'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    name:string
    mngName:string
    ownName:string
    errors:any
}
interface IPFProps{
    classes:{[key:string]:any}
    phName:string
    mngName:string
    ownName:string
    errors:any
}
interface ISFProps{
    classes:{[key:string]:any}
    sName:string
    mngName:string
    ownName:string
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
const PharmacyFields=(props:IPFProps)=>{
    const {classes,errors,phName,ownName,mngName}=props;
    return(
    <Fragment>
        <TextField 
            name="phName" type="text" 
            variant="outlined"
            id="phName" label="اسم الصيدلية" 
            value={phName}
            //onChange={this.handleChange}
            helperText={errors?.phName}
            error={errors?.phName?true:false}
            fullWidth
            className={classes.textField}/>
        <TextField 
            name="mngName" type="text" 
            variant="outlined"
            id="mngName" label="اسم المدير للصيدلية" 
            value={mngName}
            helperText={errors?.mngName}
            error={errors?.mngName?true:false}                        
            //onChange={this.handleChange}
            fullWidth
            className={classes.textField}/> 
        <TextField 
            name="ownName" type="text" 
            variant="outlined"
            id="ownName" label="اسم المالك للصيدلية"
            value={ownName} 
            helperText={errors?.ownName}
            error={errors?.ownName?true:false}                       
            //onChange={this.handleChange}
            fullWidth
            className={classes.textField}/>
    </Fragment>
)}
const StoreFields=(props:ISFProps)=>{
    const {classes,errors,sName,ownName,mngName}=props;
    return(
    <Fragment>
        <TextField 
            name="sName" type="text" 
            variant="outlined"
            id="sName" label="اسم المخزن" 
            value={sName}
            //onChange={this.handleChange}
            helperText={errors?.sName}
            error={errors?.phName?true:false}
            fullWidth
            className={classes.textField}/>
        <TextField 
            name="mngName" type="text" 
            variant="outlined"
            id="mngName" label="اسم المدير للمخزن" 
            value={mngName}
            helperText={errors?.mngName}
            error={errors?.mngName?true:false}                        
            //onChange={this.handleChange}
            fullWidth
            className={classes.textField}/> 
        <TextField 
            name="ownName" type="text" 
            variant="outlined"
            id="ownName" label="اسم المالك للمخزن"
            value={ownName} 
            helperText={errors?.ownName}
            error={errors?.ownName?true:false}                       
            //onChange={this.handleChange}
            fullWidth
            className={classes.textField}/>
    </Fragment>
)}
export default withStyles(styles as any)(class extends Component<IProps, IState> {
    state = {name:'',mngName:'',ownName:'',errors:{} as any}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    render() {
        const {classes}=this.props;
        const {errors}=this.state;
        const loading=false;
        const a=true;
        return (          
            <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
            {a
            ?<PharmacyFields {...{...this.state,classes,phName:this.state.name}}/>
            :<StoreFields {...{...this.state,classes,sName:this.state.name}}/>}                        
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
