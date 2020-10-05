import React, { useEffect } from 'react'
import { IDataState } from '../../../../Interfaces/States'
import { connect } from 'react-redux'
import {  I_DrgRequest_I_Made_Data } from '../../../../Interfaces/DrugsTypes'
import {GetMy_DrgsReqs_IMade_Page} from '../../../../Redux/Actions/DataActions'
import { makeStyles, Theme, createStyles, Box, Backdrop, CircularProgress } from '@material-ui/core'
import PagingView from './Components/PagingView'
import CardView from './Components/CardView'
import Alert from '@material-ui/lab/Alert'
import DeleteAlertDialoge from './Components/DeleteAlertDialoge'
import axios from 'axios'
const useStyles=makeStyles((theme:Theme)=>createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
interface IProps {
    requests:I_DrgRequest_I_Made_Data
    GetMy_DrgsReqs_IMade_Page:()=>void
    loading:boolean
}
let selectedId:string=null as any as string;
const ShowRecvReqsts_View = (props: IProps) => {
    const classes=useStyles();
    const {GetMy_DrgsReqs_IMade_Page,requests,loading}=props;
    const [openDeleteReqDialog,setOpenDeleteReqDialoge]=React.useState(false);
    const [deleteReqDescision,setDeleteReqDescision]=React.useState({
        isAgreed:false,
        madeDescision:false,
        id:null as any as string
    });
    const [loadingForReq,setLoadingForReq]=React.useState(false);
    
    const cancelRequest=(id:string)=>{
        setOpenDeleteReqDialoge(true);
        selectedId=id;
    }
    React.useEffect(()=>{
        if(deleteReqDescision.madeDescision&&deleteReqDescision.isAgreed && deleteReqDescision.id){
            setLoadingForReq(true);
            axios.delete(`/phrdrgrequests/made/${deleteReqDescision.id}`)
            .then(res=>{
                setLoadingForReq(false);
            GetMy_DrgsReqs_IMade_Page();   
            })
            .catch(err=>{
                setLoadingForReq(false);
            if(err.status==404){
            alert('حدثت مشكلة اثناء معالجة الطلب'); 
                return;
            }
            if(!err.response) 
            {
                alert("خطأ فى الاتصال بالسيرفر");
                return;
            }
            var errorsResult=err.response.data.errors;
            alert(JSON.stringify(errorsResult))
            })
            .finally(()=>{
                setDeleteReqDescision(prev=>({
                id:prev.id,
                isAgreed:false,
                madeDescision:false
                }));
            })
        }
      },[deleteReqDescision.id])
    useEffect(()=>{
      if(loading) return;
      if(requests.rows==null)
      GetMy_DrgsReqs_IMade_Page();
    },[loading]);
    return (
    <Box>
      <DeleteAlertDialoge
         openDeleteDialog={openDeleteReqDialog}
         setDeleteDescision={setDeleteReqDescision}
         setOpenDeleteDialoge={setOpenDeleteReqDialoge}
         executeAfterConfirmOk={()=>{
            setDeleteReqDescision(prev=>({
                ...prev,
                id:selectedId
            }));
         }}
      />
      <Backdrop className={classes.backdrop}
                  open={loading}>
              <Box mx={2}>
                جارى تحميل البيانات
              </Box>
              <CircularProgress color="inherit" />
      </Backdrop>
      <PagingView/>
      <Box>
          {requests.rows!=null && requests.rows.length==0 &&
          <Alert severity="info" variant="outlined">
              انت لم تقم بارسال اى طلب على اى راكد حتى الان
          </Alert>
          }
          {requests.rows!=null && requests.rows.map(row=>(
              <Box key={row.id} my={1}>
                 <CardView   
                    model={row}
                    loading={selectedId==row.id?loadingForReq:false}
                    cancelRequest={cancelRequest}
                    />
              </Box>
          ))}
      </Box>
    </Box>)
}

export default connect((state:{data:IDataState})=>({
    requests:state.data.DrgsReq_I_made_Data,
    loading:state.data.loading
}), {GetMy_DrgsReqs_IMade_Page})(ShowRecvReqsts_View) as any
