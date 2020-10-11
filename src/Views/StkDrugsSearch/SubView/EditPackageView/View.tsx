/* eslint-disable react/jsx-pascal-case */
import { Box, Button, CircularProgress, createStyles, makeStyles, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { Fragment, useEffect, useState } from 'react';
import { E_StkPackageViewSwitcher, IStkDrugsPackage, IStkDrugsPackage_FromStock, IStkDrugsPackage_FromStock_DrugData } from '../../Interfaces';
import {packageService} from '../../Services';
import { clone } from '@/Helpers/HelperArrayFuncs';
import {EditStkDrgsPackageStockRowView,EditPackageNameView} from './Components';
import SendIcon from '@material-ui/icons/Send';
import { App_BackDrop } from '@/components/Customs';
import {RequestServices} from './Services'
const useStyles =  makeStyles((theme: Theme) =>
createStyles({
   thead:{
     '& th':{
       background:theme.palette.info.light,
       fontSize:20,
       color:'#fff',
       border: '2px solid rgba(206, 206, 206, 0.56)',
       textAlign: 'center'
     }
   },
   MainTitle:{
     color:theme.palette.info.dark
   },
   backdrop: {
     zIndex: theme.zIndex.drawer + 1,
     color: '#fff',
   },
   table:{
     background:'transparent',
     width:'100%'
   },
   tbody:{
     background:'#fff',
     '& tr':{
       marginTop:3
     }
   }
}));


interface IViewProps {
  SwitchTo:(v:E_StkPackageViewSwitcher)=>void
}

const FlayableComponents:React.FC<{open:boolean,handleClose:any,mess:string}>=props=>{
  return (
    <Fragment>
        <Snackbar open={props.open} 
                  autoHideDuration={6000} 
                  anchorOrigin={{horizontal:"center",vertical:"top"}}
                  onClose={props.handleClose}>
          <Alert onClose={props.handleClose} severity="success">
            {props.mess}
          </Alert>
        </Snackbar>
    </Fragment>
  )
}
const View: React.FC<IViewProps> = props => {
  const [pack,setPack]=useState<IStkDrugsPackage>(null as any);
  const classes=useStyles();
  const [loading,setLoading]=useState(false);
  const [openAlertMess,setOpenAlertMess]=useState(false);
  const handleClickOpenAlertMess= () => {
    setOpenAlertMess(true);
  };

  const handleCloseAlertMess = (e:any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertMess(false);
  };
  useEffect(()=>{
    setPack(clone(packageService.GetCurrentPackageToProcessed()) as IStkDrugsPackage);
    return ()=>{
      packageService.HandleOnPackageFinishEditing();
    }
  },[]);
  const OnDeleteRow=(row:IStkDrugsPackage_FromStock)=>{
    let p=pack;
    p.fromStocks= p.fromStocks.filter(r=>r.id!==row.id);
    setPack(clone(p));
  }
  const onRemoveDrugsRow=(drugRow:IStkDrugsPackage_FromStock_DrugData,stockId:string)=>{
    let p=pack;
    let stkRow=p.fromStocks.find(e=>e.id===stockId) as IStkDrugsPackage_FromStock;
    let indOfStkRow=p.fromStocks.findIndex(r=>r.id===stockId);
    if(!stkRow)return;
    stkRow.drugs= stkRow.drugs.filter(d=>d.id!==drugRow.id);
    if(stkRow.drugs.length>0)
    p.fromStocks.splice(indOfStkRow,1,stkRow);
    else
    p.fromStocks.splice(indOfStkRow,1);
    setPack(clone(p));
  }
  const onSaveQuantityChange=(drugRowId:string,stockId:string,newVal:number)=>{
    if(!newVal || isNaN(newVal))return;
    let p=pack;
    let stkRow=p.fromStocks.find(e=>e.id===stockId) as IStkDrugsPackage_FromStock;
    let indOfStkRow=p.fromStocks.findIndex(r=>r.id===stockId);
    if(!stkRow)return;
    var editedDrug=stkRow.drugs.find(d=>d.id===drugRowId);
    if(!editedDrug)return;
    var indxOfDrug=stkRow.drugs.findIndex(d=>d.id===drugRowId);
    editedDrug.quantity=parseInt(newVal.toString());
    stkRow.drugs.splice(indxOfDrug,1,editedDrug);
    p.fromStocks.splice(indOfStkRow,1,stkRow);
    setPack(clone(p));
  }
  const OnSavePackageChanges=()=>{
    var body=packageService.GetPackageUpdatedBodyFromPackage(pack);
    setLoading(true);
    RequestServices.OnSavePackageChanges({
      packageId:pack.packageId,
      body,
      onComplete:()=>{
       setLoading(false);
      },
      onDone:()=>{
        handleClickOpenAlertMess();
      }
    })
  }
  const onNameChange=(name:string)=>{
    setPack({...pack,name});
  }

  if(!pack ||!pack.packageId)
  {
    return (
      <Box>
        <Alert severity="error">
          لايوجد اى طلبيات تم اختيارها ليتم تعديلها
        </Alert>
      </Box>
      );
  }
  
  return (
    <Fragment>
      <FlayableComponents open={openAlertMess} 
                          handleClose={handleCloseAlertMess} 
                          mess="تم تعديل الطلبية بنجاح"/>
      <Box>
        <Typography  variant="h5" className={classes.MainTitle} align="center">
          تعديل ({pack.name})
        </Typography>
        <Box style={{position:'relative'}}>         
            <App_BackDrop className={classes.backdrop}
                                open={loading}>                  
                    <CircularProgress color="inherit" />
            </App_BackDrop>
            <Box my={2}>
              <EditPackageNameView val={pack.name} onSaveNameChange={onNameChange}/>
            </Box>
            <Table className={classes.table} aria-label="collapsible table">
                <TableHead className={classes.thead}>
                  <TableRow>
                    <TableCell colSpan={2}>اسم المخزن</TableCell>
                    <TableCell>العنوان</TableCell>
                    <TableCell>اجمالى عدد الرواكد</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tbody}>
                  {pack.fromStocks.length===0&&
                  <TableCell colSpan={5}>
                      <Alert severity="info">
                        الطلبية لا يوجد بها عناصر مضافة
                      </Alert>
                  </TableCell>
                  } 
                  {pack.fromStocks.map((row,i)=> (
                    <EditStkDrgsPackageStockRowView key={i} 
                                                    row={row} 
                                                    onDelete={OnDeleteRow} 
                                                    onSaveQuantityChange={onSaveQuantityChange}
                                                
                                                    onRemoveDrugsRow={onRemoveDrugsRow}/>
                  ))}
                </TableBody>
              </Table> 
        </Box> 
        <Box mt={3}>
          <Button  color="primary" 
                    disabled={loading}
                    onClick={OnSavePackageChanges}
                    variant="contained"
                    endIcon={<SendIcon/>}>
              حفظ التغيرات
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default View;
