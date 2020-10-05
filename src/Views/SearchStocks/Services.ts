export const Make_Url_With_PaginationData_Params=(baseUrl:string,pageData:any)=>{
    for(let prop in pageData){
      if((pageData as Object).hasOwnProperty(prop) && pageData[prop])
      baseUrl+=`${prop}=${pageData[prop]}&`;
    }
    return baseUrl.slice(0,baseUrl.length-1);
  }