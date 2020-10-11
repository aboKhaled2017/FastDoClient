import TabPanel from '@/Commons/TabPanel';
import { Theme, Box, createStyles, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import MainHTabs from './Components/MainHTabs';
import { SearchDrugsView,StkDrugsPackagesView,EditStkDrugsPackage} from './SubView';
import { E_StkPackageViewSwitcher } from './Interfaces';

interface IProps {
    classes:{[key:string]:any}
    
}

const useStyles=makeStyles((theme:Theme)=>createStyles({
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
}))


const View:React.FC<IProps>=props=>{
   const [value,setValue]=React.useState(1);
    const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }
    const SwitchToView=(v:E_StkPackageViewSwitcher)=>{
        setValue(v);
    }
    const classes=useStyles();
        return (
           <Fragment>
               <Box>  
                   <MainHTabs className={classes.tabs} value={value} handleChange={handleChange}/>
                   <Box  className={classes.container}>
                        <TabPanel  value={value} index={0}>
                                
                                <SearchDrugsView SwitchTo={SwitchToView}/>
                        </TabPanel>
                        <TabPanel  value={value} index={1}>
                                
                                <StkDrugsPackagesView SwitchTo={SwitchToView}/>
                        </TabPanel>
                        <TabPanel  value={value} index={2}>                               
                                <EditStkDrugsPackage SwitchTo={SwitchToView}/>
                        </TabPanel>
                        
                   </Box>
               </Box>                        
           </Fragment>
        )
}

export default View as React.FC<{}>;