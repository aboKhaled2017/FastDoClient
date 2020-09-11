
export interface I_StockProd_DataModel{
    id:string,
    name:string
    price:number
    discount:string   
}
export interface I_StockProds_Pagination{
    totalCount:number 
    pageSize:number 
    currentPage:number 
    totalPages:number 
    prevPageLink:string|null
    nextPageLink:string|null
}
export interface IStockDataStore{
    rows:I_StockProd_DataModel[]
    pagination:I_StockProds_Pagination
}
