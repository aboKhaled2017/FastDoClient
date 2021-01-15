import React, { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles, Button, Typography } from '@material-ui/core';

import {OnCityFilterChange,OnDestrictsFilterChange} from '@Redux/Actions/searchDataActions'
import { connect } from 'react-redux';
import { ISearchDataState, IDataState } from '@/Interfaces/States';
import DestrictSelectFilter from './DestrictSelectFilter';
import { IArea } from '@/Interfaces/ModelsTypes';
const useStyles = makeStyles((theme) => ({
    root:{
        width:'100% !important'
    },
    textField: {
      background:'#fff !important',
      fontFamily:' arabic_font !important'
    },
}));
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IAddressFilterProps{
  selectedCities:{id: number;}[]
  loadingAreas:boolean
  cities:IArea[]
  OnCityFilterChange:typeof OnCityFilterChange
}
const AddressFilter=(props:IAddressFilterProps)=> {
  const classes=useStyles();
  const {OnCityFilterChange,selectedCities,loadingAreas,cities}=props;
  return (
    <Fragment>
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      className={classes.root}
      clearOnEscape={true}
      options={cities.map(c=>({id:c.id,name:c.name}))}
      disableCloseOnSelect
      onChange={(e,values,r,d)=>{
        OnCityFilterChange(values.map(v=>({id:v.id})))
      }}
      getOptionSelected={(option, value) => option.name === value.name}
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
      //loading={true}
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
const mapStateToProps=(state:{data:IDataState,searchData:ISearchDataState})=>{
  var cityIdsStr=state.searchData.filtering.CityIds;
  var selectedCities=(!cityIdsStr)?[]:cityIdsStr.split(',').map(id=>({id:parseInt(id)}))
  return {
      selectedCities:selectedCities,
      loadingAreas:state.data.loading,
      cities:state.data.areas.cities
  }
}
export default connect(mapStateToProps, {OnCityFilterChange})(AddressFilter as any)