/* eslint-disable react/jsx-pascal-case */
import { IPagination } from '@/Interfaces/General';
import React, { ReactElement, useEffect, useState } from 'react';
import { E_StkPackageViewSwitcher, IStkDrugsPackage, I_PaginationReq_To_GetPage } from '../../Interfaces.d';
import axios from 'axios';
import { Make_Url_With_PaginationData_Params, MessageAlerter } from '@/Commons/Services';
import { App_BackDrop } from '@/components/Customs';
import { Box, CircularProgress, createStyles, makeStyles, Paper, TableContainer, Theme } from '@material-ui/core';
import PaginationView from '../Components/PaginationView';
import {StkDrugsPackagesTableView,AddNewStkDrugsPackageView} from './Components'
import {RequestServices} from './Services'
import {PackageFromHttpService} from '@Views/StkDrugsSearch/Services/PackageServices'
import {Set_Pharma_Packages} from '@/Redux/Actions/DataActions'
import { connect } from 'react-redux';
 
const useStyles =  makeStyles((theme: Theme) =>
createStyles({
   root: {
     width: '100%',
     background:'transparent',
     boxShadow:'none',
     position:'relative'
   },
   
   container: {
     maxHeight: 880,
   },
   backdrop: {
     zIndex: theme.zIndex.drawer + 1,
     color: '#fff',
   }
}));

interface IDataStatus{
  loading:boolean 
  rows:IStkDrugsPackage[]
}
interface IExportedViewProps{
  SwitchTo:(v:E_StkPackageViewSwitcher)=>void
}

interface IViewProps {
  Set_Pharma_Packages:(packages:any)=>void
  SwitchTo:(v:E_StkPackageViewSwitcher)=>void
}

const View: React.FC<IViewProps> = props => {
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
        pageSize:10
    });

    useEffect(()=>{      
      getPageOfPackages();    
    },[pagingReq.pageNumber,pagingReq.pageSize,pagingReq.s]);

    const handleRefresh=()=>{
      getPageOfPackages();
    };

    const getPageOfPackages=()=>{
       setDataStatus(prev=>({...prev,loading:true}));
       PackageFromHttpService.Create(pagingReq)
        .Subscibe({
          OnSuccess(res){
            setDataStatus({loading:false,rows:res.data});
            setPagingObj({...JSON.parse(res.headers['x-pagination'])});
            props.Set_Pharma_Packages(res.data);
          },
          OnError(){
            MessageAlerter.alertServerError();
            setDataStatus(prev=>({...prev,loading:false}));
          }
        },true);
        
        /*axios.get(Make_Url_With_PaginationData_Params('pharmas/stkdrugpackage?',pagingReq))
       .then(res=>{
            
       })
       .catch(()=>{
           
       })*/
    };
    
    const onPageNumberSelected=(pageNumber:number)=>{
        setPagingReq(prev=>({...prev,pageNumber:pageNumber}));
    };
    const onSetPageSize=(pageSize:number)=>{
        setPagingReq(prev=>({...prev,pageSize:pageSize,pageNumber:1}));
    };
    const onSearchText=(s:string)=>{
        setPagingReq(prev=>({...prev,s,pageNumber:1}));
    };

    const OnDeletePackage=(id:string)=>{
       setDataStatus(p=>({...p,loading:true}));
       RequestServices.OnDeletePackage({
         id,
         onError:()=>{
          setDataStatus(p=>({...p,loading:false}));
         },
         onDone:()=>{
         var _rows=dataStatus.rows;
         _rows=_rows.filter(e=>e.packageId!==id);
         setDataStatus({loading:false,rows:_rows});
         }
       })
    }
    const onAddNewPackage=(name:string)=>{
      handleRefresh();
    }
  return (
    <TableContainer component={Paper} className={classes.root}>
       
       <App_BackDrop className={classes.backdrop}
                 open={dataStatus.loading}>
             <Box mx={2}>
             <span>جارى تحميل البييانات</span>
             </Box>
             <CircularProgress color="inherit" />
       </App_BackDrop>

      <Box m={1} display="flex">
           <Box alignSelf="center">
              <AddNewStkDrugsPackageView onAddNewPackage={onAddNewPackage}/>
           </Box>
          <Box mx={1} alignSelf="center">
              <PaginationView handleRefresh={handleRefresh}
                    onPageNumebrSelected={onPageNumberSelected}
                    pagingData={pagingObj}
                    setPageSize={onSetPageSize}
                    onSearchByNameChange={onSearchText}/>
          </Box>
      </Box>

      <Box>
         <StkDrugsPackagesTableView rows={dataStatus.rows} 
                  onDeletePackage={OnDeletePackage}
                  SwitchTo={props.SwitchTo}/>
      </Box>
     </TableContainer>
  );
};

export default (connect(null,{Set_Pharma_Packages})(View)) as
           any as (props:IExportedViewProps)=>ReactElement;
//export default View;
