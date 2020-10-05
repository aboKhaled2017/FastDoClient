export interface IPagination{
    totalCount:number 
    pageSize:number 
    currentPage:number 
    totalPages:number 
    prevPageLink:string|null
    nextPageLink:string|null
}
export interface I_PaginationReq_To_GetPage{
    pageNumber?:number 
    pageSize?:number 
    s?:string
}

export interface IMyJoinedStockDataModel{
    stockId:string 
    name:string 
    addressInDetails: string
    address:string
    phoneNumber:string
    landeLinePhone:string
}
export interface ISearchStockModel{
    id:string 
    name:string 
    persPhone:string 
    landlinePhone:number
    address:string
    addressInDetails: string|null
    areaId: number
    joinedPharmesCount: number
    drugsCount: number
}
export enum E_PharmaRequestStkStatus
{
    Pending ,
    Accepted ,
    Rejected ,
    Disabled 
}
export interface IRequestedStocDataModel{
    stockId:string
    status:E_PharmaRequestStkStatus 
    seen:boolean
    address: string
    addressInDetails:string
    name: string
    persPhone: string
    landLinePhone: string
}