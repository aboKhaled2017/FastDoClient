import React from 'react';
export const displayError=(error:string[]|undefined)=>{
    if(!error || error.length==0)return "";
     return (<div>
              {
              (error as string[]).map(err=>(
                  <div>{err}</div>
                  ))
              }
            </div>)
  }