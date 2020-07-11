import React, { Component, FormEvent } from 'react'
import { Grid, Typography, CircularProgress, Theme, withStyles, Stepper, Step, StepLabel, StepContent, Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import ViewIcon from './../../../Images/pharmacyIcon.png'
import ViewSteps from './AsPharmacySteps';
import { I_SignUp_Stepper, I_UI_State } from '../../../Interfaces/States';
import {Set_SignUp_Stepper,Execute_SignUp_Ph_Step} from '../../../Redux/Actions/UIActions';
import { connect } from 'react-redux';
import { IHistory } from '../../../Interfaces/DataTypes';
import { createHistoryInstance } from 'searchkit';
interface Props {
    classes:{[key:string]:any}
    signupStepper:I_SignUp_Stepper
    Set_SignUp_Stepper:(currentStep:number,isValid:boolean)=>void
    Execute_SignUp_Ph_Step:(stepNumber:number,history:IHistory)=>void
    loading:boolean
}
interface State {
    steps:string[]
}
const styles=(theme:Theme)=>({
    ...(theme as any).spreadCommonJoinView,
       root: {
        width: '100%',
        padding:theme.spacing(3,0,28,0)
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
const AS_Pharmacy_View=withStyles(styles as any)(class extends Component<Props, State> {
    state = {steps:getSteps()}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    history=createHistoryInstance()
    handleNext = () => {     
        if(this.props.signupStepper.isValid){
            this.props.Set_SignUp_Stepper(this.props.signupStepper.currentStep+1,false);
        }
        else{ 
            this.props.Execute_SignUp_Ph_Step(this.props.signupStepper.currentStep,this.history)
        }
    }  
    handleBack = () => {
        this.props.Set_SignUp_Stepper(this.props.signupStepper.currentStep-1,true);
    }   
    handleReset = () => {
        this.props.Set_SignUp_Stepper(0,this.props.signupStepper.isValid);
    }
    render() {
        const {classes,signupStepper,loading}=this.props;
        const errors:any={};
        return (
            <div className={classes.root}>                 
                <div style={{textAlign:'center'}}>
                    <img src={ViewIcon} alt="smile" className={classes.image}/>
                    <Typography variant="h6" color="primary" className={classes.pageTitle}>سجل بياناتك وانضم الينا كصيدلى</Typography>
                </div>
                <Stepper className={classes.stepper} activeStep={signupStepper.currentStep} orientation="vertical">
                    {this.state.steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent className={classes.stepContent}>
                             <Grid container className={classes.form}>
                                <Grid item xs={3} sm={4} md/>
                                <Grid item xs={9} sm={6} md>                               
                                    <form noValidate onSubmit={this.handleSubmit}>
                                    {index===0 && <ViewSteps.step1/>}
                                    {index===1 && <ViewSteps.step2/>}
                                    {index===2 && <ViewSteps.step3/>}
                                    {index===3 && <ViewSteps.step4/>}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={signupStepper.currentStep === 0}
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
                                                {signupStepper.currentStep ===this.state.steps.length - 1 ? 'انضم الان' : 'التالى'}
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
});
export default  connect((state:{UI:I_UI_State})=>({
    signupStepper:state.UI.signUp_Stepper,
    loading:state.UI.loading
}),{Set_SignUp_Stepper,Execute_SignUp_Ph_Step})(AS_Pharmacy_View as any);