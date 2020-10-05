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