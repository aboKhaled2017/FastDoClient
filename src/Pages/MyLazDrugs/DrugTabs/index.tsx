import React from 'react'
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import { a11yProps } from '../../../Commons/Services';
import TabPanel from '../../../Commons/VTabPanel';
import { ILzDrugsTableRow, ILazDrugModel } from '../../../Interfaces/ModelsTypes';
import DrugDetails from './DrugDetails';
import AddToPackage from './AddToPackage';
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
export default(props:{model:ILazDrugModel})=>{
const classes = useStyles();
const [value, setValue] = React.useState(0);
const {model}=props;
const handleChange = (event: React.ChangeEvent<{}>, newValue:number) => {
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
            <Tab label="اضف الى باكج" {...a11yProps(1)} />
            <Tab label="حالةالراكد" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
           <DrugDetails model={model}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <AddToPackage model={model}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
    </div>
);
}