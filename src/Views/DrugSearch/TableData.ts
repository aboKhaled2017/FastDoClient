import { LazDrugConsumeType } from "../../Interfaces/DataTypes"
import { ILazDrugShowModel } from "../../Interfaces/ModelsTypes"
const dataRecords=[
    {
      id:'Aaaa-bbbb-ff', name: 'profeen',
      type: 'أقراص', quantity: 63,
      price:20,
      consumeType:LazDrugConsumeType.burning,
      discount:10,
      validDate:new Date(),
      priceType:1,
      unitType:0,
      address:'سوهاج/دار السلام',
      pharmacyName:'د احمد مجدى',
      desc:'حقن انتينال 500 تاريخ جديد ,المنتج متوفر الى يوم الثلاثاء القادم'
    },
    {
        id:'Aaaa-vv-ff', name: 'profeen500',
        type: 'أقراص', quantity: 5,
        price:15,
        consumeType:LazDrugConsumeType.burning,
        discount:25,
        validDate:new Date(2020,8,5),
        priceType:0,
        unitType:0,
        address:'سوهاج/ اخميم',
        pharmacyName:'د حلمى محمد',
        desc:'حقن بروفيين 500 تاريخ قديم ,المنتج متوفر الى يوم الثلاثاء القادم , بخصم 25%'
      },
      {
        id:'Aaaa-dfdf-ff', name: 'fruit',
        type: 'فوار', quantity: 5,
        price:6,
        consumeType:LazDrugConsumeType.burning,
        discount:17,
        validDate:new Date(2020,8,5),
        priceType:1,
        unitType:0,
        address:'سوهاج/ اخميم',
        pharmacyName:'د حلمى محمد',
        desc:'فوار فروت تاريخ جديد ,المنتج متوفر الى يوم الاربعاء القادم , بخصم 17%'
      },
      {
        id:'Dsss-bbbb-ff', name: 'tromiseen',
        type: 'دهان', quantity: 20,
        price:15,
        consumeType:LazDrugConsumeType.burning,
        discount:8,
        validDate:new Date(),
        priceType:1,
        unitType:0,
        address:'اسيوط/ البدارى',
        pharmacyName:'د عبدالحليم احمد',
        desc:'دهان تروميسين تاريخ قديم ,المنتج متوفر لدينا, بخصم 8%'
      },
      {
          id:'kkk-vv-ff', name: 'antinal',
          type: 'أقراص', quantity: 5,
          price:7,
          consumeType:LazDrugConsumeType.burning,
          discount:18,
          validDate:new Date(2020,12,5),
          priceType:1,
          unitType:0,
          address:'سوهاج/ اخميم',
          pharmacyName:'د حلمى محمد',
          desc:'اقراص انتينال  تاريخ قديم ,المنتج متوفر الى يوم الثلاثاء القادم , بخصم 18%'
        },
        {
          id:'HGHG-dfdf-ff', name: 'rany',
          type: 'فوار', quantity: 51,
          price:12,
          consumeType:LazDrugConsumeType.burning,
          discount:25,
          validDate:new Date(2021,8,5),
          priceType:0,
          unitType:0,
          address:'المنيا/ اخميم',
          pharmacyName:'د وحيد عصمت محمد',
          desc:'فوار رانى تاريخ جديد ,المنتج متوفر الى يوم السبت القادم , بخصم 25%'
        },

        {
            id:'Aaaa-bbbb-kkkp', name: 'concer5plus',
            type: 'أقراص', quantity: 45,
            price:20,
            consumeType:LazDrugConsumeType.burning,
            discount:10,
            validDate:new Date(),
            priceType:1,
            unitType:0,
            address:'سوهاج/ جرجا',
            pharmacyName:'د احمد عبدالوهاب',
            desc:'اقراص كونكار 5 بلس 500 تاريخ جديد ,المنتج متوفر الى يوم الثلاثاء القادم,خصم 10%'
          },
          {
              id:'Aaaa-vv-ff', name: 'profeen500',
              type: 'أقراص', quantity: 5,
              price:15,
              consumeType:LazDrugConsumeType.burning,
              discount:25,
              validDate:new Date(2020,8,5),
              priceType:0,
              unitType:0,
              address:'سوهاج/ ساقلتة',
              pharmacyName:'د اسلام مغاورى',
              desc:'حقن بروفيين 500 تاريخ قديم ,المنتج متوفر الى يوم الثلاثاء القادم , بخصم 15%'
            },
            {
              id:'Aaaa-ppopo-ff', name: 'catafast',
              type: 'اقراص', quantity: 5,
              price:77,
              consumeType:LazDrugConsumeType.burning,
              discount:17,
              validDate:new Date(2020,8,5),
              priceType:1,
              unitType:0,
              address:'سوهاج/ اخميم',
              pharmacyName:'د حلمى محمد',
              desc:'اقراص كاتافست مسكن للالام تاريخ جديد , بخصم 17%'
            },
            {
              id:'Dsss-cotofeen-ff', name: 'cotofeen',
              type: 'حقن', quantity: 20,
              price:15,
              consumeType:LazDrugConsumeType.burning,
              discount:8,
              validDate:new Date(),
              priceType:1,
              unitType:0,
              address:'اسيوط/ البدارى',
              pharmacyName:'د عبدالحليم احمد',
              desc:'حقن كتوفيين تاريخ قديم ,المنتج متوفر لدينا, بخصم 8%'
            },
            {
                id:'zxzx-vv-ff', name: 'congistal',
                type: 'شراب', quantity: 120,
                price:10.5,
                consumeType:LazDrugConsumeType.burning,
                discount:18,
                validDate:new Date(2020,12,5),
                priceType:1,
                unitType:0,
                address:'سوهاج/ اخميم',
                pharmacyName:'د حلمى محمد',
                desc:'شراب كونجستال  تاريخ قديم ,المنتج متوفر الى يوم الثلاثاء القادم , بخصم 18%'
              },
              {
                id:'camama-dfdf-ff', name: 'cammama',
                type: 'اكسسوارات', quantity: 51,
                price:12,
                consumeType:LazDrugConsumeType.burning,
                discount:25,
                validDate:new Date(2021,8,5),
                priceType:0,
                unitType:0,
                address:'المنيا/ اخميم',
                pharmacyName:'د وحيد عصمت محمد',
                desc:'كمامات مزودة بفلتر  عدد 51 قطعة , بخصم 25%'
              },
] as ILazDrugShowModel[]

export const getCityDataList=()=>{
  let data:{name:string,destricts:{name:string}[]}[]=[];
   dataRecords.forEach(rec=>{
    let [cityName,destrictName]=rec.address.split('/');
    cityName=cityName.trim();
    destrictName=destrictName.trim();
    if(!data.some(r=>r.name===cityName)){
      data.push({name:cityName,destricts:[{name:destrictName}]})
    }
    else{
      let c=data.find(r=>r.name==cityName);
      let index=data.findIndex(d=>d.name===c?.name);
      if(!c?.destricts.some(d=>d.name===destrictName))
      {
        c?.destricts.push({name:destrictName});
        (data as any)[index]=c;
      }

    }
  })
  return data;
} 
export const getCitisNamesList=()=>{
  return getCityDataList().map(rec=>({name:rec.name}))
}
export const getDestrictsNamesListOfCity=(cName:string)=>{
  if(!cName.trim())
  return getCityDataList().reduce((prev,city,i)=>{
   return prev.concat(city.destricts)
  },[] as {name:string}[])
  return getCityDataList().find(c=>c.name===cName)?.destricts;
}
export default dataRecords