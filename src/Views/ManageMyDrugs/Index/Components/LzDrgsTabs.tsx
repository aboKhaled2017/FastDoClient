import { Theme, withStyles, Paper, Tabs, Tab } from "@material-ui/core";
import React, { ReactElement } from "react";
import AddIcon from '@material-ui/icons/AddCircleRounded'
import ShowIcon from '@material-ui/icons/ViewComfyRounded'
import Add1Icon from '@material-ui/icons/PlaylistAddRounded'
import Show2Icon from '@material-ui/icons/ViewListRounded'


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
                <Tab label="اضافة راكد" icon={<AddIcon/>}/>
                <Tab label="عرض الرواكد" icon={<ShowIcon/>} />
                <Tab label="رواكد قمنا بطلبها" icon={<ShowIcon/>}/>
                <Tab label="طلبات ارسلت الينا" icon={<ShowIcon/>}/>
          </Tabs>
        </Paper>
    )
})

export default LzDrugsTabs;