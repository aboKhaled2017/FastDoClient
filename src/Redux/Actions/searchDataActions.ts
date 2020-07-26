import { SET_SEARCH_TABLE_DATA, SET_SEARCH_FILTERED_DATA, Stop_LOADING_SEARCH_DATA, LOADING_SEARCH_DATA, 
  SET_SELECTED_CITIES, SET_SELECTED_DESTICTS, SET_DATE_FILTER, SET_ERRORS_ON_FETCH_SEARCH_DATA,
   SET_SEARCH_Q, SET_SEARCH_CITYIDS, SET_SEARCH_AREAIDS, SET_SEARCH_PAGESIZE, SET_SEARCH_PAGENUMBER, SET_SEARCH_PAGENUMBER_AND_PAGESIZE, SET_SEARCH_ORDERBY, UPDATE_DRGS_SEARCH_ROW_AFTER_REQUEST_ADDED } from '../types';
import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';
import dataRecords from '../../Views/DrugSearch/TableData';
import { IDateFilter } from '../../Interfaces/ModelsTypes';
import store from '../store';
import { DateFilterChangeType } from '../../Interfaces/DataTypes';
import {I_Drgs_SearchPaging_Parmas, I_Drgs_SeachData, I_Drgs_Search_ReturnModelAfterAdded } from '../../Interfaces/SearchDrugsTypes';
import { clone } from '../../Helpers/HelperArrayFuncs';

const Make_Url_With_PaginationData_Params=(baseUrl:string,pageData:any)=>{
  for(let prop in pageData){
    if((pageData as Object).hasOwnProperty(prop) && pageData[prop])
    baseUrl+=`${prop}=${pageData[prop]}&`;
  }
  return baseUrl.slice(0,baseUrl.length-1);
}
const makeArrayableParamForPaging=(objs:{id:number}[])=>{
  if(objs==null || objs.length==0)return null;
  let str='';
  for(let obj of objs)
    str+=obj.id+',';
   return str.slice(0,str.length-1);
}
export const GetSearchDrugs_Data_Page=(pageData?:I_Drgs_SearchPaging_Parmas)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_SEARCH_DATA});
  const filtering=store.getState().searchData.filtering;
  if(!pageData){
     pageData={
       pageNumber:filtering.pageNumber,
       pageSize:filtering.pageSize
     }
     if(filtering.s)pageData.s=filtering.s;
     if(filtering.orderBy)pageData.orderBy=filtering.orderBy;
     if(filtering.CityIds)pageData.CityIds=filtering.CityIds;
     if(filtering.AreaIds)pageData.AreaIds=filtering.AreaIds;
     if(filtering.PhramId)pageData.PhramId=filtering.PhramId;
     if(filtering.ValidBefore)pageData.ValidBefore=filtering.ValidBefore;
  }
  axios.get(Make_Url_With_PaginationData_Params('/lzdrug/search?',pageData))
  .then(res=>{
    const data:I_Drgs_SeachData={
      rows:res.data,
      pagination:JSON.parse(res.headers['x-pagination'])
    };
    dispatch({type:SET_SEARCH_TABLE_DATA,payload:data});
  })
  .catch(e=>{
    dispatch({type:SET_ERRORS_ON_FETCH_SEARCH_DATA,payload:JSON.stringify(e)});
  });
}
export const onSearchInputChange=(q:string)=>(dispatch:Dispatch)=>{
  dispatch({type:SET_SEARCH_Q,payload:q});
  dispatch(GetSearchDrugs_Data_Page() as any);
}
export const OnCityFilterChange=(cities:{id:number}[])=>(dispatch:Dispatch)=>{
  const resetDateFilter:IDateFilter={before:null,after:null}
  dispatch({type:SET_DATE_FILTER,payload:resetDateFilter})
  if(!cities||cities?.length==0){
    dispatch({type:SET_SEARCH_CITYIDS,payload:null});
    dispatch(GetSearchDrugs_Data_Page() as any);
    return;
  }
  dispatch({type:SET_SEARCH_CITYIDS,payload:makeArrayableParamForPaging(cities)});
  dispatch(GetSearchDrugs_Data_Page() as any);
 //clear destricts here
}
export const OnDestrictsFilterChange=(values:{id:number}[])=>(dispatch:Dispatch)=>{
  const resetDateFilter:IDateFilter={before:null,after:null}
  dispatch({type:SET_DATE_FILTER,payload:resetDateFilter})
  if(!values||values?.length==0){
    dispatch({type:SET_SEARCH_AREAIDS,payload:null});
    dispatch(GetSearchDrugs_Data_Page() as any);
    return;
  }
  dispatch({type:SET_SEARCH_AREAIDS,payload:makeArrayableParamForPaging(values)});
    dispatch(GetSearchDrugs_Data_Page() as any);
}
export const Set_DrgsSearch_PageSize=(val:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_SEARCH_PAGESIZE,payload:val});
  dispatch(GetSearchDrugs_Data_Page() as any);
}
export const Set_DrgsSearch_PageNumber=(val:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_SEARCH_PAGENUMBER,payload:val});
  dispatch(GetSearchDrugs_Data_Page() as any);
}
export const Set_DrgsSearch_PageNumber_And_PageSize=(pageNumber:number,pageSize:number)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_SEARCH_PAGENUMBER_AND_PAGESIZE,payload:{pageNumber,pageSize}});
  dispatch(GetSearchDrugs_Data_Page() as any);
}
export const Set_DrgsSearch_OrderBy=(orderByClause:string)=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:SET_SEARCH_ORDERBY,payload:orderByClause});
  dispatch(GetSearchDrugs_Data_Page() as any);
}
export const Update_DrgsSearch_Row_AfetrPostReq=(returnModel:I_Drgs_Search_ReturnModelAfterAdded)=>(dispatch:Dispatch<AnyAction>|any)=>{
  const oldData=store.getState().searchData.searchDataTable.rows;
  let index=oldData.findIndex(r=>r.id==returnModel.lzDrugId);
  if(index>-1){
    let model=oldData[index];
    model.status=returnModel.status;
    model.isMadeRequest=true;
    model.requestsCount+=1;
    model.requestId=returnModel.id;
    oldData.splice(index,1,model);
  }
  dispatch({type:UPDATE_DRGS_SEARCH_ROW_AFTER_REQUEST_ADDED,payload:clone(oldData)});
}
export const Update_DrgsSearch_Row_AfetrCancelReq=(id:string)=>(dispatch:Dispatch<AnyAction>|any)=>{
  const oldData=store.getState().searchData.searchDataTable.rows;
  let index=oldData.findIndex(r=>r.id==id);
  if(index>-1){
    let model=oldData[index];
    model.status=null;
    model.requestsCount-=1;
    model.isMadeRequest=false;
    model.requestId=null;
    oldData.splice(index,1,model);
  }
  dispatch({type:UPDATE_DRGS_SEARCH_ROW_AFTER_REQUEST_ADDED,payload:clone(oldData)});
}


