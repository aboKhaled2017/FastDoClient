import { IStkDrugsPackage } from "./Interfaces";

interface ISearchStockDrugsView_OpenObjStatus{
    open:boolean,opendSince:Date
}
type TPackageMetaData_body_FromStock_DrugDetails=[string,number];
interface IPackageMetaData_body_FromStock{
    stockId:string 
    drugsList:TPackageMetaData_body_FromStock_DrugDetails[]
}
interface IPackageMetaData_body{
 name:string 
 fromStocks:IPackageMetaData_body_FromStock[]
}
interface IPackageMetaData{
    id:string 
    name:string 
    isUpdated:boolean
    body:IPackageMetaData_body
}

const localSettings={
    VisitSearchStkDrugsView_Settings:{
        _searchInStockDrusViewAlert:'SearchInStockDrusViewAlert',
        _getOpenObjStatus(){
          var e= localStorage.getItem(this._searchInStockDrusViewAlert);
          if(e) e=JSON.parse(e);
          return e as any as ISearchStockDrugsView_OpenObjStatus;
        },
        setMainAlertOpenedNow(){
            localStorage
            .setItem(this._searchInStockDrusViewAlert,JSON.stringify({open:true,opendSince:new Date()}));
        },
        isMainAlertWillBeOpened(){

            let openObj=this._getOpenObjStatus();
            if(!openObj){
                openObj={open:false,opendSince:new Date()};
                localStorage.setItem(this._searchInStockDrusViewAlert,JSON.stringify(openObj));
            }
            let isOpenedForData=(new Date().getDate()-new Date(openObj.opendSince).getDate())!==0;
            return !openObj.open || isOpenedForData;
        }
    }
}

const packageService={
  _packageServicesAtLocalStorage:'ProccessedStkDrugsLocally',
 _getPackageMetaData(id:string,packBody:IPackageMetaData_body,isUpdated:boolean):IPackageMetaData{
   let convertedPackage:IPackageMetaData={
       id,
       isUpdated:isUpdated,
       name:packBody.name,
       body:packBody
   };
   return convertedPackage;
  },
  _getPackageBodyFromJson(p:string|null){
    return p
    ?(JSON.parse(p) as IPackageMetaData).body
    :null;
  },
  RegisterPackage(id:string,pack:IPackageMetaData_body){
   var p=JSON.stringify(this._getPackageMetaData(id,pack,false));
   localStorage.setItem(`${this._packageServicesAtLocalStorage}_${id}`,p);
  },
  EditPackage(id:string,pack:IPackageMetaData_body){
    var p=JSON.stringify(this._getPackageMetaData(id,pack,true));
    localStorage.setItem(`${this._packageServicesAtLocalStorage}_${id}`,p);
  },
  CheckIfPackageUpdatedLocally(id:string){
   return localStorage.getItem(`${this._packageServicesAtLocalStorage}_${id}`)
   ?true:false
  },
  GetPackageUpdatedBody(id:string){
      var packStr=localStorage.getItem(`${this._packageServicesAtLocalStorage}_${id}`);
       return this._getPackageBodyFromJson(packStr);
  },
  GetPackageUpdatedBodyFromPackage(pack:IStkDrugsPackage){
   return {
        name:pack.name,
        fromStocks:pack.fromStocks.map(s=>({
            stockId:s.id,
            drugsList:s.drugs.map(d=>([d.id,d.quantity]))
        }))
   } as IPackageMetaData_body
  }
}
export {localSettings,packageService}