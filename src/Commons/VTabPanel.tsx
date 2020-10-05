import React from "react";
import { TabPanelProps } from "../Interfaces/UIsTypes";
import { Typography, Box, makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
const useStyles= makeStyles((theme) => ({
  panel:{
    width:'100%'
  }
}))
const VTabPanel= (props: TabPanelProps)=> {
    const { children, value,disbaled, index, ...other } = props;
    const classes=useStyles();
    return (
      disbaled
      ?<div></div> 
      :<div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        className={classes.panel}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
}
VTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default VTabPanel;