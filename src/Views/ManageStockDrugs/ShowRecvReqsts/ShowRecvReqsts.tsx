import React, { useEffect } from 'react'
import { IDataState } from '../../../Interfaces/States'
import { connect } from 'react-redux'
import { I_DrgRequest_I_Received_Data } from '../../../Interfaces/DrugsTypes'
import {GetMy_DrgsReqs_IRecieved_Page} from '../../../Redux/Actions/DataActions'
import { makeStyles, Theme, createStyles, Box, Backdrop, CircularProgress } from '@material-ui/core'
import PagingView from './Components/PagingView'
import CardView from './Components/CardView'
import Alert from '@material-ui/lab/Alert'
const useStyles=makeStyles((theme:Theme)=>createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
interface IProps {
    requests:I_DrgRequest_I_Received_Data
    GetMy_DrgsReqs_IRecieved_Page:()=>void
    loading:boolean
}

const ShowRecvReqsts_View = (props: IProps) => {
    const classes=useStyles();
    const {GetMy_DrgsReqs_IRecieved_Page,requests,loading}=props;
    useEffect(()=>{
      if(loading) return;
      if(requests.rows==null)
      GetMy_DrgsReqs_IRecieved_Page();
    },[loading]);
    return (
    <Box>
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
              لم يتم ارسال اى طلب على اى راكد حتى الان
          </Alert>
          }
          {requests.rows!=null && requests.rows.map(row=>(
              <Box key={row.id} my={1}>
                 <CardView model={row}/>
              </Box>
          ))}
      </Box>
    </Box>)
}

export default connect((state:{data:IDataState})=>({
    requests:state.data.DrgsReq_I_recieved_Data,
    loading:state.data.loading
}), {GetMy_DrgsReqs_IRecieved_Page})(ShowRecvReqsts_View) as any
