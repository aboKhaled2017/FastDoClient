import { IAddNewLzDrg, LzDrg_TypesList, LzDrg_UnitTypesList } from "./Interfaces";

export function Get_LiveState_For_AddLzDrug(lzDrugModel:IAddNewLzDrg){
    const unitTypeName=LzDrg_UnitTypesList.find(v=>v.value==lzDrugModel.unitType)?.title;
    return `يوجد لدى عدد ${lzDrugModel.quantity} ${unitTypeName} من  ${lzDrugModel.name} - ${lzDrugModel.type} - بسعر ${lzDrugModel.price} جنية لل/${unitTypeName}`
}