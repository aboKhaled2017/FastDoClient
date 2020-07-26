import React, { Component, Fragment } from 'react'
import { Theme, withStyles,Typography, Box } from '@material-ui/core'


import TabPanel from '../../../Commons/TabPanel'
import AddNewLzDrug from '../Add/Add'
import ShowLzDrugs from '../Show/Show'
import ShowSentRequests_ByMe from '../ShowSentReqsts/ShowSentReqsts'
import ShowReceivedRequests_ByMe from '../ShowRecvReqsts/ShowRecvReqsts'
import LzDrgsTabs from './Components/LzDrgsTabs'
import { IDataState } from '../../../Interfaces/States'
import { connect } from 'react-redux'
import {GetMyDrugs_Page} from '../../../Redux/Actions/DataActions'
import { I_Drug_DataModel, I_PaginationReq_To_GetDrugs } from '../../../Interfaces/DrugsTypes'
interface IProps {
    classes:{[key:string]:any}
    GetMyDrugs_Page:()=>void
    dataRows:I_Drug_DataModel[]
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
    state = {value:1}
    componentDidMount(){
        if(this.props.dataRows && this.props.dataRows.length==0)
          this.props.GetMyDrugs_Page();
    }
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value:newValue});
    }
    render() {
        const {classes}=this.props;
        return (
           <Fragment>
               <Box>
                   <Typography align="center" color="primary" variant="h4">
                   صفحة ادارة الرواكد 
                   </Typography>
                   <LzDrgsTabs className={classes.tabs} value={this.state.value} handleChange={this.handleChange}/>
                   <Box  className={classes.container}>
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
                                    الرواكد التى قمنا بارسال طلب عليها
                                </Typography>
                                <ShowSentRequests_ByMe/>
                        </TabPanel>
                        <TabPanel  value={this.state.value} index={3}>
                                <Typography variant="h6" className={classes.TabPanelTitle}> 
                                     الطلبات المستلمة لرواكدنا
                                </Typography>
                                <ShowReceivedRequests_ByMe/>
                        </TabPanel>
                   </Box>
               </Box>                        
           </Fragment>
        )
    }
}
export default connect((state:{data:IDataState})=>({
dataRows:state.data.myDrugs.rows
}), {GetMyDrugs_Page})(withStyles(styles as any)(manageMyDrugsPage)) as any;