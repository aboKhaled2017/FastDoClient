import React from 'react'
import { makeStyles, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { a11yProps } from '../../Commons/Services';
import TabPanel from '../../Commons/VTabPanel';
import {MyStocksView,SearchStocksView,RequestedStocksView} from './Views'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      '& .MuiTab-root':{
          padding:'6px 40px'
      }
    },
}));
export default(props:{})=>{
const classes = useStyles();
const [value, setValue] = React.useState(1);
const {}=props;
const handleChange = (e: React.ChangeEvent<{}>, newValue:number) => {
    setValue(newValue);
};
return (
    <Box>
        <Box>
            <Typography align="center" color="primary" variant="h4">
                        صفحة المخازن التى اتعامل معها
            </Typography>
        </Box>
        <Box mt={2}>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="المخازن المتعاقد معها" {...a11yProps(0)} />
                    <Tab disableFocusRipple label="البحث عن مخازن اخرى" {...a11yProps(1)}/>
                    <Tab disableFocusRipple label="مخازن تم طلبها" {...a11yProps(1)}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                  <MyStocksView/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SearchStocksView/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RequestedStocksView/>
                </TabPanel>
            </div>
        </Box>
    </Box>
);
}