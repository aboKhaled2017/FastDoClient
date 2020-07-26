import React from 'react'
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import { a11yProps } from '../../../../Commons/Services';
import TabPanel from '../../../../Commons/VTabPanel';
import DrugDetails from './DrugDetails';
import AddToPackage from './AddToPackage';
import PackageStatus from './PackageStatus';
import { I_Drug_DataModel, E_LzDrg_ConsumeType } from '../../../../Interfaces/DrugsTypes';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
}));
export default(props:{model:I_Drug_DataModel})=>{
const classes = useStyles();
const [value, setValue] = React.useState(0);
const {model}=props;
const handleChange = (e: React.ChangeEvent<{}>, newValue:number) => {
    setValue(newValue);
};
return (
    <div className={classes.root}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
            <Tab label="كل البيانات" {...a11yProps(0)} />
            <Tab disableFocusRipple label="اضف الى باكج" {...a11yProps(1)} disabled={model.consumeType==E_LzDrg_ConsumeType.burning}/>
            <Tab disableFocusRipple label="حالةالراكد" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
           <DrugDetails model={model}/>
        </TabPanel>
        <TabPanel value={value} index={1} disbaled={model.consumeType==E_LzDrg_ConsumeType.burning}>
            <AddToPackage model={model}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <PackageStatus model={model}/>
        </TabPanel>
    </div>
);
}