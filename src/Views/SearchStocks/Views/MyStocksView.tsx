import { Backdrop, Box, CircularProgress, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import React, { Component, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import {PaginationView, MyStockInfoCard } from '../Components'
import { IMyJoinedStockDataModel, IPagination, I_PaginationReq_To_GetPage } from '../Interfaces'
import { MessageAlerter } from '../../../Commons/Services';
import { Make_Url_With_PaginationData_Params } from '../Services';
import { Alert } from '@material-ui/lab';

interface Props {
    
}
interface State {
    
}
interface IDataStatus{
    loading:boolean
    rows:IMyJoinedStockDataModel[]
}
const useStyles=makeStyles((theme:Theme)=>createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export default ()=>{
    const classes=useStyles();
    const [dataStatus,setDataStatus]=useState<IDataStatus>({
        loading:false,
        rows:[]
    });
    useEffect(()=>{
     getPageOfMyStocks();    
    },[]);
    const HandleRefresh=()=>{
        getPageOfMyStocks();
    };
    const getPageOfMyStocks=()=>{
        setDataStatus(prev=>({...prev,loading:true}));
        axios.get(`pharmas/joinedStks`)
       .then(res=>{
            setDataStatus({loading:false,rows:res.data});
       })
       .catch(e=>{
           MessageAlerter.alertServerError();
          setDataStatus(prev=>({...prev,loading:false}));
       })
    };
    const CancelStockJoin=(executeBeforeReq:Function,executeAfterReq:Function,modelId:string)=>{
        executeBeforeReq();
        axios.delete(`/pharmas/stkRequests/${modelId}`)
        .then(res=>{
          MessageAlerter.alertMessage("تم الغاءالطلب بنجاح");
          HandleRefresh();
        })
        .catch(err=>{
        if(err.status==404){
          MessageAlerter.alertNotFoundError();
            return;
        }
        if(!err.response) 
        {
           MessageAlerter.alertProcessingErrorAtServer();
            return;
        }
        alert(JSON.stringify(err.response.data.errors))
       })
       .finally(()=>{
        executeAfterReq();
       })
  
    };
    return (
        <Box>
            <Backdrop className={classes.backdrop}
                    open={dataStatus.loading}>
                <span style={{margin:'auto 2px'}}>
                    جارى تحميل البيانات
                </span>
                <CircularProgress color="inherit" />
            </Backdrop>
           <Box>
              <Grid container>
              {dataStatus.rows.length==0 && 
               <Alert severity="info">
                   لا يوجد لديك اى مخازن متعاقد معها
               </Alert>
              }
              {dataStatus.rows.map((model,ind)=>(
                  <Grid item sm={12} md={6}>
                     <Box mx={1.5} my={2}>
                        <MyStockInfoCard key={ind} 
                                         cancelStockJoin={CancelStockJoin}
                                         model={model}/>
                     </Box>
                  </Grid>
              ))}
              </Grid>
           </Box>
        </Box>
    )
}