export const OnDateFilterChange=(value:IDateFilter,type:DateFilterChangeType)=>(dispatch:Dispatch)=>{
  /*const filteredData=store.getState().searchData.fileteredSearchData as any as ILazDrugShowModel[];
  var newFilteredData:ILazDrugShowModel[]=[];
  if(type==DateFilterChangeType.Before){
  if(value.before){
      newFilteredData=filteredData.filter(rec=>
        rec.validDate<(value.before as Date) &&
        ((value.after &&rec.validDate>value.after)||(!value.after))
        )
      dispatch({type:SET_SEARCH_TABLE_DATA,payload:newFilteredData})    
   }
   else{
     if(value.after){
      newFilteredData=filteredData.filter(rec=>
        rec.validDate>(value.after as Date) )
     }
     let selectedDests=store.getState().searchData.selectedFilteredDesticts;
     if(selectedDests && selectedDests.length>0)
      dispatch(OnDestrictsFilterChange(selectedDests) as any)
     else{
      let selectedCities=store.getState().searchData.selectedFilteredCities;
      if(selectedCities &&selectedCities.length>0)
       dispatch(OnCityFilterChange(selectedCities) as any)
     }
   }
  }
  else{
    if(value.after){
      newFilteredData=filteredData.filter(rec=>
        rec.validDate>(value.after as Date) &&
        ((value.before &&rec.validDate<value.before)||(!value.before))
        )
      dispatch({type:SET_SEARCH_TABLE_DATA,payload:newFilteredData})
    }
    else{
      if(value.before){
        newFilteredData=filteredData.filter(rec=>
          rec.validDate<(value.before as Date) )
       }
      let selectedDests=store.getState().searchData.selectedFilteredDesticts;
     if(selectedDests && selectedDests.length>0)
      dispatch(OnDestrictsFilterChange(selectedDests) as any)
     else{
      let selectedCities=store.getState().searchData.selectedFilteredCities;
      if(selectedCities &&selectedCities.length>0)
       dispatch(OnCityFilterChange(selectedCities) as any)
     }
    }
  }
  dispatch({type:SET_DATE_FILTER,payload:value});*/
}
