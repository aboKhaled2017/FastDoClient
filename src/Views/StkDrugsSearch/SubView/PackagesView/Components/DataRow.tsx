import { makeStyles, TableCell, TableRow, Collapse, Box, Typography, Theme, createStyles,
     Button, IconButton, Chip} from "@material-ui/core";
import React, { Fragment } from "react";
import StyledTableRow from "../../Components/Tables/StyledTableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Delete';

import {packageService} from '@Views/StkDrugsSearch/Services/PackageServices';
import InnerStkPackageTable from "./InnerStkPackageTable";
import { IStkDrugsPackage ,E_IStkDrugsPackage_Status,E_StkPackageViewSwitcher} from "@Views/StkDrugsSearch/Interfaces.d";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>createStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      }
    },
    EditIcon:{
      color:theme.palette.info.main
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
React.FC<{row:IStkDrugsPackage,open:boolean}>=props=>{
    const { row ,open} = props;
    return <TableRow>
              <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                      <Box>
                         <InnerStkPackageTable rowData={row}/>
                      </Box>
                      </Typography>
                    </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
}

interface IRowViewProps{
  row: IStkDrugsPackage 
  SwitchTo:(v:E_StkPackageViewSwitcher)=>void
  onDeletePackage:(packId:string)=>void
}

const CountChip=(props:{count:Number,text:string})=>{
  return (
    <Fragment>
      <Chip style={{marginLeft:2}} label={props.count} color="primary"/>
  <span style={{marginLeft:5}}>{props.text}</span>    
    </Fragment>
  )
}

const getGeneralPackageStatus=(row:IStkDrugsPackage)=>{
 let stats=row.fromStocks.map(e=>e.status);
 let seens=row.fromStocks.map(e=>e.seen);
 let text='';
 if(seens.every(s=>!s)){
   text="لم يتم رؤية طلبك حتى الان";
 }
 else{
   var c=stats.filter(s=>s==E_IStkDrugsPackage_Status.Accepted);
   if(stats.length==c.length)
   text="لقد تم الموافقة على الطلبية بشكل كامل";
   else if(stats.length==1)
   text="لم يتم الموافقة حتى الان";
   else text="بعض لم المخازن لم توافق على الطلب بعد";
 }
  return <Chip label={text} variant="outlined"/>
}
const RowView:React.FC<IRowViewProps>=props=>{
    const classes = useStyles();
    const { row,SwitchTo,onDeletePackage}=props;
    const [open, setOpen] = React.useState(false);
    const OnPackageEditButtonClicked=(p:IStkDrugsPackage)=>{
          packageService.SetCurrentPackageToEdit(p.packageId);
          packageService.RegisterPackage(p);
          SwitchTo(E_StkPackageViewSwitcher.EditForPharmaStkDrugsPackages);
    }

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
            {row.createdAt.split('/').reverse().join('/')}
          </TableCell>

          {row.fromStocks.length>0 &&
          <Fragment>
          <TableCell align="center">
            <CountChip text="مخزن" count={row.fromStocks.length}/>
          </TableCell>
          <TableCell align="center">
            <CountChip text="راكد" count={row.fromStocks.reduce((prev,el)=>prev+el.drugs.length,0)}/>
          </TableCell>        
          <TableCell align="center">
            {getGeneralPackageStatus(row)}
          </TableCell>
          </Fragment>}
           {row.fromStocks.length===0 &&
           <TableCell colSpan={3}>
             <Alert severity="info">
              الطلبية فارغة  
             </Alert>
           </TableCell>
           }
          <TableCell align="center">
            <Box>
              <IconButton title="تعديل الطلبية"  size="small" 
                          onClick={() =>{OnPackageEditButtonClicked(row)}}>
                 <EditIcon className={classes.EditIcon}/>
              </IconButton>
              <IconButton title="حذف الطلبية"  size="small" onClick={() =>{onDeletePackage(row.packageId)}}>
                 <RemoveIcon color="secondary"/>
              </IconButton>
            </Box>
          </TableCell>
        </StyledTableRow>
        <DataCollapsedRow row={row} open={row.fromStocks.length>0?open:false}/>
        </React.Fragment>
    );
}

export default RowView;