import {SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_SEARCH_TABLE_DATA, SET_SEARCH_FILTERED_DATA, Stop_LOADING_SEARCH_DATA, LOADING_SEARCH_DATA, SET_SELECTED_CITIES, SET_SELECTED_DESTICTS } from '../types';
import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';
import dataRecords from '../../Pages/DrugSearch/TableData';
import { ILazDrugShowModel } from '../../Interfaces/ModelsTypes';
import store from '../store';


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
/**clear errors */
export const clearErrors=()=>(dispatch:Dispatch)=>{
  dispatch({type:CLEAR_ERRORS})
}