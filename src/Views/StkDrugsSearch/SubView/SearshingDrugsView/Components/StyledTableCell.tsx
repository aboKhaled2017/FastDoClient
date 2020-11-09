import { withStyles, Theme, TableCell } from '@material-ui/core';
import React from 'react';

interface IStyledTableCellProps {}

export default withStyles((theme:Theme)=>({
    root:{
      minWidth:'100px',
      whiteSpace:'nowrap'
    }
  }))(TableCell);


