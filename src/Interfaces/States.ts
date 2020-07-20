import { ILazDrugShowModel, IDateFilter, IArea } from "./ModelsTypes";
import { IUserIdentity, I_UI_Errors, IPh_Signup_Step1, IPh_Signup_Step2, IPh_Signup_Step3, IPh_Signup_Step4, IStk_Signup_Step1, IStk_Signup_Step2, IStk_Signup_Step3, IStk_Signup_Step4, E_UserType } from "./AccountTypes";
import { I_Drug_DataModel } from "./DrugsTypes";

export interface ISearchDataState{
    loading:boolean 
    searchDataTable:ILazDrugShowModel[] 
    fileteredSearchData:ILazDrugShowModel[] 
    selectedFilteredCities:{name:string}[],
    selectedFilteredDesticts:{name:string}[]
    dateFilter:IDateFilter
}
export interface IUserState{
    authenticated:boolean 
    loading:boolean 
    userIdentity:IUserIdentity
   
}
export interface IDataState{
loading:boolean
areas:{
    cities:IArea[]
    destricts:IArea[]
},
myDrugs:I_Drug_DataModel[]
}
export interface I_DataOf_Signup_Ph_Steps{
   step1:IPh_Signup_Step1
   step2:IPh_Signup_Step2
   step3:IPh_Signup_Step3
   step4:IPh_Signup_Step4
}
export interface I_DataOf_Signup_Stk_Steps{
    step1:IStk_Signup_Step1
    step2:IStk_Signup_Step2
    step3:IStk_Signup_Step3
    step4:IStk_Signup_Step4
 }
export interface I_SignUp_Stepper{
    currentStep:number 
    isValid:boolean
    ph_DataOfSteps:I_DataOf_Signup_Ph_Steps
    stk_DataOfSteps:I_DataOf_Signup_Stk_Steps
    selectedCity:number
}
export interface I_UI_State{
    loading:boolean 
    errors:I_UI_Errors
    signUp_Stepper:I_SignUp_Stepper
}