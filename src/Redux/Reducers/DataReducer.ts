import {LOADING_DATA,SET_AREAS_DATA, SET_ERROR_ON_FETCH_DATA, SET_USER_DRUGS_DATA, UPDATE_DRGS_DATA_WITH_NEWLLY_ADDED } from "../types"
import dataRecords from "../../Views/DrugSearch/TableData"
import { IDataState } from "../../Interfaces/States"
import { clone } from "../../Helpers/HelperArrayFuncs"


const initialState:IDataState= {
loading:false,
areas:{
    cities:[],
    destricts:[]
  },
myDrugs:[]
}

export default (state:IDataState = clone({...initialState}), { type, payload }:{type:string,payload:any}):IDataState => {
    switch (type) {
    case LOADING_DATA:
         return {...clone(state), loading:true }
    case SET_AREAS_DATA:
         return {...clone(state), loading:false,areas:{...payload} }
    case SET_ERROR_ON_FETCH_DATA:
        return {...clone(state),loading:false}
    case SET_USER_DRUGS_DATA:
        return {...clone(state),loading:false,myDrugs:payload}
    case UPDATE_DRGS_DATA_WITH_NEWLLY_ADDED:
        {
            const newDrugs=clone(state.myDrugs);
            newDrugs.push(payload);
            return {...clone(state),myDrugs:newDrugs};
        }
    default:
        return {...clone(state)}
    }
}
