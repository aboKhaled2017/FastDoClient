import { MessageAlerter } from '@/Commons/Services';
import axios from 'axios';
import { IPackageMetaData_body } from '../../Interfaces';
interface IOnDeletePackage{
    id:string   
    onDone:Function 
    onComplete?:Function 
    onError?:Function
}
interface IRequestServices{
    [key:string]:any
    OnDeletePackage:(props:IOnDeletePackage)=>void
}

const RequestServices:IRequestServices={} as any;
RequestServices.OnDeletePackage=(props)=>{
    const {id,onComplete,onDone,onError}=props;
    axios.delete(`pharmas/stkdrugpackage/${id}`)
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
     onComplete?.call(RequestServices);
    });
}

export {
    RequestServices
}