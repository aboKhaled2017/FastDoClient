import { makeStyles, Table, TableHead, TableRow,
  TableCell, TableBody, createStyles, Theme,  } from "@material-ui/core";
import React from "react";
import StkDrugTableRow from './DataRow'

import Alert from "@material-ui/lab/Alert";

import { ISearchStkDrugData } from "@/Views/StkDrugsSearch/Interfaces";

const useStyles =  makeStyles((theme: Theme) =>
createStyles({
   thead:{
     '& th':{
       background:'#008394',
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
     background:'transparent'
   },
   tbody:{
     background:'#fff'
   }
}));

interface ITableViewProps{
 rows:ISearchStkDrugData[]
}
const TableView:React.FC<ITableViewProps>=props=>{
   const classes=useStyles();  
   const {rows}=props;
   return (
    <Table className={classes.table} aria-label="collapsible table">
    <TableHead className={classes.thead}>
      <TableRow>
        <TableCell colSpan={2}>اسم الدواء</TableCell>
        <TableCell>عدد المخان التى  يتواجد لديها</TableCell>
        <TableCell>اعلى خصم من بين المخازن</TableCell>
     
      </TableRow>
    </TableHead>
    <TableBody className={classes.tbody}>
      {rows.length===0 && 
      <TableRow>
         <TableCell colSpan={5}>
          <Alert severity="warning">
            لايوجد بيانات للعرض
          </Alert>
         </TableCell>
      </TableRow>
      }
      {rows.map((row,i)=> (
        <StkDrugTableRow key={i}
                         
                         row={row} />
      ))}
    </TableBody>
  </Table>
   );
}

export default TableView;