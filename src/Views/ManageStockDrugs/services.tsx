import { IAddNewLzDrg, LzDrg_UnitTypesList } from "./Interfaces";
import { I_Drug_DataModel } from "../../Interfaces/DrugsTypes";

export function Get_LiveState_For_AddLzDrug(lzDrugModel:IAddNewLzDrg){
    const unitTypeName=LzDrg_UnitTypesList.find(v=>v.value==lzDrugModel.unitType)?.title;
    return `يوجد لدى عدد ${lzDrugModel.quantity} ${unitTypeName} من  ${lzDrugModel.name} - ${lzDrugModel.type} - بسعر ${lzDrugModel.price} جنية لل/${unitTypeName}`
}
export function Get_LzDrgStateFormate(lzDrugModel:I_Drug_DataModel){
    const unitTypeName=LzDrg_UnitTypesList.find(v=>v.value==lzDrugModel.unitType)?.title;
    return `يوجد لدى عدد ${lzDrugModel.quantity} ${unitTypeName} من  ${lzDrugModel.name} - ${lzDrugModel.type} - بسعر ${lzDrugModel.price} جنية لل/${unitTypeName}`
}