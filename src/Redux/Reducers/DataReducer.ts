import {LOADING_DATA,SET_AREAS_DATA, SET_ERROR_ON_FETCH_DATA, SET_USER_DRUGS_DATA,
        UPDATE_DRGS_DATA_WITH_NEWLLY_ADDED, UPDATE_LZ_DRG, STOP_LOADING_DATA,
        SET_USER_DRUGS_REQS_RECIEVED_DATA, UPDATE_DRGREQUEST_MODEL, 
        SET_USER_DRUGS_REQS_MADE_DATA, RESET_DATA_AFTERLOGOUT } from "../types"

import { IDataState } from "@/Interfaces/States"
import { clone } from "@/Helpers/HelperArrayFuncs"
import { SET_ALL_STOCKS_G_DATA, SET_PHARMA_PACKAGES, SET_PHARMA_SELECTED_PACKAGE, SET_PHARMA_PACKAGEDATA, SET_STCOK_DRUGS_PACKAGES_REQUESTS } from '../types';


const initialState:IDataState= {
    loading:false,
    areas:{
        cities:[],
        destricts:[]
    },
    stockDrugsRequests:[],
    stocksGData:[],
    myDrugs:{
        rows:[],
        pagination:{
            currentPage:1,
            nextPageLink:null,
            prevPageLink:null,
            pageSize:5,
            totalCount:0,
            totalPages:0
        }
    },
    DrgsReq_I_recieved_Data:{
        rows:null as any as [],
        pagination:{
            currentPage:1,
            nextPageLink:null,
            prevPageLink:null,
            pageSize:10,
            totalCount:0,
            totalPages:0
        }
    },
    DrgsReq_I_made_Data:{
        rows:null as any as [],
        pagination:{
            currentPage:1,
            nextPageLink:null,
            prevPageLink:null,
            pageSize:10,
            totalCount:0,
            totalPages:0
        }
    },
    packagesData:{
        packages:[],
        selectedPackageData:{
            hasEdit:false
        }
    }
}

export default (state:IDataState = clone({...initialState}), { type, payload }:{type:string,payload:any}):IDataState => {
    switch (type) {
    case LOADING_DATA:
         return {...clone(state), loading:true }
    case STOP_LOADING_DATA:
         return {...clone(state), loading:false }
    case SET_AREAS_DATA:
         return {...clone(state), loading:false,areas:{...payload} }
    case SET_ALL_STOCKS_G_DATA:
         return {...clone(state), loading:false,stocksGData:payload}
    case SET_ERROR_ON_FETCH_DATA:
        return {...clone(state),loading:false}
    case SET_USER_DRUGS_DATA:
        return {...clone(state),loading:false,myDrugs:{...payload}}
    case SET_USER_DRUGS_REQS_RECIEVED_DATA:
        return {...clone(state),loading:false,DrgsReq_I_recieved_Data:{...payload}}
    case SET_USER_DRUGS_REQS_MADE_DATA:
        return {...clone(state),loading:false,DrgsReq_I_made_Data:{...payload}}
    case UPDATE_DRGS_DATA_WITH_NEWLLY_ADDED:
        return {...clone(state),loading:false,myDrugs:{...payload}}
    case UPDATE_LZ_DRG:
        return {...clone(state),loading:false,myDrugs:{...clone(payload)}}
    case UPDATE_DRGREQUEST_MODEL:
        return {...clone(state),loading:false,DrgsReq_I_recieved_Data:{...clone(payload)}}
    case RESET_DATA_AFTERLOGOUT:
        return  clone({...clone(state),areas:state.areas});
    case SET_PHARMA_PACKAGES:
        return clone({...clone(state),packagesData:{...state.packagesData,packages:payload},loading:false});
    case SET_PHARMA_SELECTED_PACKAGE:
        return clone({...clone(state),packagesData:{...state.packagesData,selectedPackageData:{...payload}},loading:false});
    case SET_PHARMA_PACKAGEDATA:
        return clone({...clone(state),packagesData:payload,loading:false});
    case SET_STCOK_DRUGS_PACKAGES_REQUESTS:
        return  clone({...clone(state),stockDrugsRequests:payload,loading:false});
    default:
        return {...clone(state)}
    }
}
