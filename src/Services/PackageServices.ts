import { IPackageMetaData_body } from "@/Views/StkDrugsSearch/Interfaces";

const getBodyFromPackage=(body:IPackageMetaData_body)=>{
    body.fromStocks=body.fromStocks.filter(e=>e.drugsList.length>0);
    for(let s of body.fromStocks){
        s.drugsList=s.drugsList.filter(e=>e.length>0);
    }
    return body;
}
export{
    getBodyFromPackage
}