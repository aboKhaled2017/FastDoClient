import { Box, Collapse, createStyles, IconButton, makeStyles, TableCell, TableRow, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { IStkDrugsPackage_FromStock, IStkDrugsPackage_FromStock_DrugData } from '../../../Interfaces';
import StyledTableRow from '../../Components/Tables/StyledTableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RemoveIcon from '@material-ui/icons/DeleteOutlined'
import InnerDrugsTablePerStock from './InnerDrugsTable';

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
 

interface IRowViewProps {
    row:IStkDrugsPackage_FromStock
    onDelete:(row:IStkDrugsPackage_FromStock)=>void
    onRemoveDrugsRow:(drugRow:IStkDrugsPackage_FromStock_DrugData,stockId:string)=>void
    onSaveQuantityChange:(drugRowId:string,stockId:string,val:number)=>void
}

interface IDataCollapsedRow{
    stock:IStkDrugsPackage_FromStock,
    open:boolean
    onRemoveDrugsRow:(drugRow:IStkDrugsPackage_FromStock_DrugData,stockId:string)=>void
    onSaveQuantityChange:(drugRowId:string,stockId:string,val:number)=>void
}
const DataCollapsedRow:
React.FC<IDataCollapsedRow>=props=>{
   const { stock:{drugs,id},onRemoveDrugsRow,open,onSaveQuantityChange} = props;
   return <TableRow>
             <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                 <Collapse in={open} timeout="auto" unmountOnExit>
                   <Box margin={1}>
                     <Typography variant="h6" gutterBottom component="div">
                     <Box>
                       <InnerDrugsTablePerStock drugs={drugs} stockId={id} 
                                                onSaveQuantityChange={onSaveQuantityChange}
                                                onRemoveDrugsRow={onRemoveDrugsRow}/>
                     </Box>
                     </Typography>
                   </Box>
                 </Collapse>
             </TableCell>
           </TableRow>
}

const RowView:React.FC<IRowViewProps>=props=>{
    const classes = useStyles();
    const { row,onDelete,onRemoveDrugsRow,onSaveQuantityChange}=props;
    
    const [open, setOpen] = React.useState(false);  
    
    if(row.drugs.length===0)return <></>; 
    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <TableCell className={classes.collapseCell}>
              <IconButton title="التفاصيل" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
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
           <IconButton onClick={e=>onDelete(row)}>
               <RemoveIcon color="secondary"/>
           </IconButton>
          </TableCell>
        </StyledTableRow>
           <DataCollapsedRow stock={row} open={open} 
                             onSaveQuantityChange={onSaveQuantityChange}
                             onRemoveDrugsRow={onRemoveDrugsRow}/>
        </React.Fragment>
    );
}

export default RowView;
