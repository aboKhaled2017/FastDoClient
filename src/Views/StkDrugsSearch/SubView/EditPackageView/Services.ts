import { MessageAlerter } from '@/Commons/Services';
import axios from 'axios';
import { IPackageMetaData_body } from '../../Interfaces';
interface IOnSavePackageChanges{
    packageId:string 
    body:IPackageMetaData_body
    onComplete:Function 
    onDone:Function 
    onError?:Function
}
interface IRequestServices{
    [key:string]:any
    OnSavePackageChanges:(props:IOnSavePackageChanges)=>void
}
const _factorPackageBodyBeforeSend=(body:IPackageMetaData_body)=>{
    body.fromStocks=body.fromStocks.filter(e=>e.drugsList.length>0);
    for(let s of body.fromStocks){
        s.drugsList=s.drugsList.filter(e=>e.length>0);
    }
    return body;
}
const RequestServices:IRequestServices={} as any;
RequestServices.OnSavePackageChanges=(props)=>{
    const {packageId,body,onComplete,onDone,onError}=props;
    axios.put(`pharmas/stkdrugpackage/${packageId}`,_factorPackageBodyBeforeSend(body))
    .then(res=>{
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