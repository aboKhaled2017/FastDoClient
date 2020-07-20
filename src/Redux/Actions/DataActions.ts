import {LOADING_DATA,SET_AREAS_DATA, SET_ERROR_ON_FETCH_DATA, SET_USER_DRUGS_DATA, UPDATE_DRGS_DATA_WITH_NEWLLY_ADDED} from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'
import { IArea } from '../../Interfaces/ModelsTypes';
import { I_Drug_DataModel } from '../../Interfaces/DrugsTypes';

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
export const GetMyDrugs=()=>(dispatch:Dispatch<AnyAction>|any)=>{
  dispatch({type:LOADING_DATA});
  axios.get('/lzdrugs')
  .then(res=>{
    dispatch({type:SET_USER_DRUGS_DATA,payload:res.data});
  })
  .catch(e=>{
    dispatch({type:SET_ERROR_ON_FETCH_DATA,payload:JSON.stringify(e)});
  })
}
export const Push_NewllyAddedDrug=(model:I_Drug_DataModel)=>(dispatch:Dispatch<AnyAction>|any)=>{
 dispatch({type:UPDATE_DRGS_DATA_WITH_NEWLLY_ADDED,payload:model});
}