import { LOADING_DATA, SET_AREAS_DATA, SET_ERROR_ON_FETCH_DATA, SET_USER_DRUGS_DATA, UPDATE_LZ_DRG, STOP_LOADING_DATA, SET_USER_DRUGS_REQS_RECIEVED_DATA, UPDATE_DRGREQUEST_MODEL, SET_USER_DRUGS_REQS_MADE_DATA, SET_ALL_STOCKS_G_DATA, SET_PHARMA_PACKAGES, SET_PHARMA_SELECTED_PACKAGE, SET_PHARMA_PACKAGEDATA, SET_STCOK_DRUGS_PACKAGES_REQUESTS } from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'
import { IArea } from '@/Interfaces/ModelsTypes';
import { I_Drug_DataModel, I_GetMyDrugsData, I_PaginationReq_To_GetDrugs, I_DrgRequest_I_Received_Data, I_DrgRequest_I_Received } from '../../Interfaces/DrugsTypes';
import store from '../store';
import { clone } from '@/Helpers/HelperArrayFuncs';
import { IPackagesDataStatus } from '../../Interfaces/States';
import { IPackageMetaData_body } from '@/Views/StkDrugsSearch/Interfaces';
import {getBodyFromPackage} from '@/Services/PackageServices'
import { MessageAlerter } from '@/Commons/Services';
import { IStkDrugsRequest } from '@/Interfaces/StockDrgsRequestsTypes';
export const GetAreas=()=>(dispatch:Dispatch<AnyAction>|any)=>{
    dispatch({type:LOADING_DATA});
    axios.get('/areas/all')
    .then(res=>{
      let locations:IArea[] =res.data; 
      let areas={
          cities:[] as IArea[],
          destricts:[] as IArea[]
      };
      areas.cities=locations.filter(item=>item.superAreaId==null).map(item=>({
          id:item.id,
          name:item.name,
          superAreaId:null
      }))
      areas.destricts=locations.filter(item=>item.superAreaId!=null).map(item=>({
        id:item.id,
        name:item.name,
        superAreaId:item.superAreaId
    }))
      dispatch({type:SET_AREAS_DATA,payload:areas});
    })
    .catch(e=>{
      dispatch({type:SET_ERROR_ON_FETCH_DATA,payload:JSON.stringify(e)});
    })
}

