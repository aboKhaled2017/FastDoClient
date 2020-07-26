import { LOADING_SEARCH_DATA, SET_SEARCH_FILTERED_DATA, SET_SEARCH_TABLE_DATA, SET_SELECTED_CITIES, SET_SELECTED_DESTICTS, Stop_LOADING_SEARCH_DATA, SET_DATE_FILTER, SET_ERRORS_ON_FETCH_SEARCH_DATA, SET_SEARCH_Q, SET_SEARCH_CITYIDS, SET_SEARCH_AREAIDS, SET_SEARCH_VALIDBEFORE, SET_SEARCH_ORDERBY, SET_SEARCH_PAGESIZE, SET_SEARCH_PAGENUMBER, SET_SEARCH_PAGENUMBER_AND_PAGESIZE, UPDATE_DRGS_SEARCH_ROW_AFTER_REQUEST_ADDED } from "../types"
import { ISearchDataState } from "../../Interfaces/States"
import { clone } from "../../Helpers/HelperArrayFuncs"


const initialState:ISearchDataState= {
loading:false ,
searchDataTable:{
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
filtering:{
    s:null,
    orderBy:null,
    AreaIds:null,
    CityIds:null,
    PhramId:null,
    ValidBefore:null,
    pageSize:5,
    pageNumber:1
},
dateFilter:{
    before:null,
    after:null
},
errorMess:null
}

export default (state = {...clone(initialState)}, { type, payload }:{type:string,payload:any}):ISearchDataState => {
    switch (type) {
    case LOADING_SEARCH_DATA:
         return { ...clone(state), loading:true }
    case Stop_LOADING_SEARCH_DATA:
         return { ...clone(state), loading:false }
    case SET_SEARCH_TABLE_DATA:
        return { ...clone(state),searchDataTable:{...payload},loading:false}
    /*case SET_SEARCH_FILTERED_DATA:
        return { ...clone(state),fileteredSearchData:{...payload}}*/
    case SET_DATE_FILTER:
        return {...clone(state),dateFilter:{...payload}}
    case SET_ERRORS_ON_FETCH_SEARCH_DATA:
        return {...clone(state),loading:false,errorMess:payload}
    case SET_SEARCH_Q:
        return {...clone(state),filtering:{...clone(state.filtering),s:payload,pageNumber:1}}
    case SET_SEARCH_CITYIDS:
        return {...clone(state),filtering:{...clone(state.filtering),CityIds:payload,AreaIds:null,pageNumber:1}}
    case SET_SEARCH_AREAIDS:
        return {...clone(state),filtering:{...clone(state.filtering),AreaIds:payload,pageNumber:1}}
    case SET_SEARCH_VALIDBEFORE:
        return {...clone(state),filtering:{...clone(state.filtering),ValidBefore:payload,pageNumber:1}}
    case SET_SEARCH_ORDERBY:
        return {...clone(state),filtering:{...clone(state.filtering),orderBy:payload}}
    case SET_SEARCH_PAGESIZE:
        return {...clone(state),filtering:{...clone(state.filtering),pageSize:payload,pageNumber:1}}
    case SET_SEARCH_PAGENUMBER:
        return {...clone(state),filtering:{...clone(state.filtering),pageNumber:payload}}
    case SET_SEARCH_PAGENUMBER_AND_PAGESIZE:
        return {...clone(state),filtering:{...clone(state.filtering),...payload}}
    case UPDATE_DRGS_SEARCH_ROW_AFTER_REQUEST_ADDED:
        return {...clone(state),searchDataTable:{...state.searchDataTable,rows:payload}}
    default:
        return state
    }
}
