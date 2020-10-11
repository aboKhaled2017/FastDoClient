import { makeStyles, TableCell, TableRow, Collapse, Box, Typography, Theme, createStyles,
    Button, IconButton, Chip} from "@material-ui/core";
import React, { Fragment } from "react";
import StyledTableRow from "../../Components/Tables/StyledTableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import InnerTable from "./InnerStkPackageDrugsTable";
import { IStkDrugsPackage_FromStock ,E_IStkDrugsPackage_Status} from "../../../Interfaces.d";
import { IStkDrugsPackage_FromStock_DrugData } from '../../../Interfaces';

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

const DataCollapsedRow:
React.FC<{drugs:IStkDrugsPackage_FromStock_DrugData[],open:boolean}>=props=>{
   const { drugs ,open} = props;
   return <TableRow>
             <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                 <Collapse in={open} timeout="auto" unmountOnExit>
                   <Box margin={1}>
                     <Typography variant="h6" gutterBottom component="div">
                     <Box>
                       <InnerTable drugs={drugs}/>
                     </Box>
                     </Typography>
                   </Box>
                 </Collapse>
             </TableCell>
           </TableRow>
}

interface IRowViewProps{
 row: IStkDrugsPackage_FromStock 
}

const StatusChip=(props:{status:E_IStkDrugsPackage_Status})=>{
 const {status}=props;
 let text='لم يتم الرد',color:'default'|'primary'|'secondary'="default";
 if(status==E_IStkDrugsPackage_Status.Accepted){
  text="تم قبول الطلبية";color="primary";
 }
 else if(status==E_IStkDrugsPackage_Status.Rejected){
 text="تم رفض الطلبية";color="secondary";
 }
 else if(status==E_IStkDrugsPackage_Status.CanceledFromStk){
 text="تم الغاء الطلب من قبل المخزن";color="secondary";
 }
 return  <Chip label={text} color={color}/>
}
const SeenChip=(props:{seen:boolean})=>{
    const {seen}=props;
    let text='لم يتم الرد',color:'default'|'primary'|'secondary'="default";
    if(seen){
     text="تم رؤية الطلبية";color="primary";
    }
    else{
    text="لم يتم رؤية الطلبية";
    }
    return  <Chip label={text} color={color}/>
}
const RowView:React.FC<IRowViewProps>=props=>{
   const classes = useStyles();
   const { row}=props;
   
   const [open, setOpen] = React.useState(false);   
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
           <StatusChip  status={row.status}/>
         </TableCell>

         <TableCell align="center">
           <SeenChip seen={row.seen}/>
         </TableCell>        
         <TableCell align="center">
           {row.drugs.length +" راكد"}
         </TableCell>
       </StyledTableRow>
          <DataCollapsedRow drugs={row.drugs} open={open}/>
       </React.Fragment>
   );
}

export default RowView;