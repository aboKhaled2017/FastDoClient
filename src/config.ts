export  const credentials={
    auth:true
}
export const Base_URLs={
    production_Url:'http://fastdo.azurewebsites.net/api/',
    local_BaseUrl:"http://localhost:10/api/",
    get BaseUrl(){return this.local_BaseUrl}
}
export const Fetch_Headers=new Headers();
Fetch_Headers.append("Content-Type", "application/json");

export const AppVariables={
    sharedSection:{
        enableSharedSection:false,
        component:null
    }
}