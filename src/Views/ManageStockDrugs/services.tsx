import { E_PharmaRequestStkStatus } from "./Interfaces";

const IsValidParmaValue=(val:any):boolean=>{
  if(typeof(val)=="number" && val>=0)return true;
  return val;
}
export const Make_Url_With_PaginationData_Params=(baseUrl:string,pageData:any)=>{
    for(let prop in pageData){
      if((pageData as Object).hasOwnProperty(prop) && IsValidParmaValue(pageData[prop]))
      baseUrl+=`${prop}=${pageData[prop]}&`;
    }
    return baseUrl.slice(0,baseUrl.length-1);
}

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