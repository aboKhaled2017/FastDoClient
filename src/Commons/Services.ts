import { ILazDrugModel } from "../Interfaces/ModelsTypes";
import { LazDrugsUnitTypes, LazDrugPriceType, LazDrugConsumeType, IDrugPackage, LazDrugUnitType } from "../Interfaces/DataTypes";

export function a11yProps(index:any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export function getLzDrugStateFormate(lzDrugModel:ILazDrugModel){
  const unitTypeName=LazDrugsUnitTypes.find(v=>v.value==lzDrugModel.unitType)?.title;
  return `يوجد لدى عدد ${lzDrugModel.quantity} ${unitTypeName} من  ${lzDrugModel.name} - ${lzDrugModel.type} - بسعر ${lzDrugModel.price} جنية لل/${unitTypeName}`
}
export function getDrugValidDate(date:Date){
  return `${date.toLocaleDateString()}`
}
export function displayDrugValidDateAs_MMYYYY_Formate(date:Date){
  return `${date.getMonth()+1} - ${date.getFullYear()}`
}
export function getDrugPriceType(priceType:LazDrugPriceType){
   return priceType==LazDrugPriceType.new?"سعر جديد":"سعر قديم";
}
export function getDrugConsumeType(consumeType:LazDrugConsumeType,discount:number|null){
  return consumeType==LazDrugConsumeType.burning
  ?`بيع/حرق مباشرة بخصم ${discount} %`
  :"استبدال جمهور مع جمهور";
}
export function getDrugUnitType(unitType:LazDrugUnitType){
  return LazDrugsUnitTypes.find(u=>u.value==unitType)?.title as string;
}
export function getDrugDesc(desc:string|null){
  return desc?desc:"لم تقم انت بأضافة وصف او ملاحظات على راكدك";
}
export function getDrugFromPackage(packg:IDrugPackage,drugId:string){
  return packg.items.find(d=>d.id===drugId)
}
export function getAvaialableQuantity(drugModel:ILazDrugModel,connectedPackgs:IDrugPackage[]){
  return drugModel.quantity-connectedPackgs.reduce((prevValue,currentPackg,i)=>{
      let item=getDrugFromPackage(currentPackg,drugModel.id)
      if(!item)return prevValue;
      return prevValue+item.quantity;
  },0)
}
export class DrugsPackges{
  private static key="packages"
  private static drugPackages:IDrugPackage[]=[]
  private static getCurrentPackagesFromStore(){
    if(!localStorage.getItem(this.key))
      localStorage.setItem(this.key,JSON.stringify([]));
      return JSON.parse(localStorage.getItem(this.key) as string) as IDrugPackage[];
  } 
  private static setCurrentPackagesToStore(packages:IDrugPackage[]){
    localStorage.setItem(this.key,JSON.stringify(packages));
    this.drugPackages=packages;
  }
  static get(){
   let packagesStr=localStorage.getItem(this.key) as string;
   if(!packagesStr)return [];
   return JSON.parse(packagesStr) as IDrugPackage[]
  }
  static addDrugToPackage(packName:string,drugModel:ILazDrugModel,quantity:number){
    let packages=this.getCurrentPackagesFromStore();
    let index=packages.findIndex(p=>p.name===packName);
    let packg=packages.find(pack=>pack.name===packName) as IDrugPackage;
    if(packg.items.findIndex(s=>s.id===drugModel.id)>-1){
      return {
        done:false,
        error:'هذا الراكد مضاف من قبل الى هذه الباقة'
      }
    }
    packg.items.push({
      id:drugModel.id,
      name:drugModel.name,
      quantity:quantity,
      price:drugModel.price
    });
    packages.splice(index,1)
    packg.totalPrice=packg.items.reduce((prevValue,currItem,i)=>{
      return prevValue+currItem.price*currItem.quantity
    },0)
    packages.push(packg)
    this.setCurrentPackagesToStore(packages)
    return {done:true}
  }
  static removeDrugFromPackage(packName:string,drugId:string){
    let packages=this.getCurrentPackagesFromStore();
    let index=packages.findIndex(p=>p.name===packName);
    if(index<0)return;
    let packg=packages.find(pack=>pack.name===packName) as IDrugPackage;
    let drugIndex=packg.items.findIndex(d=>d.id===drugId);
    if(!(packg && drugIndex>-1))return;
    let drug=packg.items[drugIndex];
    packg.totalPrice-=drug.quantity*drug.price
    packg.items.splice(drugIndex,1);
    
    packages[index]=packg
    this.setCurrentPackagesToStore(packages)
  }
  static addNew(name:string,value:number,desc:string){
      if(this.getPackageByName(name)){
        return {done:false,error:'هذا الاسم موجود بالفعل'}
      }
      let packages=this.getCurrentPackagesFromStore();
      packages.push({name,desc,imgSrc:'default.jpg',items:[],totalPrice:0,value});
      this.setCurrentPackagesToStore(packages);
      return {done:true}
  }
  static remove(name:string){
    let packages=this.getCurrentPackagesFromStore();
    let index=packages.findIndex(drug=>drug.name===name);
    packages.splice(index,1);
    this.setCurrentPackagesToStore(packages);
  } 
  static associatedPackages(modelId:string){
    let packages=this.getCurrentPackagesFromStore();
    return packages.filter(p=>p.items.some(el=>el.id===modelId));   
  }
  static getPackageByName(name:string){
    let packages=this.getCurrentPackagesFromStore();
    return packages.find(p=>p.name===name);
  }
  static getConsumedQuantityOfDrug(id:string){
    let packages=this.getCurrentPackagesFromStore();
    return packages.reduce((prevVal,packg)=>{
      let drug=getDrugFromPackage(packg,id);
      return prevVal+(drug?drug.quantity:0);
    },0)
  }
}