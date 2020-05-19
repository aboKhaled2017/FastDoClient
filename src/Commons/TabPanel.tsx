import React from "react";
import { TabPanelProps } from "../Interfaces/UIsTypes";
import { Typography, Box } from "@material-ui/core";


export default (props: TabPanelProps)=> {
    const { children, value, index, ...other } = props;
    return (
    <Typography
        component="div"
        role="tabpanel"
        >
    {value === index && <Box p={3}>{children}</Box>}
    </Typography>
    )
}