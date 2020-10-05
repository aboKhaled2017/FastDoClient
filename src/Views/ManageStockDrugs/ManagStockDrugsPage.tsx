import React, { Component, Fragment } from 'react'
import { Theme, withStyles,Typography, Box } from '@material-ui/core'


import TabPanel from '../../Commons/TabPanel'

import {ShowJoinedPharmasView,ShowStockClassesView,
ShowSentJoinPharmasReq,ShowStockDrugsView} from './Views'
import LzDrgsTabs from './Components/LzDrgsTabs'
interface IProps {
    classes:{[key:string]:any}
    
}
interface IState{}

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
        background:theme.palette.primary.main,
        borderRadius:5
    },
    tabIndicator:{
        height:4
    },
    TabPanelTitle:{
       color:'#647484'
    },
})


class manageMyDrugsPage extends Component<IProps, IState> {
    state = {value:2}
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value:newValue});
    }
    render() {
        const {classes}=this.props;
        return (
           <Fragment>
               <Box>
                   <Typography align="center" color="primary" variant="h4">
                   صفحة ادارة المخزن 
                   </Typography>
                   <LzDrgsTabs className={classes.tabs} value={this.state.value} handleChange={this.handleChange}/>
                   <Box  className={classes.container}>
                        <TabPanel  value={this.state.value} index={0}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                      منتجات الادوية
                                </Typography>
                                <ShowStockDrugsView/>
                        </TabPanel>
                        <TabPanel  value={this.state.value} index={1}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                     صيدلياتى
                                </Typography>
                                <ShowJoinedPharmasView/>
                        </TabPanel>
                        <TabPanel  value={this.state.value} index={2}>
                                <Typography variant="subtitle1" className={classes.TabPanelTitle}> 
                                     طلبات الصيدليات
                                </Typography>
                                <ShowSentJoinPharmasReq/>
                        </TabPanel>
                        <TabPanel  value={this.state.value} index={3}>
                                <Typography variant="h6" className={classes.TabPanelTitle}> 
                                     التصنيفات
                                </Typography>
                                <ShowStockClassesView/>
                        </TabPanel>
                   </Box>
               </Box>                        
           </Fragment>
        )
    }
}
export default withStyles(styles as any)(manageMyDrugsPage) as any;