import { EStockDrugsPackgStatus, IStkDrugsRequest } from '@/Interfaces/StockDrgsRequestsTypes';
import store from '@/Redux/store';

const _requestStatuses=[
    "all",
   EStockDrugsPackgStatus.Pending,
   EStockDrugsPackgStatus.Accepted,
   EStockDrugsPackgStatus.Rejected,
   EStockDrugsPackgStatus.Completed,
   EStockDrugsPackgStatus.CanceledFromStk,
   EStockDrugsPackgStatus.CanceledFromPharma,
   EStockDrugsPackgStatus.AtNegotioation
] as (number|"all")[];

const getStockDrugsRequestsStatuses=()=>{
 return _requestStatuses;
}
const RequestStatusMapping=(el:EStockDrugsPackgStatus|"all")=>{
    /*if(typeof(el)=="number")
        el=el-1;*/
    switch(el){
        case EStockDrugsPackgStatus.Accepted :return 'مقبول';
        case EStockDrugsPackgStatus.Rejected :return 'مرفوض';
        case EStockDrugsPackgStatus.Pending :return 'معلق';
        case EStockDrugsPackgStatus.AtNegotioation :return 'فى حالة تفاوض';
        case EStockDrugsPackgStatus.CanceledFromPharma :return 'تم الالغاء من طرف الصيدلية';
        case EStockDrugsPackgStatus.Completed :return 'مكتملة';
        case EStockDrugsPackgStatus.CanceledFromStk :return 'تم الالغاء من طرف المخزن';
        case 'all' :return 'الكل';
        default :return 'الكل';
    }
}
const updateStockRequests=(request:IStkDrugsRequest,execute:(newData:IStkDrugsRequest[])=>void)=>{
    var requests=store.getState().data.stockDrugsRequests;
    var reqInd=requests.findIndex(e=>e.packageId===request.packageId);
    requests.splice(reqInd,1,request);
    execute(requests);
}
export default{
    updateStockRequests,
    getStockDrugsRequestsStatuses,RequestStatusMapping
}