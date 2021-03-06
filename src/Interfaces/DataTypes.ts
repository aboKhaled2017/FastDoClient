export const LazDrugTypes=[
    {title:"اقراص",value: "اقراص"},
    {title:"شراب",value:"شراب"},
    {title:"حقن",value:"حقن"},
    {title:"نقط",value:"نقط",},
    {title:"قطرة",value:"قطرة",},
    {title:"بخاخ",value:"بخاخ",},
    {title:"دهان",value:"دهان",},
    {title:"كبسول",value:"كبسول",},
    {title:"كريم",value:"كريم",},
    {title:"بودرة",value:"بودرة",},
    {title:"فوار",value:"فوار",},
    {title:"مسلتزمات تغذية",value:"مسلتزمات تغذية",},
    {title:"مسلتزمات شعر",value:"مسلتزمات شعر",},
    {title:"مسلتزمات تزيين",value:"مسلتزمات تزيين",}
]
export const DrugPagesValuesTypes=[
   100,
   125,
   250,
   500,
   750,
   1000,
   1250,
   1500,
   1750,
   2000
]
export enum LazDrugUnitType{
    shareet,
    elba,
    capsole,
    cartoon,
    unit
}
export const LazDrugsUnitTypes=[
    {title:"شريط",value:LazDrugUnitType.shareet},
    {title:"علبة",value:LazDrugUnitType.elba},
    {title:"كرتونة",value:LazDrugUnitType.cartoon},
    {title:"كبسولة",value:LazDrugUnitType.capsole},
    {title:"وحدة/صنف ",value:LazDrugUnitType.unit},
]
export enum LazDrugPriceType{
    new,old
}

export enum LazDrugConsumeType{
    exchange,burning
}
export enum  RegImageType{
license,commercialReg
}

export enum IDrugPagesValues{
 P100=100,
 P125=125,
 P250=250,
 P500=500,
 P750=750,
 P1000=1000,
 P1250=1250,
 P1500=1500,
 P1750=1750,
 P2000=2000
}
export enum DateFilterChangeType{
    Before,
    After
}
export const LazDrugPricesTypes=[
    {title:'سعر جديد',value:LazDrugPriceType.new},
    {title:'سعر قديم',value:LazDrugPriceType.old}
]
export const LazDrugConsumeTypes=[
    {title:'استبدالجمهور مع جمهور',value:LazDrugConsumeType.exchange},
    {title:'حرق/بيع بدون استبدال',value:LazDrugConsumeType.burning}
]
export interface IDrugPackageItem{
    id:string 
    name:string 
    quantity:number 
    price:number
}
export interface IDrugPackage{
    name:string
    value:IDrugPagesValues
    items:IDrugPackageItem[]
    totalPrice:number
    desc:string
    imgSrc:string
}
export interface IComponentHistory{
    push:(url:string)=>void
}
export interface IHistory{
  push(url: string): void;
  goBack():void;
}