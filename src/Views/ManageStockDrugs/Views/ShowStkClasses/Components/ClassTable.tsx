import { makeStyles, TableContainer, Paper, Table, TableHead, 
  TableRow, TableCell, TableBody, createStyles, Theme, Backdrop,
   CircularProgress, Box, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import React, { Fragment } from "react";
import ClassRow from './ClassRow'
import axios from 'axios';

import Alert from "@material-ui/lab/Alert";
import store from "@Redux/store";
import { setUserIdentity } from "@Redux/Actions/userActions";
import AddStkClassButton from './AddStkClass';
import { IPharmasStockClass } from "@/Interfaces/AccountTypes";
import DeleteDialogView from './DeleteDialog';
import RenameDialogView  from './RenameDialog';
import {handlePharmaClassDelete} from '../Services';


const useStyles =  makeStyles((theme: Theme) =>
createStyles({
    root: {
      width: '100%',
      background:'transparent',
      boxShadow:'none'
    },
    container: {
      maxHeight: 880,
    },
    thead:{
      '& th':{
        background:'#008394',
        fontSize:20,
        color:'#fff',
        border: '2px solid rgba(206, 206, 206, 0.56)',
        textAlign: 'center'
      }
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    table:{
      background:'transparent'
    },
    tbody:{
      background:'#fff'
    }
}));
interface IProps{
  PharmasClasses:IPharmasStockClass[]
}

const alertMessages=['لقد تم حذف التصنيف بنجاح','لقد تم اضافة التصنيف بنجاح','لقد تم تعديل الاسم بنجاح'];
export default (props:IProps)=>{
    const classes=useStyles();
    const {PharmasClasses}=props;
    const [alertMess,setAlertMess]=React.useState(0);
    const [openDeleteDialog,setOpenDeleteDialoge]=React.useState(false); 
    const [openRenameDialog,setOpenRenameDialog]=React.useState(false);
    const [openAlter,setOpenAlter]=React.useState(false);
    const [loading,setLoading]=React.useState(false);
    const [errors,setErrors]=React.useState<{
      replaceClassId?:string[]
      G?:string
     }>({})
    const [selectedClass,setSelectedClass]=React.useState<IPharmasStockClass>({} as any);
    const [deleteDescision,setDeleteDescision]=React.useState({
      isAgreed:false,
      madeDescision:false,
      replacedClass:null as any as IPharmasStockClass
    });
    
    //for delete
    React.useEffect(()=>{
      handlePharmaClassDelete({
        deleteDescision:deleteDescision,
        selectedClass:selectedClass,
        setDeleteDescision:setDeleteDescision,
        setErrors:setErrors,
        setLoading:setLoading,
        setOpenAlter:setOpenAlter,
        setOpenDeleteDialoge:setOpenDeleteDialoge
      });
    },[deleteDescision])

    const OnDeletePharmaClassBtnClicked=(model:IPharmasStockClass)=>{
      setAlertMess(0);
      setSelectedClass(model);
      setDeleteDescision(p=>({...p,replacedClass:null as any}))
      setOpenDeleteDialoge(true);
    }
    const OnRenamePharmaClassBtnClicked=(model:IPharmasStockClass)=>{
      setAlertMess(2);
      setSelectedClass(model);
      setOpenRenameDialog(true);
    }
    const OnNewPharmaClassAdded=(refresh:()=>void)=>{
       setAlertMess(1);
       setOpenAlter(true);
       setTimeout(() => {
         setOpenAlter(false);
         refresh();
       }, 2000);
    }
    const ShowBackDrop=()=>{
      return (
        <Backdrop className={classes.backdrop}
                          open={openAlter} 
                          onClick={e=>{setOpenAlter(false)}}>
                    <Alert severity="success">
                        {alertMessages[alertMess]}
                    </Alert>
        </Backdrop>
      )
    }
    const OnDeleteDialogOk=()=>{
      setDeleteDescision(p=>({
        ...p,
        isAgreed:true,
        madeDescision:true
      }));
    }
    return (
      <React.Fragment>
            <DeleteDialogView deleteDecision={deleteDescision}
                              setOpen={setOpenDeleteDialoge}
                              open={openDeleteDialog}
                              errors={errors}
                              model={selectedClass}
                              onDeleteDialogOk={OnDeleteDialogOk}
                              replacedClasses={PharmasClasses.filter(c=>c.id!=selectedClass.id)}
                              setDeleteDescision={setDeleteDescision}
                              loading={loading}/>
            <RenameDialogView model={selectedClass}
                              open={openRenameDialog}
                              setOpen={setOpenRenameDialog}
            />
            <ShowBackDrop/>
            <TableContainer component={Paper} className={classes.root}>
              <Box>
                <Box my={1}>
                  <AddStkClassButton onNewClassAdded={OnNewPharmaClassAdded}
                                     pharmasClasses={PharmasClasses}/>
                </Box>
                <Table className={classes.table} aria-label="collapsible table">
                <TableHead className={classes.thead}>
                  <TableRow>
                    <TableCell>اسم التصنيف</TableCell>
                    <TableCell>عدد الصيدليات التابعة لهذا التصنيف</TableCell>
                    <TableCell>التحكم</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tbody}>
                  {PharmasClasses.length==0 && 
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Alert severity="warning">
                        لايوجد اى تصنيفات للعرض
                      </Alert>
                    </TableCell>
                  </TableRow>
                  }
                  {PharmasClasses.map((row:IPharmasStockClass)=> (
                    <ClassRow key={row.name} 
                              OnDeletePharmaClass={OnDeletePharmaClassBtnClicked}
                              OnRenamePharmaClass={OnRenamePharmaClassBtnClicked}
                              ClassesCount={PharmasClasses.length}
                              ClassModel={row} />
                  ))}
                </TableBody>
              </Table>
              </Box>
            </TableContainer>
      </React.Fragment>
    );
}
