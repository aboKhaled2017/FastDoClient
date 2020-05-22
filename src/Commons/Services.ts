import { ILazDrugModel } from "../Interfaces/ModelsTypes";
import { LazDrugsUnitTypes, LazDrugPriceType, LazDrugConsumeType, IDrugPackage } from "../Interfaces/DataTypes";

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
export function getDrugPriceType(priceType:LazDrugPriceType){
   return priceType==LazDrugPriceType.new?"سعر جديد":"سعر قديم";
}
export function getDrugConsumeType(consumeType:LazDrugConsumeType,discount:number|null){
  return consumeType==LazDrugConsumeType.burning
  ?`بيع/حرق مباشرة بخصم ${discount} %`
  :"استبدال جمهور مع جمهور";
}
export function getDrugDesc(desc:string|null){
  return desc?desc:"لم تقم انت بأضافة وصف او ملاحظات على راكدك";
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
  static addDrugToPackage(name:string,drugModel:ILazDrugModel,quantity:number){
    let packages=this.getCurrentPackagesFromStore();
    let index=packages.findIndex(p=>p.name===name);
    let packg=packages.find(pack=>pack.name===name) as IDrugPackage;
    packg.items.push({
      id:drugModel.id,
      name:drugModel.name,
      quantity:drugModel.quantity,
      price:drugModel.price
    });
    packages.splice(index,1)
    packg.totalPrice=packg.items.reduce((prevValue,currItem,i)=>{
      return prevValue+currItem.price*currItem.quantity
    },0)
    packages.push(packg)
    this.setCurrentPackagesToStore(packages)
  }
  static addNew(name:string,value:number){
      let packages=this.getCurrentPackagesFromStore();
      packages.push({name,items:[],totalPrice:0,value});
      this.setCurrentPackagesToStore(packages);
  }
  static remove(name:string){
    let packages=this.getCurrentPackagesFromStore();
    let index=packages.findIndex(drug=>drug.name===name);
    packages.splice(index,1);
    this.setCurrentPackagesToStore(packages);
  } 
  static associatedPackage(id:string){
    let packages=this.getCurrentPackagesFromStore();
    return packages.find(p=>p.items.some(el=>el.id===id));   
  }
}