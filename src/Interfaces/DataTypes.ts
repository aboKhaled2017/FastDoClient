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
export enum LazDrugUnitType{
    shareet,
    elba,
    capsole,
    unit,
    cartoon,
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
export const LazDrugPricesTypes=[
    {title:'سعر جديد',value:LazDrugPriceType.new},
    {title:'سعر قديم',value:LazDrugPriceType.old}
]
export enum LazDrugConsumeType{
    exchange,burning
}