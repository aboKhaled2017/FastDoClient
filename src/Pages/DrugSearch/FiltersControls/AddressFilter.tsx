import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getCitisNamesList } from '../TableData';

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

export default (props:{handleSelectChange:(event: object, value:{name:string}[]|null, reason: string)=>void})=> {
  const classes=useStyles();
  const citiesNamesList=getCitisNamesList();
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      className={classes.root}
      options={citiesNamesList}
      disableCloseOnSelect
      onChange={props.handleSelectChange as any}
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} 
                   variant="outlined" 
                   label="ابحث فى محافظة معينة" 
                   className={classes.textField}
                   placeholder="المحافظة" />
      )}
    />
  );
}

const useStylesForGroupedSelect = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

function GroupedSelect() {
    const classes = useStylesForGroupedSelect();
  
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
          <Select defaultValue="" id="grouped-select">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <ListSubheader>Category 1</ListSubheader>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <ListSubheader>Category 2</ListSubheader>
            <MenuItem value={3}>Option 3</MenuItem>
            <MenuItem value={4}>Option 4</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }