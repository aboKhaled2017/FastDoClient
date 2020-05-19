import React, { Component, Fragment } from 'react'
import { Theme, withStyles, Tabs, Tab, Typography, Box, Grid, Container } from '@material-ui/core'

import ManagePasswordView from './ManagePassword'
import ManageUsernameView from './ManageUsername'

import UserIcon from '@material-ui/icons/PersonRounded'
import PasswordIcon from '@material-ui/icons/EnhancedEncryptionRounded'

import TabPanel from '../../Commons/TabPanel'

interface IProps {
    classes:{[key:string]:any}
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

export default withStyles(styles)(class Profile extends Component<IProps, IState> {
    state = {value:0}
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value:newValue});
    }
    render() {
        const {classes}=this.props;
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
                                <Tab icon={<UserIcon color="primary"/>} label="تغيير اسم المستخدم"/>
                                <Tab icon={<PasswordIcon color="primary"/>} label="تغيير كلمة المرور"/>
                            </Tabs>
                        </Grid>
                        <Grid xs={12} sm={8}>
                            <TabPanel  value={this.state.value} index={0}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                تغيير اسم المستخدم الخاص بك
                                </Typography>
                                <ManageUsernameView/>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={1}>
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
