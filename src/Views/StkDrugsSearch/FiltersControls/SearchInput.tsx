import React, { createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import {onSearchInputChange} from '../../../Redux/Actions/searchDataActions'
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 0',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontFamily:'arabic_font !important'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

interface IProps{
  onSearchInputChange:typeof onSearchInputChange
}
const SearchInputFilter=(props:IProps)=>{
  const classes = useStyles();
  const inpRef=createRef();
  const handleClearText=()=>{
      let el= (inpRef.current as HTMLInputElement);
      let lastValue = el.value;
      el.value="";
      var event=new Event('change',{ bubbles: true });
      let tracker = (el as any)._valueTracker;
      if (tracker) {
        tracker.setValue(lastValue);
      }
      (inpRef.current as HTMLInputElement).dispatchEvent(event)
  }
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="close" onClick={handleClearText}>
        <CloseIcon />
      </IconButton>
      <InputBase
        inputRef={inpRef}
        className={classes.input}
        placeholder="ابحث باسم الراكد"
        inputProps={{ 'aria-label': 'search' }}
        onChange={e=> props.onSearchInputChange(e.target.value.trim())}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
export default connect(null,{onSearchInputChange})(SearchInputFilter as any)