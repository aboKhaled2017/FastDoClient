import { IPagination } from "@/Interfaces/General";
import { IStockGData } from "@/Interfaces/ModelsTypes";

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
    stockId?:string
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

export enum E_StkPackageViewSwitcher{
    SearchForStkDrugsPackages,
    ViewForPharmaStkDrugsPackages,
    EditForPharmaStkDrugsPackages
}

export interface ISearchStockDrugsView_OpenObjStatus{
    open:boolean,opendSince:Date
}
export type TPackageMetaData_body_FromStock_DrugDetails=[string,number];
export interface IPackageMetaData_body_FromStock{
    stockId:string 
    drugsList:TPackageMetaData_body_FromStock_DrugDetails[]
}
export interface IPackageMetaData_body{
 name:string 
 fromStocks:IPackageMetaData_body_FromStock[]
}
export interface IPackageMetaData{
    pack: IStkDrugsPackage
    isUpdated:boolean   
}
export interface IProccessedStkDrugsLocallyOptions{
    currentWillEditId:string
}
export interface IGViewContext{
 loading:boolean
 packagesSettings:{
    packages:IStkDrugsPackage[]
    selectedPackage?:IStkDrugsPackage
    hasEdit:boolean
 }
}
export interface IHttpObjectHandler{
    OnSuccess:(res:any)=>void 
    OnError?:()=>void 
    OnComplete?:()=>void
}
export interface ISearchDrugsContext{
    dataRows:ISearchStkDrugData[]
    pagingObj:IPagination
    pagingReq:I_PaginationReq_To_GetPage
    handleRefresh:()=>void
    onPageNumberSelected:(pageNumber:number)=>void
    onSetPageSize:(pageSize:number)=>void
    onSearchText:(s:string)=>void
    onSelectedStock:(stock:IStockGData)=>void
    selectedStock:IStockGData|undefined
}
