
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme, createStyles, Chip, TableFooter, Button, Box, Typography } from '@material-ui/core';
import React from 'react';

import { IStkDrugsPackage_FromStock_DrugData } from '../../../Interfaces.d';

const useStyles=makeStyles((theme:Theme)=>createStyles({
  table:{},
  thead:{
    '& .MuiTableCell-head':{
      color:`${theme.palette.secondary.dark} !important`
    }
  },
  tbody:{}
}));

interface IInnerStkPackageTableProps {
    drugs:IStkDrugsPackage_FromStock_DrugData[]
}


const TableView: React.FC<IInnerStkPackageTableProps> = (props) => {
  const classes=useStyles();
  const {drugs}=props;
  return (
      <Box>          
          <Table className={classes.table} aria-label="collapsible table">
              <TableHead className={classes.thead}>
                <TableRow>
                  <TableCell colSpan={1}>الراكد</TableCell>
                  <TableCell>السعر</TableCell>
                  <TableCell>الخصم</TableCell>
                  <TableCell>الكمية</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tbody}>
                {drugs.map((drg,i)=>(
                  <TableRow key={i}>
                    <TableCell>                
                    {drg.name}
                    </TableCell>
                    <TableCell>
                    {`${drg.price} ${'جنيه'}`}
                    </TableCell>
                    <TableCell>
                    {drg.discount+" %"}
                    </TableCell>
                    <TableCell>
                      {drg.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
      </Box>
  );
};

export default TableView;
