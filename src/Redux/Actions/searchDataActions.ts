import {SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_SEARCH_TABLE_DATA, SET_SEARCH_FILTERED_DATA, Stop_LOADING_SEARCH_DATA, LOADING_SEARCH_DATA, SET_SELECTED_CITIES, SET_SELECTED_DESTICTS, SET_DATE_FILTER } from '../types';
import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';
import dataRecords from '../../Views/DrugSearch/TableData';
import { ILazDrugShowModel, IDateFilter } from '../../Interfaces/ModelsTypes';
import store from '../store';
import { DateFilterChangeType } from '../../Interfaces/DataTypes';


/**get All screams */
export const getInitSearchData=()=>(dispatch:Dispatch)=>{
    dispatch({type:LOADING_SEARCH_DATA});
    dispatch({type:SET_SEARCH_TABLE_DATA,payload:dataRecords})
    dispatch({type:SET_SEARCH_FILTERED_DATA,payload:dataRecords})
    dispatch({type:Stop_LOADING_SEARCH_DATA});    
}

export const onSearchInputChange=(q:string)=>(dispatch:Dispatch)=>{
  const filteredData:ILazDrugShowModel[]=store.getState().searchData.fileteredSearchData;
  if(!q) {
    dispatch({type:SET_SEARCH_TABLE_DATA,payload:filteredData})
  }
  let data=filteredData.filter(record=>record.name.includes(q))
  dispatch({type:SET_SEARCH_TABLE_DATA,payload:data})
}
export const OnCityFilterChange=(cities:{name:string}[])=>(dispatch:Dispatch)=>{
  const originalData=dataRecords;
  const resetDateFilter:IDateFilter={before:null,after:null}
  dispatch({type:SET_DATE_FILTER,payload:resetDateFilter})
  if(!cities||cities?.length==0){
    dispatch({type:SET_SEARCH_TABLE_DATA,payload:originalData})
    dispatch({type:SET_SELECTED_CITIES,payload:[]})
    dispatch({type:SET_SELECTED_DESTICTS,payload:[]})
    return;
  }
  const filtData=originalData.filter(rec=>{
    let name=rec.address.split('/')[0].trim();
    return cities?.some(c=>c.name===name)
  })
  
  dispatch({type:SET_SEARCH_TABLE_DATA,payload:filtData})
  dispatch({type:SET_SEARCH_FILTERED_DATA,payload:filtData})
  dispatch({type:SET_SELECTED_CITIES,payload:cities})
  dispatch({type:SET_SELECTED_DESTICTS,payload:[]})
 //clear destricts here
}
export const OnDestrictsFilterChange=(values:{name:string}[])=>(dispatch:Dispatch)=>{
  const originalData=dataRecords;
  const resetDateFilter:IDateFilter={before:null,after:null}
  dispatch({type:SET_DATE_FILTER,payload:resetDateFilter})
  if(!values||values?.length==0){
    dispatch({type:SET_SEARCH_TABLE_DATA,payload:originalData})
    dispatch({type:SET_SELECTED_DESTICTS,payload:[]})
    const selectedCities=store.getState().searchData.selectedFilteredCities as {}[];
    if(selectedCities.length>0)
    dispatch({type:SET_SELECTED_CITIES,payload:selectedCities})
    return;
  }
  const filtData=originalData.filter(rec=>{
    let name=rec.address.split('/')[1].trim();
    return values?.some(d=>d.name===name)
  })
  dispatch({type:SET_SEARCH_TABLE_DATA,payload:filtData})
  dispatch({type:SET_SEARCH_FILTERED_DATA,payload:filtData})
  dispatch({type:SET_SELECTED_DESTICTS,payload:values})
}
export const OnDateFilterChange=(value:IDateFilter,type:DateFilterChangeType)=>(dispatch:Dispatch)=>{
  const filteredData:ILazDrugShowModel[]=store.getState().searchData.fileteredSearchData;
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
  dispatch({type:SET_DATE_FILTER,payload:value});
}
/**clear errors */
export const clearErrors=()=>(dispatch:Dispatch)=>{
  dispatch({type:CLEAR_ERRORS})
}