import { Theme, withStyles, Paper, Tabs, Tab, makeStyles, createStyles } from "@material-ui/core";
import React, { ReactElement } from "react";
import SaerchIcon from '@material-ui/icons/SearchRounded'
import ShowIcon from '@material-ui/icons/ViewComfyRounded'


const useStyles=makeStyles((theme:Theme)=>createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 200,
    },
    paper:{
     borderRadius:5,
     margin:theme.spacing(3,5)
    },
    tabIndicator:{
        height:4,
        background:theme.palette.secondary.light
    }
}))

interface IViewProps {
    className:any
    value:number
    handleChange:(event: React.ChangeEvent<{}>, newValue: number)=>void
}
const View=(props:IViewProps):ReactElement=>{
    const {value,handleChange,className,...rest}=props;
    const classes=useStyles();
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
                <Tab label="البحث عن منتجات ادوية" icon={<SaerchIcon/>}/>
                <Tab label="الطلبيات" icon={<ShowIcon/>} />
          </Tabs>
        </Paper>
    )
}

export default View;