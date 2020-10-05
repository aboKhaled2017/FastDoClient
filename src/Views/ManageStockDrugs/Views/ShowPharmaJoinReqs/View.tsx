import {Box, CircularProgress, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {PaginationView, PharmaReqJoinCard } from './Components'
import { E_PharmaRequestStkStatus, IPagination, IPharmaJoinRequestToStock, I_PaginationReq_To_GetPage} from '../../Interfaces'
import { MessageAlerter } from '@/Commons/Services';
import { Make_Url_With_PaginationData_Params } from '../../Services';
import { Alert } from '@material-ui/lab';
import { App_BackDrop } from '@/components/Customs';

interface Props {
    
}
interface State {
    
}
interface IDataStatus{
    loading:boolean
    rows:IPharmaJoinRequestToStock[]
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
    const [pagingObj,setPagingObj]=useState<IPagination>({
        currentPage:1,
        pageSize:2,
        totalCount:0,
        totalPages:0,
        nextPageLink:null,
        prevPageLink:null
    });
    const [pagingReq,setPagingReq]=useState<I_PaginationReq_To_GetPage>({
        pageNumber:1,
        pageSize:2     
    });

    useEffect(()=>{      
        getPageOfRequests();    
    },[pagingReq.pageNumber,pagingReq.pageSize,pagingReq.s,pagingReq.pharmaClass,pagingReq.status]);
    const handleRefresh=()=>{
        getPageOfRequests();
    };

    const getPageOfRequests=()=>{
        setDataStatus(prev=>({...prev,loading:true}));
        axios.get(Make_Url_With_PaginationData_Params('stk/joinRequests?',pagingReq))
       .then(res=>{
            setDataStatus({loading:false,rows:res.data});
            setPagingObj({...JSON.parse(res.headers['x-pagination'])});
       })
       .catch(()=>{
           MessageAlerter.alertServerError();
          setDataStatus(prev=>({...prev,loading:false}));
       })
    };
    

    const onPageNumberSelected=(pageNumber:number)=>{
        setPagingReq(prev=>({...prev,pageNumber:pageNumber}));
    };
    const onSetPageSize=(pageSize:number)=>{
        setPagingReq(prev=>({...prev,pageSize:pageSize}));
    };
    const onSearchText=(s:string)=>{
        setPagingReq(prev=>({...prev,s}));
    };
    const onSetPharmaClass=(pharmaClass:string)=>{
        setPagingReq(prev=>({...prev,pharmaClass}))
    }
    const onSetReqStatus=(status:E_PharmaRequestStkStatus|"")=>{
        if(status=="")
        setPagingReq(prev=>({...prev,status:""}));
        else
        setPagingReq(prev=>({...prev,status:(status as number)-1}))
    } 

    
    const handlePharmaRequest=(
        executeBeforeReq:Function,
        executeAfterReq:Function,
        onSuccess:Function,
        data:{
            id:string,
            body:any
        })=>{

        executeBeforeReq();
        axios.patch(`stk/pharmaReqs/${data.id}`,data.body)
        .then(res=>{
            onSuccess();
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
            <App_BackDrop className={classes.backdrop}
                          open={dataStatus.loading}>
                <span style={{margin:'auto 2px'}}>
                    جارى التحميل 
                </span>
                <CircularProgress color="inherit" />
            </App_BackDrop>
            <Box>
                <Grid container>
                    <Grid item md={12}>
                        <PaginationView 
                            setPageSize={onSetPageSize}
                            onPageNumebrSelected={onPageNumberSelected}
                            pagingData={pagingObj}
                            onSetPharmaClass={onSetPharmaClass}
                            onSetReqStatus={onSetReqStatus}
                            onSearchByNameChange={onSearchText}
                            handleRefresh={handleRefresh}/>
                    </Grid>
                </Grid>
            </Box>
            <Box>
              <Grid container>
              {dataStatus.rows.length==0 && 
               <Alert severity="info">
                   لم يوجد اى طلبات
               </Alert>
              }
              {dataStatus.rows.map((model,ind)=>(
                  <Grid item sm={12} md={6}>
                     <Box mx={1.5} my={2}>
                         <PharmaReqJoinCard model={model} handlePharmaRequest={handlePharmaRequest}/>
                     </Box>
                  </Grid>
              ))}
              </Grid>
            </Box>
        </Box>
    )
}
