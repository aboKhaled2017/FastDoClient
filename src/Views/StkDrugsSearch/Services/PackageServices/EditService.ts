import { IHttpObjectHandler, IPackageMetaData, IPackageMetaData_body, IProccessedStkDrugsLocallyOptions,
     ISearchStockDrugsView_OpenObjStatus, IStkDrugsPackage, I_PaginationReq_To_GetPage } from "@Views/StkDrugsSearch/Interfaces";
import axios from 'axios';
import { Make_Url_With_PaginationData_Params, MessageAlerter } from "@/Commons/Services";
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
  __packageServicesAtLocalStorage_Options:'ProccessedStkDrugsLocally_Options',
 _getPackageMetaData(pack:IStkDrugsPackage,isUpdated:boolean):IPackageMetaData{
   let convertedPackage:IPackageMetaData={      
       isUpdated:isUpdated,
       pack
   };
   return convertedPackage;
  },
  _getPackageBodyFromJson(p:string|null){
    return p
    ?this.GetPackageUpdatedBodyFromPackage((JSON.parse(p) as IPackageMetaData).pack)
    :null;
  },
  RegisterPackage(pack:IStkDrugsPackage){
   var p=JSON.stringify(this._getPackageMetaData(pack,false));
   localStorage.setItem(`${this._packageServicesAtLocalStorage}_${pack.packageId}`,p);
  },
  _UnRegisterPackage(id:string){
    localStorage.removeItem(`${this._packageServicesAtLocalStorage}_${id}`);
  },
  _notused_EditPackage(pack:IStkDrugsPackage){
    var p=JSON.stringify(this._getPackageMetaData(pack,true));
    localStorage.setItem(`${this._packageServicesAtLocalStorage}_${pack.packageId}`,p);
  },
  _CheckIfCurrentProccessedPackageIdIsAvaialbe(){
   var optionsStr= localStorage.getItem(this.__packageServicesAtLocalStorage_Options)
   if(!optionsStr)return null;
   var options=JSON.parse(optionsStr) as IProccessedStkDrugsLocallyOptions;
   if(!options)return null;
   return options.currentWillEditId;
  },
  GetCurrentPackageToProcessed(){
      var id=this._CheckIfCurrentProccessedPackageIdIsAvaialbe();
      if(!id)return null;
      var packStr=localStorage.getItem(`${this._packageServicesAtLocalStorage}_${id}`);
       return (JSON.parse(packStr as string) as IPackageMetaData)?.pack??null;
  },
  GetPackageUpdatedBodyFromPackage(pack:IStkDrugsPackage){
   return {
        name:pack.name,
        fromStocks:pack.fromStocks.map(s=>({
            stockId:s.id,
            drugsList:s.drugs.map(d=>([d.id,d.quantity]))
        }))
   } as IPackageMetaData_body
  },
   SetCurrentPackageToEdit(id:string){
     let optionsStr=localStorage.getItem(this.__packageServicesAtLocalStorage_Options);
     if(!optionsStr){        
         optionsStr=JSON.stringify({currentWillEditId:id})
         localStorage.setItem(this.__packageServicesAtLocalStorage_Options,optionsStr);
     }
     let options=JSON.parse(optionsStr as string) as IProccessedStkDrugsLocallyOptions;
     options.currentWillEditId=id;
     localStorage.setItem(this.__packageServicesAtLocalStorage_Options,JSON.stringify(options));
 },
 HandleOnPackageFinishEditing(){
    var currId=this._CheckIfCurrentProccessedPackageIdIsAvaialbe();
    if(!currId)return;
    let optionsStr=localStorage.getItem(this.__packageServicesAtLocalStorage_Options);
    if(!optionsStr)return;
    localStorage.removeItem(this.__packageServicesAtLocalStorage_Options);
    this._UnRegisterPackage(currId);
 }

}

class PackageFromHttpService{
 private static _instance:PackageFromHttpService=null as any;

 private pagingReq:I_PaginationReq_To_GetPage={
  pageNumber:1,
  pageSize:10
 };
 private isDataFetchedBefaore:boolean=false;
 private res:any;
 private constructor(){}
 static Create(pagingReq?:I_PaginationReq_To_GetPage):PackageFromHttpService{
   if(!this._instance)this._instance=new PackageFromHttpService();
   if(pagingReq)this._instance.pagingReq=pagingReq;
   return this._instance;
 }
 Subscibe(handler:IHttpObjectHandler,refresh:boolean=true){
 
  if(refresh || !this.isDataFetchedBefaore)
  this.getPageOfSearchedStkDrugs(handler);
  else{
    handler.OnSuccess(this.res);
    if(handler.OnComplete) handler.OnComplete();
  }
 }
 private getPageOfSearchedStkDrugs=(handler:IHttpObjectHandler)=>{
  axios.get(Make_Url_With_PaginationData_Params('pharmas/stkdrugpackage?',this.pagingReq))
 .then(res=>{
      this.isDataFetchedBefaore=true;
      this.res=res;
      handler.OnSuccess(res);
      
 })
 .catch(()=>{
    MessageAlerter.alertServerError();
    if(handler.OnError) handler.OnError();    
 })
 .finally(()=>{
  
    if(handler.OnComplete) handler.OnComplete();

 })
};
}
export  {PackageFromHttpService,localSettings,packageService}