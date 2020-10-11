import { IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { Box, createStyles, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TextField, Theme } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import RemoveIcon from '@material-ui/icons/DeleteRounded'
import EditIcon from '@material-ui/icons/EditRounded'
import SaveBtn from '@material-ui/icons/CheckCircleRounded';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    table:{},
    EditIcon:{
        color:theme.palette.info.main,
        fontSize:15
    },
    thead:{
      '& .MuiTableCell-head':{
        color:`${theme.palette.secondary.dark} !important`
      }
    },
    tbody:{}
  }));
  
interface IInnerDrugsTableProps {
drugs:IStkDrugsPackage_FromStock_DrugData[]
stockId:string
onRemoveDrugsRow:(row:IStkDrugsPackage_FromStock_DrugData,stockId:string)=>void
onSaveQuantityChange:(drugRowId:string,stockId:string,val:number)=>void
}
interface IShowQuantityCom{
    val:number 
    stockId:string 
    drugId:string
    SaveQuantityChange:(drugRowId:string,stockId:string,val:number)=>void
}

const ShowQuantityCom:React.FC<IShowQuantityCom>=(props)=>{
 const classes=useStyles();
 const {val,SaveQuantityChange,stockId,drugId}=props;
 const [open,setOpen]=useState(false);
 const [value,setValue]=useState(val);
 const onEdit=()=>{
     setOpen(true);
 }
 const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
   setValue(e.target.value as any);
 }
 const onSave=()=>{
     SaveQuantityChange(drugId,stockId,value);
     setValue((!value || isNaN(value))?val:value);
     setOpen(false);
 }
 return (
     <Box display="flex" aria-orientation="horizontal">
         {!open&&
         <Fragment>
            <Box alignSelf="center">
            {val}
            </Box>
            <Box>
                <IconButton size="small" onClick={onEdit}>
                    <EditIcon  className={classes.EditIcon}/>
                </IconButton>
            </Box>
         </Fragment>
         }
         {open&&
         <Box>
             <TextField value={value}
                        onChange={onChange}/>
             <IconButton size="small" onClick={onSave}>
               <SaveBtn  color="primary"/>
             </IconButton>
         </Box>
         }
     </Box>
 )
}
const InnerDrugsTable: React.FC<IInnerDrugsTableProps> = props => {
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
          <ShowQuantityCom val={row.quantity} 
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

export default InnerDrugsTable;
