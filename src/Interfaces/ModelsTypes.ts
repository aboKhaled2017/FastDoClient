import { LazDrugUnitType, LazDrugPriceType, LazDrugConsumeType } from './DataTypes';
export interface ILazDrugModel{
    id:string
    name:string
    quantity:number 
    unitType:LazDrugUnitType
    priceType:LazDrugPriceType
    validDate:Date
    price:number
    drugType:string 
    desc:string
    discount:number|null
    consumeType:LazDrugConsumeType
}
export interface ILzDrugsTableRow {
    id:string
    name: string
    type:string 
    desc:string
    quantity: number
    price:number
    consumeType: number
    discount: number
    validDate:Date
    priceType:number     
  }