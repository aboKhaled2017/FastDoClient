import React, { Component, Fragment } from 'react'
import { Theme, withStyles, Tabs, Tab, Typography, Box, Grid, Container } from '@material-ui/core'

import MainInfoForm from './Info'
import IdentityInfoForm from './Identity'
import ContactInfoForm from './Contact'
import LocationInfoForm from './Location' 

import UserIcon from '@material-ui/icons/PersonRounded'
import LocationIcon from '@material-ui/icons/PlaceRounded'
import ContactIcon from '@material-ui/icons/PhoneInTalkRounded'
import IdentityIcon from '@material-ui/icons/CheckRounded'
interface IProps {
    classes:{[key:string]:any}
}
interface IState {
    value:number
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
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
    }
})
function a11yProps(index: any) {
    return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
    <Typography
        component="div"
        role="tabpanel"
        >
    {value === index && <Box p={3}>{children}</Box>}
    </Typography>
    )
}
export default withStyles(styles)(class Profile extends Component<IProps, IState> {
    state = {value:3}
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value:newValue});
    }
    render() {
        const {classes}=this.props;
        const accountType='pharmacy'
        return (
           <Fragment>
               <Container className={classes.container}>
                <Typography align="center" color="primary" variant="h4">
                   صفحة العضوية
                </Typography>
                <Grid container>
                        <Grid sm={4}>
                            <Tabs orientation="vertical"
                                variant="scrollable"
                                value={this.state.value}
                                onChange={this.handleChange}
                                aria-label="Vertical tabs"
                                className={classes.tabs}
                                >
                                <Tab wrapped={false} icon={<UserIcon color="primary"/>} label="بيانات الهوية" {...a11yProps(0)}/>
                                <Tab icon={<IdentityIcon color="primary"/>} label="بيانات اثبات الهوية" {...a11yProps(1)}/>
                                <Tab icon={<ContactIcon color="primary"/>} label="بيانات التواصل" {...a11yProps(2)}/>
                                <Tab icon={<LocationIcon color="primary"/>} label="بيانات العنوان" {...a11yProps(3)}/>
                            </Tabs>
                        </Grid>
                        <Grid sm={8}>
                            <TabPanel  value={this.state.value} index={0}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                 {accountType==="pharmacy"
                                 ?"معلومات اساسية عن الصيدلية ومديريها"
                                 :"معلومات اساسية عن المخزن ومديريه"}
                                </Typography>
                                <MainInfoForm/>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={1}>
                                <Typography variant="h6" className={classes.TabPanelTitle}>
                                    {accountType==="pharmacy"
                                    ?"بيانات اثبات هوية الصيدلية"
                                    :"بيانات اثبات هوية المخزن"}
                                </Typography>
                                <IdentityInfoForm/>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={2}>
                               <Typography variant="h6" className={classes.TabPanelTitle}>
                                    {accountType==="pharmacy"
                                    ?"بيانات التواصل للصيدلية"
                                    :"بيانات التواصل للمخزن"}
                               </Typography>
                               <ContactInfoForm/>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={3}>
                               <Typography variant="h6" className={classes.TabPanelTitle}>
                                   {accountType==="pharmacy"
                                   ?"بيانات  عنوان الصيدلية"
                                   :"بيانات عنوان المخزن"}
                               </Typography>
                               <LocationInfoForm/>
                            </TabPanel>
                        </Grid>
                </Grid>   
               </Container>                           
           </Fragment>
        )
    }
})
