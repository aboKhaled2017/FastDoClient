
import { ISearchStkDrugData, ISearckStkDrugData_StockDrugsData, IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import React from 'react';

import {  Chip, createStyles, makeStyles, TableBody, TableCell, TableRow, Theme, withStyles } from '@material-ui/core';
import AddToPackageBtn from './AddToPackageBtn';


const useStyles=makeStyles((theme:Theme)=>createStyles({
  tbody:{}
}));
  
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


interface IViewProps {
    drugData:ISearchStkDrugData
}

const TableView_InnerTb_Body: React.FC<IViewProps> =props=> {
  const {drugData}=props;
  const classes=useStyles();
  
  return (
        <TableBody className={classes.tbody}>
          {drugData.stocks.map((row,i)=>(
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
                  <AddToPackageBtn row={row} drugName={drugData.name}/>
               </TableCell>
            </StyledTableRow>
          ))}
         </TableBody>
  )
};

export default TableView_InnerTb_Body;
