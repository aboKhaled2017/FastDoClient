import {LOADING_DATA,SET_AREAS_DATA} from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'
import { IArea } from '../../Interfaces/ModelsTypes';

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
}