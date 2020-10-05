import { Theme, withStyles, Paper, Tabs, Tab } from "@material-ui/core";
import React, { ReactElement } from "react";
import ClassifyIcon from '@material-ui/icons/ClassRounded'
import ShowIcon from '@material-ui/icons/ViewComfyRounded'
import PharmaIcon from '@material-ui/icons/LocalPharmacy'
import StoreIcon from '@material-ui/icons/StoreRounded'
import RequestIcon from '@material-ui/icons/SendRounded'


const styles=(theme:Theme)=>({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    paper:{
     borderRadius:5,
     margin:theme.spacing(3,5)
    },
    tabIndicator:{
        height:4
    }
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
                <Tab  label="منتجات الادوية" icon={<StoreIcon/>}/>
                <Tab  label="صيدلياتى" icon={<PharmaIcon/>} />
                <Tab  label="طلبات الصيدليات" icon={<RequestIcon/>}/>
                <Tab  label="التصنيفات" icon={<ClassifyIcon/>}/>
          </Tabs>
        </Paper>
    )
})

export default LzDrugsTabs;