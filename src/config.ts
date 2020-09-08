import axios from 'axios';
export  const credentials={
    auth:true
}
export const Base_URLs={
    production_Url:'https://fastdoapp.ga/api/',
    local_BaseUrl:"http://localhost:10/api/",
    get BaseUrl(){return this.production_Url}
}
export const Fetch_Headers=new Headers();
Fetch_Headers.append("Content-Type", "application/json");

export const AppVariables={
    sharedSection:{
        enableSharedSection:false,
        component:null
    }
}
