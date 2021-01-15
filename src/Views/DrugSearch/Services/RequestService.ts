
import axios from 'axios'
import { MessageAlerter } from '@/Commons/Services';
interface ISendRequest{
    id:string 
    onComplete:Function 
    onDone:Function 
    onError?:Function
}
export const SendDrugRequest=(props:ISendRequest)=>{
    const {id,onComplete,onDone,onError}=props;
    axios.post(`phrdrgrequests/${id}`)
    .then(res=>{
     onDone(res.data);
    })
    .catch(err=>{
    onError?.call(SendDrugRequest);
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
export const CancelDrugRequest=(props:ISendRequest)=>{
    const {id,onComplete,onDone,onError}=props;
    axios.delete(`phrdrgrequests/made/${id}`)
    .then(res=>{
     onDone(res.data);
    })
    .catch(err=>{
    onError?.call(SendDrugRequest);
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