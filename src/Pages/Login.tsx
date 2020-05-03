import React, { Component, FormEvent } from 'react'
import { Grid, Typography, TextField, Button, CircularProgress, Theme, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded'
interface IProps {
    classes:{[key:string]:any}
}
interface IState {
     userName:string 
     password:string
     confirmPassword:string
     errors:any
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
export default withStyles(styles as any)(class extends Component<IProps, IState> {
    state = {userName:'',password:'',confirmPassword:'',errors:{} as any}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    render() {
        const {classes}=this.props;
        const errors:any={};
        const loading=false;
        return (
            <Grid container className={classes.form }>
                <Grid item md/>
                <Grid item xs={12} md justify="center">
                    <AccountBoxIcon className={classes.icon} color="primary" fontSize="large"/>
                    <Typography color="primary" variant="h6" className={classes.pageTitle}>سجل دخول</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                                name="userName" type="text" 
                                id="userName" label="اسم المستخدم" 
                                value={this.state.userName}
                                //onChange={this.handleChange}
                                //helperText={errors?.email}
                                //error={errors?.email?true:false}
                                fullWidth
                                className={classes.textField}/>
                    <TextField 
                                name="password" type="password" 
                                id="password" label="كلمة السر" 
                                value={this.state.password}
                                /*helperText={errors?.password}
                                error={errors?.password?true:false}                              
                                onChange={this.handleChange}*/
                                fullWidth
                                className={classes.textField}/> 
                    <TextField 
                                name="confirmPassword" type="password" 
                                id="confirmPassword" label="تأكيد كلمة السر"
                                value={this.state.confirmPassword} 
                                /*helperText={errors?.confirmPassword}
                                error={errors?.confirmPassword?true:false}                         
                                onChange={this.handleChange}*/
                                fullWidth
                                className={classes.textField}/>                         
                    {errors?.general && 
                    <Typography variant="body2" className={classes.customeErros}>{errors?.general}</Typography>
                    }          
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
