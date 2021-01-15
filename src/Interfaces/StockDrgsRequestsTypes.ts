
export interface IStkDrugsRequest_Pharma{
    id:string
    name:string
    address:string
    addressInDetails:string|null
    phoneNumber:string
    landLinePhone:string
}
export enum EStockDrugsPackgStatus{
    Pending,
    Accepted,
    Rejected,
    Completed,
    CanceledFromStk,
    CanceledFromPharma,
    AtNegotioation
}
export interface IStkDrugsRequest_Drug{
  id:string 
  name:string 
  quantity:number
}
export interface IStkDrugsRequest{
    packageId:string
    stkPackageId:string
    pharma:IStkDrugsRequest_Pharma,
    drugs:IStkDrugsRequest_Drug[]
    status:EStockDrugsPackgStatus
    createdAt:string
}
