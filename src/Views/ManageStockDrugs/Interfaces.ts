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
    status?:E_PharmaRequestStkStatus|""
    pharmaClass?:string
}

export interface IPharmaJoinRequestToStock_PharmaData{
    id:string
    name:string
    address:string
    addressInDetails:string
    phoneNumber:string
    landlinePhone:string
}
export interface IPharmaJoinRequestToStock{
    pharma: IPharmaJoinRequestToStock_PharmaData
    status:E_PharmaRequestStkStatus
    pharmaClass:string
    seen:boolean
}
export interface IStkJoinedPharma_PharmaData{
    id:string
    name:string
    address:string
    addressInDetails:string
    phoneNumber:string
    landlinePhone:string
}
export interface IStkJoinedPharma{
    pharma:IStkJoinedPharma_PharmaData
    pharmaClass:string
    status:E_PharmaRequestStkStatus
}

export enum E_PharmaRequestStkStatus
{
    Pending ,
    Accepted ,
    Rejected ,
    Disabled 
}
