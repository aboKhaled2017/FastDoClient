import { E_LzDrg_UnitType } from "../../Interfaces/DrugsTypes";
import { LzDrg_UnitTypesList } from "../ManageMyDrugs/Interfaces";
import { I_Drgs_SearchModel } from "../../Interfaces/SearchDrugsTypes";

export function getDrugUnitType(unitType:E_LzDrg_UnitType){
return LzDrg_UnitTypesList.find(u=>u.value==unitType)?.title as string;
}
export function getDrugDesc(desc:string|null){
   return desc?desc:"لم تقم انت بأضافة وصف او ملاحظات على راكدك";
}
export function Get_LzDrgStateFormate(lzDrugModel:I_Drgs_SearchModel){
    const unitTypeName=LzDrg_UnitTypesList.find(v=>v.value==lzDrugModel.unitType)?.title;
    return `يوجد لدى عدد ${lzDrugModel.quantity} ${unitTypeName} من  ${lzDrugModel.name} - ${lzDrugModel.type} - بسعر ${lzDrugModel.price} جنية لل/${unitTypeName}`
}
