
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme, createStyles, Chip, TableFooter, Button, Box, Typography } from '@material-ui/core';
import React from 'react';
import StkDrugDataRow from './ٍStockDrugsDataRow';
import { IStkDrugsPackage } from '../../../Interfaces';

const useStyles =  makeStyles((theme: Theme) =>
createStyles({
   thead:{
     '& th':{
       background:'#ff9800',
       fontSize:20,
       color:'#fff',
       border: '2px solid rgba(206, 206, 206, 0.56)',
       textAlign: 'center'
     }
   },
   backdrop: {
     zIndex: theme.zIndex.drawer + 1,
     color: '#fff',
   },
   table:{
     background:'transparent',
     width:'100%'
   },
   tbody:{
     background:'#fff',
     '& tr':{
       marginTop:3
     }
   }
}));


interface IInnerStkPackageTableProps {
    rowData:IStkDrugsPackage
}


const InnerStkDrugTable: React.FC<IInnerStkPackageTableProps> = (props) => {
  const classes=useStyles();
  const {rowData:{fromStocks}}=props;
  return (  
        <Table className={classes.table} aria-label="collapsible table">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell colSpan={2}>اسم المخزن</TableCell>
              <TableCell>العنوان</TableCell>
              <TableCell>حالة الطلب</TableCell>
              <TableCell>حالة الرؤية</TableCell>
              <TableCell>اجمالى عدد الرواكد</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {fromStocks.map((row,i)=> (
               <StkDrugDataRow key={i} row={row} />
            ))}
          </TableBody>
        </Table>  
  );
};

export default InnerStkDrugTable;
