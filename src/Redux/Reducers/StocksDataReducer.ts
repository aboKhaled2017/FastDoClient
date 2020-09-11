import { LOADING_STOCK_DATA ,STOP_LOADING_STOCK_DATA,REfRESH_STOCK_PRODS_DATA,SET_ERROR_ON_FETCH_STOCK_DATA} from "../types"
import dataRecords from "../../Views/DrugSearch/TableData"
import { IDataState, IStocksDataState } from "../../Interfaces/States"
import { clone } from "../../Helpers/HelperArrayFuncs"


const initialState:IStocksDataState= {
    loading:false,
    DataStore:{
        rows:[],
        pagination:{
            currentPage:1,
            nextPageLink:null,
            prevPageLink:null,
            pageSize:3,
            totalCount:0,
            totalPages:0
        }
    }
}

export default (state:IStocksDataState = clone({...initialState}), { type, payload }:{type:string,payload:any}):IStocksDataState => {
    switch (type) {
    case LOADING_STOCK_DATA:
         return {...clone(state), loading:true }
    case STOP_LOADING_STOCK_DATA:
         return {...clone(state), loading:false }
    
    case SET_ERROR_ON_FETCH_STOCK_DATA:
        return {...clone(state),loading:false}
    case REfRESH_STOCK_PRODS_DATA:
        return {...clone(state),loading:false,DataStore:{...clone(payload)}}
    
    default:
        return {...clone(state)}
    }
}
