import { LOADING_SEARCH_DATA, SET_SEARCH_FILTERED_DATA, SET_SEARCH_TABLE_DATA, SET_SELECTED_CITIES, SET_SELECTED_DESTICTS, Stop_LOADING_SEARCH_DATA, SET_DATE_FILTER } from "../types"
import dataRecords from "../../Views/DrugSearch/TableData"
import { ISearchDataState } from "../../Interfaces/States"


const initialState:ISearchDataState= {
loading:false ,
searchDataTable:dataRecords,
fileteredSearchData:dataRecords,
selectedFilteredCities:[],
selectedFilteredDesticts:[],
dateFilter:{
    before:null,
    after:null
}
}

export default (state = initialState, { type, payload }:{type:string,payload:any}):ISearchDataState => {
    switch (type) {
    case LOADING_SEARCH_DATA:
         return { ...state, loading:true }
    case Stop_LOADING_SEARCH_DATA:
         return { ...state, loading:false }
    case SET_SEARCH_TABLE_DATA:
        return { ...state,searchDataTable:payload }
    case SET_SEARCH_FILTERED_DATA:
        return { ...state,fileteredSearchData:payload}
    case SET_SELECTED_CITIES:
        return {...state,selectedFilteredCities:payload}
    case SET_SELECTED_DESTICTS:
        return {...state,selectedFilteredDesticts:payload}
    case SET_DATE_FILTER:
        return {...state,dateFilter:payload}
    default:
        return state
    }
}
