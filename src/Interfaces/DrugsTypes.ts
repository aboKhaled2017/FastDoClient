export enum E_LzDrg_ConsumeType{
    burning,
    exchanging
}
export enum E_LzDrg_PriceType{
    oldP,newP
}
export enum E_LzDrg_UnitType{
    shareet,
    elba,
    capsole,
    cartoon,
    unit
}
export interface I_Drug_DataModel{
    id:string,
    name:string
    type:string
    quantity:number
    price:number
    consumeType:E_LzDrg_ConsumeType
    discount:number
    valideDate:string
    priceType:E_LzDrg_PriceType
    unitType:E_LzDrg_UnitType
    desc:string
    requestCount:number
}
export interface I_Drug_Pagination{
    totalCount:number 
    pageSize:number 
    currentPage:number 
    totalPages:number 
    prevPageLink:string|null
    nextPageLink:string|null
}
export interface I_GetMyDrugsData{
    rows:I_Drug_DataModel[]
    pagination:I_Drug_Pagination
}
export interface I_PaginationReq_To_GetDrugs{
    pageNumber?:number 
    pageSize?:number 
    orderBy?:string
}
export enum E_LzDrgRequestStatus
{
    Pending,
    Accepted,
    Rejected,
    Completed,
    AtNegotioation,
    AcceptedForAnotherOne
}
export interface I_DrgRequest_I_Received{
    id:string 
    lzDrugId:string
    lzDrugName:string
    status:E_LzDrgRequestStatus
    pharmacyId:string
    phName:string
}
export interface I_DrgRequest_I_Made{
    id:string 
    lzDrugId:string
    lzDrugName:string
    status:E_LzDrgRequestStatus
    pharmacyId:string
    phName:string
}
export interface I_DrgRequest_I_Received_Data{
    rows:I_DrgRequest_I_Received[]
    pagination:I_Drug_Pagination
}
export interface I_DrgRequest_I_Made_Data{
    rows:I_DrgRequest_I_Made[]
    pagination:I_Drug_Pagination
}