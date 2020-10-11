import { makeStyles, TableCell, IconButton, TableRow, Collapse, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Backdrop, Theme, createStyles} from "@material-ui/core";
import React, { ReactElement } from "react";
import StyledTableRow from "./StyledTableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/EditRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import DrgTabs from './../Tabs';
import { I_Drug_DataModel } from "@/Interfaces/DrugsTypes";
import EditDrg_View from '../../Edit'
import axios from 'axios';
import { connect } from "react-redux";
import {Stop_Loading_Data,GetMyDrugs_Page,Set_Loading_Data} from '@Redux/Actions/DataActions'

import Alert from "@material-ui/lab/Alert";
const useRowStyles = makeStyles((theme: Theme) =>
createStyles({
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
}));


function LzDrgCollapsedRow(props: { row: I_Drug_DataModel,open:boolean}){
    const { row ,open} = props;
    return <TableRow>
              <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        كل ما يتعلق بالراكد
                      </Typography>
                      <DrgTabs model={row}/>
                    </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
}
interface IProps{
  row: I_Drug_DataModel 
  Stop_Loading_Data:()=>void
  GetMyDrugs_Page:()=>void
  Set_Loading_Data:()=>void
}
function LzDrugTableRow(props:IProps) {
    const classes = useRowStyles();
    const {row,GetMyDrugs_Page,Stop_Loading_Data,Set_Loading_Data}=props;
    //const initOpen=row.name=="antinal"?true:false;
    const [open, setOpen] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog,setOpenDeleteDialoge]=React.useState(false);
    const [deleteDescision,setDeleteDescision]=React.useState({
      isAgreed:false,
      madeDescision:false
    });
    const [openAlter,setOpenAlter]=React.useState(false);
    React.useEffect(()=>{
      if(deleteDescision.madeDescision&&deleteDescision.isAgreed){
        Set_Loading_Data();
        axios.delete(`/lzdrugs/${row.id}`)
        .then(res=>{           
            setOpenAlter(true);
            setTimeout(() => {
              setOpenAlter(false);
              GetMyDrugs_Page();
            }, 3000);
        })
        .catch(err=>{
        if(err.status==404){
          Stop_Loading_Data();
          alert('لا يمكن حذف هذا العنصر'); 
            return;
        }
        if(!err.response) 
        {
          Stop_Loading_Data();
            alert("خطأ فى الاتصال بالسيرفر");
            return;
        }
        Stop_Loading_Data();
        var errorsResult=err.response.data.errors;
        alert('لا يمكن حذف هذا العنصر');
       })
       }
    },[deleteDescision])
    const handleEdit=(e:any)=>{
       setOpenEditDialog(true);
    }
    const handleDelete=(e:any)=>{
       setOpenDeleteDialoge(true);
    }
    return (
      <React.Fragment>
        <div>
          <Dialog onClose={()=>{setOpenEditDialog(false)}} aria-labelledby="customized-dialog-title" open={openEditDialog}>
                  <DialogTitle id="customized-dialog-title">
                    تعديل بيانات الراكد
                  </DialogTitle>
                  <DialogContent dividers>
                    <EditDrg_View model={row}/>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={()=>{setOpenEditDialog(false)}} color="primary">
                    تم الانتهاء
                    </Button>
                  </DialogActions>
          </Dialog>
          <Dialog
              open={openDeleteDialog}
              onClose={()=>{setOpenDeleteDialoge(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  هل انت متأكد من حذف هذا الراكد
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>{
                  setDeleteDescision({
                    isAgreed:false,
                    madeDescision:true
                  })
                  setOpenDeleteDialoge(false);}} color="primary">
                  لست متأكد
                </Button>
                <Button onClick={()=>{
                  setDeleteDescision({
                  isAgreed:true,
                  madeDescision:true
                });setOpenDeleteDialoge(false);}} color="primary" autoFocus>
                  نعم متأكد
                </Button>
              </DialogActions>
          </Dialog>
          <Backdrop className={classes.backdrop}
                          open={openAlter} 
                          onClick={e=>{setOpenAlter(false)}}>
                    <Alert severity="success">
                        لقد تم حذف الراكد بنجاح
                    </Alert>
          </Backdrop>
        </div>
        <StyledTableRow className={classes.root}>
          <TableCell className={classes.collapseCell}>
            <IconButton title="التفاصيل" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">{row.type}</TableCell>
          <TableCell align="center">{row.price}</TableCell>
          <TableCell align="center">{row.quantity}</TableCell>
          <TableCell align="center">
             <div>
             <IconButton  title="تعديل بيانات الراكد"  onClick={handleEdit}>
              <EditIcon color="primary"/>
              </IconButton>
             <IconButton  title="حذف الراكد" onClick={handleDelete}>
              <DeleteForeverRoundedIcon color="secondary"/>
             </IconButton>
             </div>
          </TableCell>
        </StyledTableRow>
        <LzDrgCollapsedRow row={row} open={open}/>
        </React.Fragment>
    );
}

export default connect(null, {Stop_Loading_Data,GetMyDrugs_Page,Set_Loading_Data}
  )(LzDrugTableRow) as (props:{row:I_Drug_DataModel})=>ReactElement;