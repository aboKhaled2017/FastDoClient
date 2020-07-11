import React, { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles, Button, Typography } from '@material-ui/core';

import { getCitisNamesList, getDestrictsNamesListOfCity, getCityDataList } from '../TableData';
import { FilterOptionsState, AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab/useAutocomplete';
import { OnAutoCompleteSelectChange } from '../../../Interfaces/UIsTypes';

import {OnCityFilterChange,OnDestrictsFilterChange} from '../../../Redux/Actions/searchDataActions'
import { connect } from 'react-redux';
import { ISearchDataState } from '../../../Interfaces/States';
import DestrictSelectFilter from './DestrictSelectFilter';
const useStyles = makeStyles((theme) => ({
    root:{
        width:'100% !important'
    },
    textField: {
      background:'#fff',
      fontFamily:' arabic_font !important'
    },
}));
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IAddressFilterProps{
  OnCityFilterChange:typeof OnCityFilterChange
}
const AddressFilter=(props:IAddressFilterProps)=> {
  const classes=useStyles();
  const {OnCityFilterChange}=props;
  const citiesNamesList=getCitisNamesList();
  return (
    <Fragment>
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      className={classes.root}
      options={citiesNamesList}
      disableCloseOnSelect
      onChange={(e,citiesValue,r,d)=>{
        OnCityFilterChange(citiesValue)
      }}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions={false}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginLeft: 8 }}
            checked={selected}
          />
          {option.name}
        </React.Fragment>
      )}
      style={{ width: 500,marginBottom:10 }}
      renderInput={(params) => (
        <TextField {...params} 
                   variant="outlined" 
                   label="ابحث فى محافظة معينة" 
                   className={classes.textField}
                   placeholder="المحافظة" />
      )}
    />
    <DestrictSelectFilter/>
    </Fragment>
  );
}
export default connect(null, {OnCityFilterChange})(AddressFilter as any)