export const GetAllStocksNames=()=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_DATA});
  axios.get('/pharmas/stknames')
  .then(res=>{
    dispatch({type:SET_ALL_STOCKS_G_DATA,payload:res.data});
  })
  .catch(e=>{
    dispatch({type:SET_ERROR_ON_FETCH_DATA,payload:JSON.stringify(e)});
  })
}
const Make_Url_With_PaginationData_Params=(baseUrl:string,pageData:any)=>{
  for(let prop in pageData){
    if((pageData as Object).hasOwnProperty(prop) && pageData[prop])
    baseUrl+=`${prop}=${pageData[prop]}&`;
  }
  return baseUrl.slice(0,baseUrl.length-1);
}
export const GetMyDrugs_Page=(pageData?:I_PaginationReq_To_GetDrugs)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_DATA});
  var pagingState=store.getState().data.myDrugs.pagination;
  if(!pageData){
     pageData={
       pageNumber:pagingState.currentPage,
       pageSize:pagingState.pageSize
     }
  }
  axios.get(Make_Url_With_PaginationData_Params('/lzdrugs?',pageData))
  .then(res=>{
    const data:I_GetMyDrugsData={
      rows:res.data,
      pagination:JSON.parse(res.headers['x-pagination'])
    };
    dispatch({type:SET_USER_DRUGS_DATA,payload:data});
  })
  .catch(e=>{
    dispatch({type:SET_ERROR_ON_FETCH_DATA,payload:JSON.stringify(e)});
  });
}
export const Push_NewllyAddedDrug=(model:I_Drug_DataModel)=>(dispatch:Dispatch<AnyAction>|any)=>{
  /*const oldDrugsData=clone(store.getState().data.myDrugs);
  oldDrugsData.rows.push(model);
  oldDrugsData.pagination.totalCount+=1;
  oldDrugsData.pagination.totalPages=Math.ceil(oldDrugsData.pagination.totalCount/oldDrugsData.pagination.pageSize);*/
  const {data:{myDrugs:{pagination}}}=store.getState()
  dispatch(GetMyDrugs_Page({
   pageSize:pagination.pageSize,
   pageNumber:pagination.currentPage
 }) as any);
}
export const Update_DrgRequestModel=(model:I_DrgRequest_I_Received)=>(dispatch:Dispatch<AnyAction>|any)=>{
  let old=clone(store.getState().data.DrgsReq_I_recieved_Data);
  let index=old.rows.findIndex(r=>r.id==model.id);
  if(index>-1){
    old.rows.splice(index,1,model);
    dispatch({type:UPDATE_DRGREQUEST_MODEL,payload:old});
  }
}
export const UpdateLzDrg=(model:I_Drug_DataModel)=>(dispatch:Dispatch<AnyAction>|any)=>{
  const oldDrugsData=clone(store.getState().data.myDrugs);
  var index=oldDrugsData.rows.findIndex(r=>r.id==model.id);
  if(index>-1){
    oldDrugsData.rows.splice(index,1,model);
    dispatch({type:UPDATE_LZ_DRG,payload:oldDrugsData});
  }
}
export const Set_Drugs_PageSize=(val:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch(GetMyDrugs_Page({
   pageSize:val,
   pageNumber:1
 }) as any);
}
export const Set_DrugsReq_PageSize=(val:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch(GetMy_DrgsReqs_IRecieved_Page({
   pageSize:val,
   pageNumber:1
 }) as any);
}
export const Set_DrugsMadeReq_PageSize=(val:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch(GetMy_DrgsReqs_IMade_Page({
   pageSize:val,
   pageNumber:1
 }) as any);
}
export const Stop_Loading_Data=()=>(dispatch:Dispatch<AnyAction>|any)=>{
 dispatch({type:STOP_LOADING_DATA});
}
export const Set_Loading_Data=()=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_DATA});
}
export const GetMy_DrgsReqs_IRecieved_Page=(pageData?:I_PaginationReq_To_GetDrugs)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_DATA});
  var pagingState=store.getState().data.DrgsReq_I_recieved_Data.pagination;
  if(!pageData){
     pageData={
       pageNumber:pagingState.currentPage,
       pageSize:pagingState.pageSize
     }
  }
  axios.get(Make_Url_With_PaginationData_Params('/phrdrgrequests/received?',pageData))
  .then(res=>{
    const data:I_DrgRequest_I_Received_Data={
      rows:res.data,
      pagination:JSON.parse(res.headers['x-pagination'])
    };
    dispatch({type:SET_USER_DRUGS_REQS_RECIEVED_DATA,payload:data});
  })
  .catch(e=>{
    dispatch({type:SET_ERROR_ON_FETCH_DATA,payload:JSON.stringify(e)});
  });
}
export const GetMy_DrgsReqs_IMade_Page=(pageData?:I_PaginationReq_To_GetDrugs)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_DATA});
  var pagingState=store.getState().data.DrgsReq_I_made_Data.pagination;
  if(!pageData){
     pageData={
       pageNumber:pagingState.currentPage,
       pageSize:pagingState.pageSize
     }
  }
  axios.get(Make_Url_With_PaginationData_Params('/phrdrgrequests/made?',pageData))
  .then(res=>{
    const data:I_DrgRequest_I_Received_Data={
      rows:res.data,
      pagination:JSON.parse(res.headers['x-pagination'])
    };
    dispatch({type:SET_USER_DRUGS_REQS_MADE_DATA,payload:data});
  })
  .catch(e=>{
    dispatch({type:SET_ERROR_ON_FETCH_DATA,payload:JSON.stringify(e)});
  });
}
export const Set_Pharma_Packages=(packages:any)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_PHARMA_PACKAGES,payload:packages});
}
export const Set_Pharma_SelectedPackage=(selectedPackData:any)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_PHARMA_SELECTED_PACKAGE,payload:selectedPackData});
}
export const Set_Pharma_PackageData=(packData:IPackagesDataStatus)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_PHARMA_PACKAGEDATA,payload:packData});
}
export const Update_Pharma_Package=(props:{
    packageId:string 
    body:IPackageMetaData_body
    onComplete:Function 
    onDone:Function 
    onError?:Function
})=>(dispatch:Dispatch<AnyAction>|any)=>{
  const {packageId,body,onComplete,onDone,onError}=props;
    axios.put(`pharmas/stkdrugpackage/${packageId}`,getBodyFromPackage(body))
    .then(res=>{
     onDone(res.data);
     var data={
          hasEdit:false,
          pack:store.getState().data.packagesData.selectedPackageData.pack
        };
        dispatch({type:SET_PHARMA_SELECTED_PACKAGE,payload:data});     
    })
    .catch(err=>{
    onError?.call({});
    if(err.status===404){
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
     onComplete();
    });
}
export const Set_Stock_Drugs_Requests=(requests:IStkDrugsRequest[])=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_STCOK_DRUGS_PACKAGES_REQUESTS,payload:requests});
}