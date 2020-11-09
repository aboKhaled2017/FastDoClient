import { makeStyles, Table, TableHead, TableRow,
  TableCell, TableBody, createStyles, Theme, TableContainer, Paper, withStyles,  } from "@material-ui/core";
import React, { Fragment } from "react";
import StkDrugTableRow from './DataRow'

import Alert from "@material-ui/lab/Alert";

import { ISearchStkDrugData } from "@/Views/StkDrugsSearch/Interfaces";
import { StyledTableCell } from ".";
import { IStockGData } from '../../../../../Interfaces/ModelsTypes';

const useStyles =  makeStyles((theme: Theme) =>
createStyles({
  root:{
    'width':'100%'
  },
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
 isStockSelcted:boolean
 onSelectStockName:(s:IStockGData)=>void
}
const TableView:React.FC<ITableViewProps>=props=>{
   const classes=useStyles();  
   const {rows,isStockSelcted,onSelectStockName}=props;
   return (
  <TableContainer  component={Paper} className={classes.root}>
      <Table className={classes.table} stickyHeader  aria-label="striky table">
        <TableHead className={classes.thead}>
          <TableRow>
            <StyledTableCell colSpan={isStockSelcted?4:2}>اسم الدواء</StyledTableCell>
            {!isStockSelcted &&
            <Fragment>
                <StyledTableCell>عدد المخان التى  يتواجد لديها</StyledTableCell>
                <StyledTableCell>اعلى خصم من بين المخازن</StyledTableCell>
            </Fragment>
            }
        
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
            <StkDrugTableRow key={i} isStockSelcted={isStockSelcted}  
                             onSelectStockName={onSelectStockName}
                             row={row} />
          ))}
        </TableBody>
      </Table>
  </TableContainer>
   );
}

export default TableView;