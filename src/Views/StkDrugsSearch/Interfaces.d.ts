export interface ISearckStkDrugData_StockDrugsData{
    discount:number
    id:string
    price:number
    stockId:string
    stockName:string
    isJoinedTo: boolean
}
export interface ISearchStkDrugData{
    name:string 
    stockCount:number
    stocks:ISearckStkDrugData_StockDrugsData[]
}
export interface I_PaginationReq_To_GetPage{
    pageNumber?:number 
    pageSize?:number 
    s?:string
}

export interface IStkDrugsPackage_FromStock_DrugData{
    id:string 
    name:string 
    quantity:number 
    discount:number 
    price:number
}
export interface IStkDrugsPackage_FromStock{
    id:string 
    name:string
    stockClassId:string
    status:E_IStkDrugsPackage_Status
    seen:boolean
    address:string 
    addressInDetails:string
    drugs:IStkDrugsPackage_FromStock_DrugData[]
}
export enum E_IStkDrugsPackage_Status{
    Pending,
    Accepted,
    Rejected,
    Completed,
    CanceledFromStk,
    CanceledFromPharma,
    AtNegotioation
}
export interface IStkDrugsPackage{
    packageId:string
    name:string     
    createdAt:string
    fromStocks:IStkDrugsPackage_FromStock[]
}