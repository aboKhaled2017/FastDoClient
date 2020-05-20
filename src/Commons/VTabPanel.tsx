import React from "react";
import { TabPanelProps } from "../Interfaces/UIsTypes";
import { Typography, Box } from "@material-ui/core";
import PropTypes from 'prop-types';

const VTabPanel= (props: TabPanelProps)=> {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
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