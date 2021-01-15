import { EStockDrugsPackgStatus } from '../../Interfaces/StockDrgsRequestsTypes';
export interface I_PaginationReq_To_GetPage{
    pageNumber:number 
    pageSize:number 
    status?:EStockDrugsPackgStatus|"all"
}