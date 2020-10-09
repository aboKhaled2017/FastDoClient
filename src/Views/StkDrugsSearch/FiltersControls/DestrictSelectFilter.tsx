import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles, Typography, Chip } from '@material-ui/core';


import {OnDestrictsFilterChange} from '@Redux/Actions/searchDataActions'
import { connect } from 'react-redux';
import { ISearchDataState, IDataState } from '@/Interfaces/States';
import { IArea } from '@/Interfaces/ModelsTypes';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const useStyles = makeStyles((theme) => ({
    root:{
        width:'100% !important'
    },
    textField: {
      background:'#fff !important',
      fontFamily:' arabic_font !important'
    },
}));
interface IDestrictsSelectFilterProps{
    selectedCities:{id: number;}[]
    loadingAreas:boolean
    cities:IArea[]
    destricts:IArea[]
    OnDestrictsFilterChange:typeof OnDestrictsFilterChange
}
interface IOption{
    name:string 
    isOption:boolean
}

const Filter=(props:IDestrictsSelectFilterProps)=> {
    const classes=useStyles();
    let {OnDestrictsFilterChange,cities,destricts,loadingAreas,selectedCities}=props;

    const seletcDestrictsList=selectedCities.length==0
    ?cities.reduce((prev,city,i)=>{
        return prev.concat([{id:0,name:city.name,isOption:false}])
        .concat(destricts.filter(d=>d.superAreaId==city.id).map(d=>({id:d.id,name:d.name,isOption:true})))
    },[] as {id:number,name:string,isOption:boolean}[])
    :selectedCities.reduce((prev,city,i)=>{
        let cityName=cities.find(c=>c.id==city.id)?.name??"";
        return prev.concat([{id:0,name:cityName,isOption:false}])
        .concat(destricts.filter(d=>d.superAreaId==city.id).map(d=>({id:d.id,name:d.name,isOption:true})))
    },[] as {id:number,name:string,isOption:boolean}[]);

    return (
        <Autocomplete
            multiple     
            clearOnEscape={true}
            id="selectDestrictFilter"
            className={classes.root}
            options={seletcDestrictsList}
            disableCloseOnSelect
            onChange={(e,destValues,r,d)=>{
                OnDestrictsFilterChange(destValues.filter(v=>v.id!==0).map(v=>({id:v.id})))
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            renderTags={(values: IOption[], getTagProps) =>
                {
                   // if(IsContains(seletcDestrictsList,values))
                    return values.map((option: IOption, index: number) => (
                        <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
                    ))
                   // else return null
                }
            }
            freeSolo={true}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions={false}      
            /*filterOptions={(options: { name: string;isOption:boolean}[], state: FilterOptionsState<{ name: string;isOption:boolean }>)=>{
                return options.filter(o=>!seletcDestrictsList.some(c=>c.name===o.name))
            }}*/
            renderOption={(option, { selected }) => (
                option.isOption?
                <React.Fragment>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginLeft: 8 }}
                    checked={selected}
                />
                    {option.name}
                </React.Fragment>
                :<Typography variant="h6" color="primary">{option.name}</Typography>
            )}
            getOptionDisabled={(option)=>!option.isOption}
            noOptionsText="لا يوجد نتيجة مطابقة للبحث"
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} 
                            variant="outlined"  
                            label="ابحث فى مركز داخل المحافظة" 
                            className={classes.textField}
                            placeholder="مركز" />
            )}
        />
    );
}
const mapStateToProps=(state:{data:IDataState,searchData:ISearchDataState})=>{
    var cityIdsStr=state.searchData.filtering.CityIds;
    var selectedCities=(!cityIdsStr)?[]:cityIdsStr.split(',').map(id=>({id:parseInt(id)}))
    return {
        selectedCities:selectedCities,
        loadingAreas:state.data.loading,
        cities:state.data.areas.cities,
        destricts:state.data.areas.destricts
    }
}
export default connect(mapStateToProps,{OnDestrictsFilterChange})(Filter as any);