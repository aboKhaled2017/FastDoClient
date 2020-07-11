import React, { Component, FormEvent } from 'react'
import { Grid, Typography, TextField, Button, CircularProgress, Theme,
         withStyles, FormControl, FormLabel,
         RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded'
import { ILogin_Errors, ILoginData } from '../../Interfaces/AccountTypes'
import {loginUser} from '../../Redux/Actions/userActions'
import { IUserState, I_UI_State } from '../../Interfaces/States'
import { connect } from 'react-redux'
import {displayError} from '../../Helpers/HelperJsxFunctions'
import { IHistory } from '../../Interfaces/DataTypes'
interface IProps {
    classes:{[key:string]:any}
    loading:boolean 
    errors:ILogin_Errors
    loginUser:(userData:ILoginData,history:IHistory)=>void
    history:IHistory
}
interface IState{
    email:string
    password:string
    userType:number
    [key:string]:string|number
}
const styles=(theme:Theme)=>({
    ...(theme as any).spreadCommonJoinView,
    form:{
        margin:'auto',
        textAlign:'center',
        [`${theme.breakpoints.only('sm')}`]:{
            width:'80%',
        },
        [`${theme.breakpoints.down('xs')}`]:{
            width:'95%',
        }
      },
      pageTitle:{
       margin:'10px auto 10px auto'
     },
      icon:{
        margin:'20px auto 20px auto',
        fontSize:100
     },
     textField:{
       margin:'10px auto 10px auto'
     },
     button:{
       margin:theme.spacing(3,'auto',1.5,'auto'),
       position:'relative'
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
const LoginComponent= withStyles(styles as any)(class extends Component<IProps,IState> {
    state={email:'',password:'',userType:0}
    handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const userData:ILoginData={
          email:this.state.email,
          password:this.state.password,
          userType:this.state.userType
        }
        this.props.loginUser(userData,this.props.history);
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
         this.setState({
           [e.target.name]:e.target.value
         })
    }
    render() {
        const {classes,errors,loading}=this.props;
        return (
            <Grid container className={classes.form }>
                <Grid item md/>
                <Grid item xs={12} md>
                    <AccountBoxIcon className={classes.icon} color="primary" fontSize="large"/>
                    <Typography color="primary" variant="h6" className={classes.pageTitle}>سجل دخول</Typography>
                    {errors?.G && 
                    <Typography variant="body2" className={classes.customeErros}>{errors?.G}</Typography>
                    } 
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                                name="email" type="text" 
                                id="email" label="اليريد الالكترونى" 
                                value={this.state.email}
                                onChange={this.handleChange}
                                helperText={displayError(errors.Email)}
                                error={errors.Email?true:false}
                                fullWidth
                                className={classes.textField}/>
                    <TextField 
                                name="password" type="password" 
                                id="password" label="كلمة السر" 
                                value={this.state.password}
                                helperText={displayError(errors.Password)}
                                error={errors?.Password?true:false}                              
                                onChange={this.handleChange}
                                fullWidth
                                className={classes.textField}/> 
                    <FormControl name="userType" style={{display:'block'}} component="fieldset">
                       <Typography  variant="h6">الدخول ك</Typography>
                       <RadioGroup  row aria-label="userType" name="userType" defaultValue="0" onChange={this.handleChange}>
                          <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label="صيدلية"
                            labelPlacement="start"
                            />
                            <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="مخزن"
                            labelPlacement="start"
                            />
                       </RadioGroup>
                    </FormControl>
                                                                                       
                    <Button 
                            type="submit" variant="contained" 
                            disabled={loading}
                            className={classes.button} color="primary">
                        دخول الان 
                        {
                        loading&&(
                            <CircularProgress size={30} color="secondary" className={classes.progress}/>
                        )
                        }
                    </Button>     
                    <br/><small>ليس لدى حساب ,سجل انضمام من    <Link to="/join">هنا</Link></small>        
                    </form>
                </Grid>
                <Grid item md/>
            </Grid>
        )
    }
})
export default connect((state:{UI:I_UI_State})=>({
    loading:state.UI.loading,
    errors:state.UI.errors.loginErrors
}),{loginUser})(LoginComponent as any)