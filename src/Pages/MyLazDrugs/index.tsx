import React, { Component, Fragment, ReactElement } from 'react'
import { Theme, withStyles, Tabs, Tab, Typography, Grid, Container, List, ListItem, ListItemIcon, ListItemText, Divider, Paper } from '@material-ui/core'

import AddIcon from '@material-ui/icons/AddCircleRounded'
import ShowIcon from '@material-ui/icons/ViewComfyRounded'
import Add1Icon from '@material-ui/icons/PlaylistAddRounded'
import Show2Icon from '@material-ui/icons/ViewListRounded'
import TabPanel from '../../Commons/TabPanel'
import AddNewLzDrug from './AddNewLzDrug'
import ShowLzDrugs from './ShowLzDrugs'
import AddNewPackage from './AddNewPackage'
import ShowPackages from './ShowPackages'


interface IProps {
    classes:{[key:string]:any}
}
interface IState {
   
}

const styles=(theme:Theme)=>({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    container:{
       
        padding:theme.spacing(.5,.5),
    },
    paper:{
     borderRadius:5,
     margin:theme.spacing(3,5)
    },
    tabs:{
        color:'#fff',
        background:'#2d3e50',
        borderRadius:5
    },
    tabIndicator:{
        height:4
    },
    TabPanelTitle:{
       color:'#647484'
    },
})
interface ILzDrugsTabsProps {
    classes:{[key:string]:any}
    className:any
    value:number
    handleChange:(event: React.ChangeEvent<{}>, newValue: number)=>void
}
const LzDrugsTabs=withStyles(styles as any)((props:ILzDrugsTabsProps):ReactElement=>{
    const {classes,value,handleChange,className,...rest}=props;
    return (
        <Paper {...rest} className={classes.paper}>
          <Tabs value={value}
                className={className}
                indicatorColor="primary"
                textColor="inherit"
                centered               
                variant="fullWidth"  
                TabIndicatorProps={{className:classes.tabIndicator}}             
                onChange={handleChange}>
                <Tab label="اضافة راكد" icon={<AddIcon/>}/>
                <Tab label="عرض الرواكد" icon={<ShowIcon/>} />
                <Tab label="انشاء باكج" icon={<Add1Icon/>}/>
                <Tab label="عرض الباكجز" icon={<Show2Icon/>}/>
          </Tabs>
        </Paper>
    )
})
export default withStyles(styles as any)(class Profile extends Component<IProps, IState> {
    state = {value:1}
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value:newValue});
    }
    render() {
        const {classes}=this.props;
        return (
           <Fragment>
               <Container>
                   <Typography align="center" color="primary" variant="h4">
                   صفحة ادارة الرواكد 
                   </Typography>
                   <LzDrugsTabs className={classes.tabs} value={this.state.value} handleChange={this.handleChange}/>
                   <Container  className={classes.container}>
                        <TabPanel  value={this.state.value} index={0}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                    اضافة راكد جديد
                                </Typography>
                                <AddNewLzDrug/>
                        </TabPanel>
                        <TabPanel  value={this.state.value} index={1}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                    عرض الرواكد
                                </Typography>
                                <ShowLzDrugs/>
                        </TabPanel>
                        <TabPanel  value={this.state.value} index={2}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                    انشاء باكج / باقة جديدة
                                </Typography>
                                <AddNewPackage/>
                        </TabPanel>
                        <TabPanel  value={this.state.value} index={3}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                     عرض بكجاتى/عروضى التبادلية
                                </Typography>
                                <ShowPackages/>
                        </TabPanel>
                   </Container>
               </Container>                        
           </Fragment>
        )
    }
})
