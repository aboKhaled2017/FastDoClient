import { E_LzDrg_ConsumeType, E_LzDrg_PriceType, E_LzDrg_UnitType } from "../../Interfaces/DrugsTypes"

export interface IAddNewLzDrg{
    name:string
    type:string
    quantity:number
    price:number
    consumeType:E_LzDrg_ConsumeType
    discount:number
    valideDate:string,
    priceType:E_LzDrg_PriceType,
    unitType:E_LzDrg_UnitType,
    desc:string
}
export interface IUpdateLzDrg extends IAddNewLzDrg{
    id:string
    oldName:string
}
export interface IAddNewLzDrg_Errors{
    Name?:string[]
    Type?:string[]
    Quantity?:string[]
    Price?:string[]
    ConsumeType?:string[]
    Discount?:string[]
    ValideDate?:string[],
    PriceType?:string[],
    UnitType?:string[],
    Desc?:string[],
    G?:string
}
export const LzDrg_PricesList=[
    {title:'سعر جديد',value:E_LzDrg_PriceType.newP},
    {title:'سعر قديم',value:E_LzDrg_PriceType.oldP}
]
export const LzDrg_ConsumeTypes=[
    {title:'استبدالجمهور مع جمهور',value:E_LzDrg_ConsumeType.exchanging},
    {title:'حرق/بيع بدون استبدال',value:E_LzDrg_ConsumeType.burning}
]
export const LzDrg_UnitTypesList=[
    {title:"شريط",value:E_LzDrg_UnitType.shareet},
    {title:"علبة",value:E_LzDrg_UnitType.elba},
    {title:"كرتونة",value:E_LzDrg_UnitType.cartoon},
    {title:"كبسولة",value:E_LzDrg_UnitType.capsole},
    {title:"وحدة/صنف أخر",value:E_LzDrg_UnitType.unit},
]
export const LzDrg_TypesList=[
    {title:"لاشىء من هذا",value:"0"},
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
    {title:"مسلتزمات تزيين",value:"مسلتزمات تزيين"},
]
