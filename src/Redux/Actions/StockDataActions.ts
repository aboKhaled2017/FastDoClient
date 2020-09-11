import {LOADING_STOCK_DATA,REfRESH_STOCK_PRODS_DATA,SET_ERROR_ON_FETCH_STOCK_DATA,STOP_LOADING_STOCK_DATA} from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'

import { I_GetMyDrugsData, I_PaginationReq_To_GetDrugs } from '../../Interfaces/DrugsTypes';
import store from '../store';
import { clone } from '../../Helpers/HelperArrayFuncs';


const Make_Url_With_PaginationData_Params=(baseUrl:string,pageData:any)=>{
  for(let prop in pageData){
    if((pageData as Object).hasOwnProperty(prop) && pageData[prop])
    baseUrl+=`${prop}=${pageData[prop]}&`;
  }
  return baseUrl.slice(0,baseUrl.length-1);
}

export const GetMyStockProdsData_Page=(pageData?:I_PaginationReq_To_GetDrugs)=>
  (dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_STOCK_DATA});
  var pagingState=store.getState().stockData.DataStore.pagination;
  if(!pageData){
     pageData={
       pageNumber:pagingState.currentPage,
       pageSize:pagingState.pageSize
     }
  }
  axios.get(Make_Url_With_PaginationData_Params('/stk/prods?',pageData))
  .then(res=>{
    const data:I_GetMyDrugsData={
      rows:res.data,
      pagination:JSON.parse(res.headers['x-pagination'])
    };
    dispatch({type:REfRESH_STOCK_PRODS_DATA,payload:data});
  })
  .catch(e=>{
    dispatch({type:SET_ERROR_ON_FETCH_STOCK_DATA,payload:JSON.stringify(e)});
  });
}

export const Set_StockProds_PageSize=(val:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch(GetMyStockProdsData_Page({
   pageSize:val,
   pageNumber:1
 }) as any);
}

export const Stop_Loading_Stock_Data=()=>(dispatch:Dispatch<AnyAction>|any)=>{
 dispatch({type:STOP_LOADING_STOCK_DATA});
}
export const Set_Loading_Stock_Data=()=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_STOCK_DATA});
}
