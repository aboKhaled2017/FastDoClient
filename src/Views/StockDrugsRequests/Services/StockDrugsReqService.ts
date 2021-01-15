import { Make_Url_With_PaginationData_Params, MessageAlerter } from '@/Commons/Services';
import axios from 'axios';
import { I_PaginationReq_To_GetPage } from '@Views/StockDrugsRequests/Interfaces';
import { EStockDrugsPackgStatus } from '../../../Interfaces/StockDrgsRequestsTypes';

interface IGetPageOfRequests{
    pageRequest:I_PaginationReq_To_GetPage
    onComplete:Function 
    onDone:Function 
    onError?:Function
}
interface ISetRequestStatus{
    id:string
    val:EStockDrugsPackgStatus
    onComplete:Function 
    onDone:Function 
    onError?:Function
}
interface IRequestServices{
    [key:string]:any
    getPageOfStockDrugsRequests:(props:IGetPageOfRequests)=>void
    setRequestStatus:(props:ISetRequestStatus)=>void
}

const RequestServices:IRequestServices={} as any;
RequestServices.getPageOfStockDrugsRequests=(props)=>{
    const {pageRequest,onComplete,onDone,onError}=props;
    
    axios.get(Make_Url_With_PaginationData_Params('stk/drugsReqs?',pageRequest))
    .then(res=>{
     onDone(res);
    })
    .catch(err=>{
    onError?.call(RequestServices);
    if(err.status===404){
        MessageAlerter.alertNotFoundError();
          return;
      }
      if(!err.response) 
      {
         MessageAlerter.alertProcessingErrorAtServer();
          return;
      }
      alert(JSON.stringify(err.response.data.errors))
    })
    .finally(()=>{
     onComplete();
    });
}
RequestServices.setRequestStatus=(props)=>{
    const {id,val,onComplete,onDone,onError}=props;
    const reqBody=[
        {
          "op":"replace",
          "value":true,
          "path":"/Seen"
        },
        {
          "op":"replace",
          "value":val,
          "path":"/Status"
        }
      ];
    axios.patch(`stk/drugsReqs/${id}`,reqBody)
    .then(()=>{
     onDone();
    })
    .catch(err=>{
    onError?.call(RequestServices);
    if(err.status===404){
        MessageAlerter.alertNotFoundError();
          return;
      }
      if(!err.response) 
      {
         MessageAlerter.alertProcessingErrorAtServer();
          return;
      }
      alert(JSON.stringify(err.response.data.errors))
    })
    .finally(()=>{
     onComplete();
    });
}
export {
    RequestServices
}