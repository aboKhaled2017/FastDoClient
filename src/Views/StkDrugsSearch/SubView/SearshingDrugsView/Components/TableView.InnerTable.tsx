
import { Table, TableHead, TableRow, TableCell, makeStyles, 
  Theme, createStyles, TableFooter, Button, Box, TableContainer, Paper } from '@material-ui/core';
import React from 'react';
import MoreIcon from '@material-ui/icons/More'
import { ISearchStkDrugData } from '../../../Interfaces';
import TableBodyComponent from './TableView.InnerTb.Body'
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

interface IViewProps {
  rowData:ISearchStkDrugData
}
const InnerStkDrugTable: React.FC<IViewProps> = (props) => {
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
          <TableBodyComponent drugData={props.rowData}/>

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
