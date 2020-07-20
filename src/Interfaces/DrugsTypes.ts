export enum E_LzDrg_ConsumeType{
    burning,
    exchanging
}
export enum E_LzDrg_PriceType{
    oldP,newP
}
export enum E_LzDrg_UnitType{
    shareet,
    elba,
    capsole,
    cartoon,
    unit
}
export interface I_Drug_DataModel{
    id:string,
    name:string
    type:string
    quantity:number
    price:number
    consumeType:E_LzDrg_ConsumeType
    discount:number
    valideDate:string
    priceType:E_LzDrg_PriceType
    unitType:E_LzDrg_UnitType
    desc:string
    requestCount:number
}