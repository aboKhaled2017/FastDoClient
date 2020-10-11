
export interface IPagination{
    totalCount:number 
    pageSize:number 
    currentPage:number 
    totalPages:number 
    prevPageLink:string|null
    nextPageLink:string|null
}