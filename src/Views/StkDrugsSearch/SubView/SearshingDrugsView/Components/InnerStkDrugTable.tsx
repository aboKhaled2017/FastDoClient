
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme, createStyles, Chip, TableFooter, Button, Box } from '@material-ui/core';
import React from 'react';
import MoreIcon from '@material-ui/icons/More'
import { ISearchStkDrugData } from '../../../Interfaces';

const useStyles=makeStyles((theme:Theme)=>createStyles({
  table:{},
  thead:{
    '& .MuiTableCell-head':{
      color:`${theme.palette.secondary.dark} !important`
    }
  },
  tbody:{}
}));

interface IInnerStkDrugTableProps {
    rowData:ISearchStkDrugData
}

const JoinToStockStatus=(props:{isJoin:boolean})=>{
    var text= props.isJoin?'منضم الى هذا المخزن':'غير منضم';
    return <Chip label={text} color={props.isJoin?"primary":"default"}/>
}
const InnerStkDrugTable: React.FC<IInnerStkDrugTableProps> = (props) => {
  const classes=useStyles();
  const {rowData:{stockCount,stocks}}=props;
  return (
    <Table className={classes.table} aria-label="collapsible table">
         <TableHead className={classes.thead}>
           <TableRow>
             <TableCell colSpan={1}>المخزن</TableCell>
             <TableCell>السعر</TableCell>
             <TableCell>الخصم</TableCell>
             <TableCell>حالة الانضمام</TableCell>
           </TableRow>
         </TableHead>
         <TableBody className={classes.tbody}>
          {stocks.map((row,i)=>(
            <TableRow key={i}>
              <TableCell>                
               {row.stockName}
               </TableCell>
               <TableCell>
               {`${row.price} ${'جنيه'}`}
               </TableCell>
               <TableCell>
               {row.discount+" %"}
               </TableCell>
               <TableCell>
                <JoinToStockStatus isJoin={row.isJoinedTo}/>
               </TableCell>
            </TableRow>
          ))}
         </TableBody>
         {stockCount>stocks.length &&
         <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <Box alignContent="center">
                <Button variant="text" color="primary" endIcon={
                    <MoreIcon/>
                }>
                  المزيد من المخازن التى تحوى هذا الراكد
                </Button>
              </Box>
            </TableCell>
          </TableRow>
         </TableFooter>
         }
    </Table>
  );
};

export default InnerStkDrugTable;
