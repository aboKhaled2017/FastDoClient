import React, { Fragment, useState, useRef } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { GetTagProps } from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles, Button, Typography, Chip } from '@material-ui/core';

import { getCitisNamesList, getDestrictsNamesListOfCity, getCityDataList } from '../TableData';
import useAutocomplete, { FilterOptionsState, AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab/useAutocomplete';
import { OnAutoCompleteSelectChange } from '../../../Interfaces/UIsTypes';

import {OnCityFilterChange,OnDestrictsFilterChange} from '../../../Redux/Actions/searchDataActions'
import { connect } from 'react-redux';
import { ISearchDataState } from '../../../Interfaces/States';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const useStyles = makeStyles((theme) => ({
    root:{
        width:'100% !important'
    },
    textField: {
      background:'#fff',
      fontFamily:' arabic_font !important'
    },
}));
interface IDestrictsSelectFilterProps{
    selectedCities:{name:string}[]
    OnDestrictsFilterChange:typeof OnDestrictsFilterChange
}
interface IOption{
    name:string 
    isOption:boolean
}

const IsContains=(largArr:Array<IOption>,arr:IOption[])=>{
    console.log('===================')
    console.log(largArr)
    console.log(arr)
    console.log(arr.every(el=>largArr.some(it=>it.name===el.name&&it.isOption===el.isOption)))
    console.log('===================')
        return (arr.every(el=>largArr.some(it=>it.name===el.name&&it.isOption===el.isOption)))
}
const Filter=(props:IDestrictsSelectFilterProps)=> {
    const classes=useStyles();
    
    let {OnDestrictsFilterChange,selectedCities}=props;
    if(selectedCities.length==0){
        selectedCities=getCitisNamesList();
    }
    const seletcDestrictsList=selectedCities.reduce((prev,city,i)=>{
        return prev.concat([{name:city.name,isOption:false}])
        .concat((getDestrictsNamesListOfCity(city.name) as {name:string}[])
        .map(des=>({name:des.name,isOption:true})))
    },[] as {name:string,isOption:boolean}[]);

    return (
        <Autocomplete
            multiple     
            clearOnEscape={true}
            id="selectDestrictFilter"
            className={classes.root}
            options={seletcDestrictsList}
            disableCloseOnSelect
            onChange={(e,destValues,r,d)=>{
                OnDestrictsFilterChange(destValues)
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
const mapStateToProps=(state:{searchData:ISearchDataState})=>({
    selectedCities:state.searchData.selectedFilteredCities
})
export default connect(mapStateToProps,{OnDestrictsFilterChange})(Filter as any);