import StyledTableRow from '@/Views/ManageMyDrugs/Show/Components/StyledTableRow';
import {IStkDrugsPackage_FromStock, IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { makeStyles, Theme, createStyles, TableCell, IconButton } from '@material-ui/core';
import React, { Fragment } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RemoveIcon from '@material-ui/icons/DeleteOutlined'
import CollapsedTableRow from './TableRow.Collapsed';

const useStyles = makeStyles((theme: Theme) =>createStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      }
    },
    collapseCell:{
      padding: 2,
    width: 50,
    textAlign: 'center'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
  },
  discountColumn:{
    width:'100%',
    margin:'2px auto',
       '& span':{
        padding:' 2px 7px',
        width: '40%',
        display: 'inline-block',
        borderRadius:12
       },
       '& span:first-of-type':{
        background:' #ff9800',
        
       },
       '& span:nth-of-type(3)':{
        background:theme.palette.primary.main,
        color:'#fff'
       },
       '& span:nth-of-type(2)':{
        width:0,
       },
 
  }
 }));
 

interface ITableRowProps {
    row:IStkDrugsPackage_FromStock
    OnDeleteRow: (row: IStkDrugsPackage_FromStock) => void
    onSaveQuantityChange: (drugRowId: string, stockId: string, newVal: number) => void
    onRemoveDrugsRow: (drugRow: IStkDrugsPackage_FromStock_DrugData, stockId: string) => void
}

const TableRow: React.FC<ITableRowProps> =props=> {
  const {row,onSaveQuantityChange,onRemoveDrugsRow,OnDeleteRow}=props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);  
  if(row.drugs.length===0)return <Fragment/>; 

    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <TableCell className={classes.collapseCell}>
              <IconButton title="التفاصيل" 
                          aria-label="expand row" size="small" 
                          onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">
            {row.address}
          </TableCell>               
          <TableCell align="center">
            {row.drugs.length +" راكد"}
          </TableCell>
          <TableCell align="center">
           <IconButton onClick={e=>OnDeleteRow(row)}>
               <RemoveIcon color="secondary"/>
           </IconButton>
          </TableCell>
        </StyledTableRow>
           <CollapsedTableRow stock={row} 
                    open={open} 
                    onSaveQuantityChange={onSaveQuantityChange}
                    onRemoveDrugsRow={onRemoveDrugsRow}/>
        </React.Fragment>
    );
};

export default TableRow;
