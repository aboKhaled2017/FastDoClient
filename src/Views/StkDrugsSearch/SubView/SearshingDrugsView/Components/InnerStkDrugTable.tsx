
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme, createStyles, Chip, TableFooter, Button, Box, TableContainer, Paper, withStyles } from '@material-ui/core';
import React from 'react';
import MoreIcon from '@material-ui/icons/More'
import { ISearchStkDrugData, ISearckStkDrugData_StockDrugsData } from '../../../Interfaces';
import AddIcon from '@material-ui/icons/Add';
import { StyledTableCell } from '.';


const useStyles=makeStyles((theme:Theme)=>createStyles({
  root:{
    width:'100%'
  },
  table:{},
  addToPackageBtn:{
    background:theme.palette.info.dark,
    color:'#fff',
    '&:hover':{
      background:theme.palette.info.light,
    }
  },
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

const StyledTableRow = withStyles((theme:Theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const JoinToStockStatus=(props:{isJoin:boolean})=>{
    var text= props.isJoin?'منضم الى هذا المخزن':'غير منضم';
    return <Chip label={text} color={props.isJoin?"primary":"default"}/>
}

const TbBodyComp:React.FC<{stocks:ISearckStkDrugData_StockDrugsData[]}>=props=>{
  const classes=useStyles();
  return (
        <TableBody className={classes.tbody}>
          {props.stocks.map((row,i)=>(
            <StyledTableRow key={i}>
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
               <TableCell>
                 <Button variant="contained" 
                         disabled={!row.isJoinedTo}
                         title={'اضف الى الطلبية'}
                         endIcon={<AddIcon/>}
                         className={classes.addToPackageBtn}>
                     اضف الى الطلبية
                 </Button>
               </TableCell>
            </StyledTableRow>
          ))}
         </TableBody>
  )
}

const InnerStkDrugTable: React.FC<IInnerStkDrugTableProps> = (props) => {
  const classes=useStyles();
  const {rowData:{stockCount,stocks}}=props;
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} 
            stickyHeader  
            aria-label="sticky table">
          <TableHead className={classes.thead}>
            <TableRow>
              <StyledTableCell colSpan={1}>المخزن</StyledTableCell>
              <StyledTableCell>السعر</StyledTableCell>
              <StyledTableCell>الخصم</StyledTableCell>
              <StyledTableCell>حالة الانضمام</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TbBodyComp stocks={stocks}/>

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
    </TableContainer>
  );
};

export default InnerStkDrugTable;
