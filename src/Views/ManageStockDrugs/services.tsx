import { E_PharmaRequestStkStatus } from "./Interfaces";
export const RequestStatusMapping=(el:E_PharmaRequestStkStatus|"")=>{
  if(typeof(el)=="number")
      el=el-1;
  switch(el){
      case E_PharmaRequestStkStatus.Accepted :return 'مقبول';
      case E_PharmaRequestStkStatus.Rejected :return 'مرفوض';
      case E_PharmaRequestStkStatus.Pending :return 'معلق';
      case E_PharmaRequestStkStatus.Disabled :return 'معطل';
      default :return 'الكل';
  }
}