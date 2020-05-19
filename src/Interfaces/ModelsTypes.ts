import { LazDrugUnitType, LazDrugPriceType, LazDrugContractType } from './DataTypes';
export interface ILazDrugModel{
    id:string
    name:string
    quntity:number 
    unitType:LazDrugUnitType
    priceType:LazDrugPriceType
    validDate:Date
    price:number
    drugType:string 
    note:string
    discount:number|null
    contractType:LazDrugContractType
}