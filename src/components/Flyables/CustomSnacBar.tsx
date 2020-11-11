import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { Fragment } from 'react';

interface ICustomSnacBarProps {
    open:boolean
    handleClose:any
    mess:string
}

const CustomSnacBar: React.FC<ICustomSnacBarProps>=props=>{
    return (
        <Fragment>
            <Snackbar open={props.open} 
                      autoHideDuration={6000} 
                      anchorOrigin={{horizontal:"center",vertical:"top"}}
                      onClose={props.handleClose}>
              <Alert onClose={props.handleClose} severity="success">
                {props.mess}
              </Alert>
            </Snackbar>
        </Fragment>
      )
};

export default CustomSnacBar;
