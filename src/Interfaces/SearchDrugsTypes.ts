import { E_LzDrg_PriceType, E_LzDrg_UnitType, E_LzDrgRequestStatus } from "./DrugsTypes"

export interface I_Drgs_SearchModel{
    id:string
        name:string
        type:string
        quantity:number
        price:number
        discount:number
        valideDate:string,
        priceType:E_LzDrg_PriceType
        unitType:E_LzDrg_UnitType
        desc:string
        pharmacyId:string
        pharmName:string
        pharmLocation:string
        requestUrl:string
        requestsCount:number
        isMadeRequest:boolean
        status:E_LzDrgRequestStatus|null
        requestId:string|null
}
export interface I_Drgs_SearchPaging{
        totalCount:number 
        pageSize:number 
        currentPage:number 
        totalPages:number 
        prevPageLink:string|null
        nextPageLink:string|null
}
export interface I_Drgs_SeachData{
    rows:I_Drgs_SearchModel[]
    pagination:I_Drgs_SearchPaging
}

export interface I_Drgs_SearchPaging_Parmas{
    s?:string
    pageSize:number 
    pageNumber:number
    orderBy?:string
    CityIds?:string
    AreaIds?:string 
    PhramId?:string 
    ValidBefore?:string 
}
export interface I_Drgs_SearchFiltering{
    s:string|null,
    orderBy:string|null
    CityIds:string|null
    AreaIds:string|null
    PhramId:string|null
    ValidBefore:string|null
    pageSize:number
    pageNumber:number
}

export interface I_Drgs_Search_ReturnModelAfterAdded{
    id:string
    lzDrugId:string
    pharmacyId:string
    seen:boolean
    status:E_LzDrgRequestStatus|null
}