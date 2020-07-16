import React, { Component, Fragment } from 'react'
import { Theme, withStyles, Tabs, Tab, Typography, Box, Grid, Container } from '@material-ui/core'

import ManagePasswordView from './ManagePassword'
import ManageEmailView from './ManageEmail/ChangeEmail_View'
import ConfirmEmailView from './ManageEmail/ConfirmEmail'
import ManagePhoneView from './ManagePhone'

import EmailIcon from '@material-ui/icons/EmailRounded'
import UserIcon from '@material-ui/icons/PersonRounded'
import PasswordIcon from '@material-ui/icons/EnhancedEncryptionRounded'
import PhoneIcon from '@material-ui/icons/MobileFriendlyRounded'

import TabPanel from '../../Commons/TabPanel'
import { connect } from 'react-redux'
import { IUserState } from '../../Interfaces/States'
import { ICurrentUserIdentifier } from '../../Interfaces/AccountTypes'

interface IProps {
    classes:{[key:string]:any}
    user:ICurrentUserIdentifier
}
interface IState {
    value:number
}

const styles=(theme:Theme)=>({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    container:{
        background:'#eee',
        padding:theme.spacing(4,1)
    },
    tabs:{
        borderRight: `4px solid ${theme.palette.divider}`,
    },
    TabPanelTitle:{
       color:'#647484'
    },
    indicator:{
        width:4,
        borderRadius:'30%',
    }
})
function a11yProps(index: any) {
    return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const Account= withStyles(styles)(class Profile extends Component<IProps, IState> {
    state = {value:0}
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value:newValue});
    }
    render() {
        const {classes,user:{emailConfirmed}}=this.props;
        return (
           <Fragment>
               <Container className={classes.container}>
                <Typography align="center" color="primary" variant="h4">
                   صفحة ادارة حسابك
                </Typography>
                <Grid container>
                        <Grid xs={12} sm={4}>
                            <Tabs orientation="vertical"
                                variant="scrollable"
                                TabIndicatorProps={{className:classes.indicator}}
                                value={this.state.value}
                                onChange={this.handleChange}
                                aria-label="Vertical tabs"
                                className={classes.tabs}
                                >
                                {!emailConfirmed && 
                                <Tab icon={<EmailIcon color="primary"/>} label="تأكيد البريد الالكترونى"/> 
                                }
                                <Tab icon={<UserIcon color="primary"/>} label="تغيير البريد الالكترونى"/> 
                                <Tab icon={<PhoneIcon color="primary"/>} label="تغيير رقم الهاتف"/>                              
                                <Tab icon={<PasswordIcon color="primary"/>} label="تغيير كلمة المرور"/>
                            </Tabs>
                        </Grid>
                        <Grid xs={12} sm={8}>
                            {!emailConfirmed&&
                            <TabPanel  value={this.state.value} index={0}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                تأكيد البريد الالكترونى
                                </Typography>
                                <ConfirmEmailView/>
                            </TabPanel>
                            }
                            <TabPanel  value={this.state.value} index={emailConfirmed?0:1}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                تغيير البريد الالكترونى
                                </Typography>
                                <ManageEmailView/>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={emailConfirmed?1:2}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}>
                                    تغيير رقم الهاتف
                                </Typography>
                                <ManagePhoneView/>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={emailConfirmed?2:3}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}>
                                    تغيير كلمة المرور
                                </Typography>
                                <ManagePasswordView/>
                            </TabPanel>
                        </Grid>
                </Grid>   
               </Container>                           
           </Fragment>
        )
    }
})

export default connect((state:{user:IUserState})=>({
    user:state.user.userIdentity.user
}),{})(Account as any)