import React, { Component, FormEvent } from 'react'
import { Grid, Typography, Button, CircularProgress, Theme, withStyles, Stepper, Paper, Step, StepLabel, StepContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ViewIcon from './../../../Images/storeIcon.png'
import ViewSteps from './AsStoreSteps';
interface Props {
    classes:{[key:string]:any}
}
interface State {
    activeStep:number
    steps:string[]
}
const styles=(theme:Theme)=>({
    ...(theme as any).spreadCommonJoinView,
       root: {
        width: '100%',
        padding:theme.spacing(3,0,10,0)
      },
      form:{
          position:'absolute',
          top: 0,
          left: 0,
          [`${theme.breakpoints.down('xs')}`]:{
            '& .MuiInputLabel-formControl':{
                fontSize:12
            }
          }
      },
      stepper:{
          background:'transparent',
          position:'relative',
          [`${theme.breakpoints.down('xs')}`]:{
              padding:0,
              '& .MuiStepLabel-label':{
                  fontSize:'.7rem'
              }
          }
      },
      completeIcon:{
          fontSize:25
      },
      stepButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        [`${theme.breakpoints.down('xs')}`]:{
            '& .MuiButton-label':{
                fontSize:10
            }
          }
      },
      actionsContainer: {
        marginBottom: theme.spacing(2),
      },
      resetContainer: {
        padding: theme.spacing(3),
    }
})
function getSteps() {
    return ['بيانات الهوية', 'بيانات اثبات الهوية', 'بيانات التواصل','بيانات الحساب'];
}
export default withStyles(styles as any)(class extends Component<Props, State> {
    state = {activeStep:0,steps:getSteps()}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    handleNext = () => {      
        this.setState((prevSate) =>({activeStep:prevSate.activeStep+1}));
    }
    
    handleBack = () => {
        this.setState((prevSate) =>({activeStep:prevSate.activeStep-1}));
    }
    
    handleReset = () => {
        this.setState({activeStep:0});
    }
    render() {
        const {classes}=this.props;
        const loading=false;
        return (
            <div className={classes.root}>                 
                <div style={{textAlign:'center'}}>
                    <img src={ViewIcon} alt="smile" className={classes.image}/>
                    <Typography variant="h6" color="primary" className={classes.pageTitle}>سجل بياناتك وانضم الينا كمالك مخزن</Typography>
                </div>
                <Stepper className={classes.stepper} activeStep={this.state.activeStep} orientation="vertical">
                    {this.state.steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent className={classes.stepContent}>
                             <Grid container className={classes.form}>
                                <Grid item xs={3} sm={4} md/>
                                <Grid item xs={9} sm={6} md>                               
                                    <form noValidate onSubmit={this.handleSubmit}>
                                    {index===0 && <ViewSteps.SInfoStep/>}
                                    {index===1 && <ViewSteps.SIdentityStep/>}
                                    {index===2 && <ViewSteps.SContactStep/>}
                                    {index===3 && <ViewSteps.SAccountStep/>}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={this.state.activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.stepButton}
                                            >
                                                السابق
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.stepButton}
                                                type="submit"
                                                disabled={loading}
                                                >
                                                {this.state.activeStep ===this.state.steps.length - 1 ? 'انضم الان' : 'التالى'}
                                                {
                                                loading&&(
                                                    <CircularProgress size={30} color="secondary" className={classes.progress}/>
                                                )
                                                }
                                            </Button>
                                        </div>
                                    </div>   
                                    <br/><small>هل لديك حساب بالفعل?  ادخل لحسابك من  <Link to="/login">هنا</Link></small>        
                                    </form>
                                </Grid>
                                <Grid item  md/>
                            </Grid>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>             
            </div>
        )
    }
})
