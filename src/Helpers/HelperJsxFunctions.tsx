import React from 'react';
export const displayError=(error:string[]|string|undefined)=>{
    if(!error ||error.length==0)return "";
    if(typeof error=="string")
       return error;
    return (<div>{error[0]}</div>);
    /*return (<div>
              {
              (error as string[]).map(err=>(
                  <div>{err}</div>
                  ))
              }
            </div>)*/
  }