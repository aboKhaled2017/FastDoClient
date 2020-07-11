import {LOADING_DATA,SET_AREAS_DATA } from "../types"
import dataRecords from "../../Views/DrugSearch/TableData"
import { IDataState } from "../../Interfaces/States"


const initialState:IDataState= {
loading:false,
areas:{
    cities:[],
    destricts:[]
}
}

export default (state = initialState, { type, payload }:{type:string,payload:any}):IDataState => {
    switch (type) {
    case LOADING_DATA:
         return { ...state, loading:true }
    case SET_AREAS_DATA:
         return { ...state, loading:false,areas:{...payload} }
    default:
        return state
    }
}
