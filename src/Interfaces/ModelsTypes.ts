import { LazDrugUnitType, LazDrugPriceType, LazDrugConsumeType, IDrugPagesValues } from './DataTypes';
export interface ILazDrugModel{
    id:string
    name:string
    type:string 
    quantity:number 
    unitType:LazDrugUnitType
    priceType:LazDrugPriceType
    validDate:Date
    price:number
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
export interface IAddNewPackage {
    errors:any 
    name:string 
    packgType:IDrugPagesValues
}