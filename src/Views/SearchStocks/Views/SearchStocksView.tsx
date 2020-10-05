import { Backdrop, Box, CircularProgress, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import React, { Component, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import {PaginationView, SearchStocksCard } from '../Components'
import { ISearchStockModel, IPagination, I_PaginationReq_To_GetPage } from '../Interfaces'
import { MessageAlerter } from '../../../Commons/Services';
import { Make_Url_With_PaginationData_Params } from '../Services';
import { Alert } from '@material-ui/lab';

interface Props {
    
}
interface State {
    
}
interface IDataStatus{
    loading:boolean
    rows:ISearchStockModel[]
}
const useStyles=makeStyles((theme:Theme)=>createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export default ()=>{
    const classes=useStyles();
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
    const [dataStatus,setDataStatus]=useState<IDataStatus>({
        loading:false,
        rows:[]
    });
    useEffect(()=>{
     getPageOfMyStocks();    
    },[pagingReq.pageNumber,pagingReq.pageSize,pagingReq.s]);
    const HandleRefresh=()=>{
        getPageOfMyStocks();
    };
    const OnPageNumberSelected=(pageNumber:number)=>{
        setPagingReq(prev=>({...prev,pageNumber:pageNumber}));
    };
    const SetPageSize=(pageSize:number)=>{
        setPagingReq(prev=>({...prev,pageSize:pageSize}));
    };
    const SetSearchText=(s:string)=>{
        setPagingReq(prev=>({...prev,s}));
    };
    const getPageOfMyStocks=()=>{
        setDataStatus(prev=>({...prev,loading:true}));
        axios.get(Make_Url_With_PaginationData_Params('pharmas/searchStks?',pagingReq))
       .then(res=>{
            setDataStatus({loading:false,rows:res.data});
            setPagingObj({...JSON.parse(res.headers['x-pagination'])});
       })
       .catch(()=>{
           MessageAlerter.alertServerError();
          setDataStatus(prev=>({...prev,loading:false}));
       })
    };
    const sendJoinRequest=(executeBeforeReq:Function,executeAfterReq:Function,modelId:string)=>{
        executeBeforeReq();
        axios.put(`/pharmas/stkRequests/${modelId}`)
        .then(res=>{
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
                    <Grid item md={12}>
                        <PaginationView 
                            Set_Drugs_PageSize={SetPageSize}
                            OnPageNumebrSelected={OnPageNumberSelected}
                            pagingData={pagingObj}
                            UserSearch={true}
                            OnSearchByNameChange={SetSearchText}
                            HandleRefresh={HandleRefresh}/>
                    </Grid>
                </Grid>
           </Box>
           <Box>
              <Grid container>
              {dataStatus.rows.length==0 && 
               <Alert severity="info">
                   لا يوجد اى مخازن جديدة
               </Alert>
              }
              {dataStatus.rows.map((model,ind)=>(
                  <Grid item sm={12} md={6}>
                     <Box mx={1.5} my={2}>
                        <SearchStocksCard key={ind} 
                                          sendJoinRequest={sendJoinRequest}
                                          model={model as any}/>
                     </Box>
                  </Grid>
              ))}
              </Grid>
           </Box>
        </Box>
    )
}
