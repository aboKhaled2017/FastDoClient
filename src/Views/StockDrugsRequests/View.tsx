import { IPagination } from '@/Interfaces/General';
import { IStkDrugsRequest } from '@/Interfaces/StockDrgsRequestsTypes';
import { Box, CircularProgress, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IDataState } from '../../Interfaces/States';
import { I_PaginationReq_To_GetPage } from '@Views/StockDrugsRequests/Interfaces';
import {RequestServices} from '@Views/StockDrugsRequests/Services'
import {Set_Stock_Drugs_Requests,Set_Loading_Data,Stop_Loading_Data} from '@Redux/Actions/DataActions'
import { EStockDrugsPackgStatus } from '../../Interfaces/StockDrgsRequestsTypes';
import { App_BackDrop } from '@/components/Customs';
import { Alert } from '@material-ui/lab';
import {PaginationView,StockDrugsRequestCardView} from './Components'

const useStyles=makeStyles((theme:Theme)=>createStyles({
  backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
  },
}));

interface IViewProps {
  loading:boolean
  drugsRequests:IStkDrugsRequest[]
  Set_Stock_Drugs_Requests:(requests:IStkDrugsRequest[])=>void
  Set_Loading_Data:()=>void
  Stop_Loading_Data:()=>void
}

const View: React.FC<IViewProps> = props => {
    const {drugsRequests,Set_Stock_Drugs_Requests,
      loading,Set_Loading_Data,Stop_Loading_Data}=props;
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
  
    useEffect(()=>{
    getPageOfMyStocks();    
    },[pagingReq.pageNumber,pagingReq.pageSize,pagingReq.status]);

    const HandleRefresh=()=>{
        getPageOfMyStocks();
    };
    const OnPageNumberSelected=(pageNumber:number)=>{
        setPagingReq(prev=>({...prev,pageNumber:pageNumber}));
    };
    const SetPageSize=(pageSize:number)=>{
        setPagingReq(prev=>({...prev,pageSize:pageSize,pageNumber:1}));
    };
    const SetStatus=(status:EStockDrugsPackgStatus|"all")=>{
      setPagingReq(prev=>({...prev,status:status,pageNumber:1}));
    };

    const getPageOfMyStocks=()=>{          
          Set_Loading_Data();
          if(pagingReq.status==="all"){
            pagingReq.status=undefined;
          }
          RequestServices.getPageOfStockDrugsRequests({
          pageRequest:pagingReq,
          onComplete(){
            Stop_Loading_Data();
          },
          onDone(res:any){
            Set_Stock_Drugs_Requests(res.data);
            setPagingObj({...JSON.parse(res.headers['x-pagination'])});
          }
        });
    };

  return (
    <Fragment>
      <Typography align="center" color="primary" variant="h5">
              صفحة ادارة الطلبات على منتجات الادوية
      </Typography>
      <Box m="5px 10px">
          <App_BackDrop className={classes.backdrop}
                        open={loading}>
              <span style={{margin:'auto 2px'}}>
                  جارى التحميل 
              </span>
              <CircularProgress color="inherit" />
          </App_BackDrop>

          <Box mx={10}>
            <PaginationView pagingData={pagingObj}
                  onPageNumebrSelected={OnPageNumberSelected}
                  onSetReqStatus={SetStatus}
                  handleRefresh={HandleRefresh}
                  setPageSize={SetPageSize}/>
          </Box>
          {!loading &&
            <Box>
              {drugsRequests.length===0 &&
              <Alert severity="info" variant="outlined">
                  لم يوجد اى طلبات
              </Alert>
              }
              <Grid container>
                {drugsRequests.length>0 && drugsRequests.map(row=>(
                    <Grid item sm={6} xs={12}>
                      <Box key={row.packageId} my={.5}>
                          <StockDrugsRequestCardView model={row}/>
                      </Box>
                    </Grid>
                ))}
              </Grid>
          </Box>
          }
      </Box>
    </Fragment>
  );
};

export default connect((s:{data:IDataState})=>({
drugsRequests:s.data.stockDrugsRequests,
loading:s.data.loading
}),{Set_Stock_Drugs_Requests,Set_Loading_Data,Stop_Loading_Data})(View);
