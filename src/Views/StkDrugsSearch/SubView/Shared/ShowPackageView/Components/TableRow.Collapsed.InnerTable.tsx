import { IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { makeStyles, Theme, createStyles, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import RemoveIcon from '@material-ui/icons/DeleteRounded'
import ShowQuantityView from './ShowQuantity';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    table:{},
    thead:{
      '& .MuiTableCell-head':{
        color:`${theme.palette.secondary.dark} !important`
      }
    },
    tbody:{}
  }));
  

interface ITableRow_Collapsed_InnerTableProps {
    drugs:IStkDrugsPackage_FromStock_DrugData[]
    stockId:string
    onRemoveDrugsRow:(row:IStkDrugsPackage_FromStock_DrugData,stockId:string)=>void
    onSaveQuantityChange:(drugRowId:string,stockId:string,val:number)=>void
}

const TableRow_Collapsed_InnerTable: React.FC<ITableRow_Collapsed_InnerTableProps> =props => {
    const {drugs,stockId,onRemoveDrugsRow,onSaveQuantityChange}=props;
    const classes=useStyles();
    return (
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead className={classes.thead}>
            <TableRow>
                <TableCell colSpan={1}>المخزن</TableCell>
                <TableCell>الكمية</TableCell>
                <TableCell>السعر</TableCell>
                <TableCell>الخصم</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody className={classes.tbody}>
        {drugs.map((row,i)=>(
            <TableRow key={i}>
                <TableCell>                
                {row.name}
                </TableCell>
                <TableCell>                
                <ShowQuantityView val={row.quantity} 
                        stockId={stockId}
                        drugId={row.id}
                        SaveQuantityChange={onSaveQuantityChange}/>
                </TableCell>
                <TableCell>
                {`${row.price} ${'جنيه'}`}
                </TableCell>
                <TableCell>
                {row.discount+" %"}
                </TableCell>
                <TableCell>
                <IconButton onClick={e=>onRemoveDrugsRow(row,stockId)}>
                    <RemoveIcon color="secondary"/>
                </IconButton>
                </TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    );
};

export default TableRow_Collapsed_InnerTable;
