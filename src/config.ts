import axios from 'axios';
export  const credentials={
    auth:true
}
export const Base_URLs={
    production_Url:'https://www.backend.fastdo.co/api/',
    local_BaseUrl:"https://localhost:44345/api/",
    get BaseUrl(){return this.local_BaseUrl}
}
export const setDefaultConfig=()=>{
    axios.defaults.baseURL=Base_URLs.BaseUrl;
}
export const Fetch_Headers=new Headers();
Fetch_Headers.append("Content-Type", "application/json");

export const AppVariables={
    sharedSection:{
        enableSharedSection:false,
        component:null
    }
}
