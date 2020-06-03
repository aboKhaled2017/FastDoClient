import { ILazDrugShowModel } from "./ModelsTypes";

export interface ISearchDataState{
    loading:boolean 
    searchDataTable:ILazDrugShowModel[] 
    fileteredSearchData:ILazDrugShowModel[] 
    selectedFilteredCities:{name:string}[],
    selectedFilteredDesticts:{name:string}[]
    
}