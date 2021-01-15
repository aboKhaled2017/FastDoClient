import React from 'react'
import { connect } from 'react-redux'
import { ISearchDataState } from '@/Interfaces/States'
import { Box, makeStyles, Theme, Typography, Chip } from '@material-ui/core'
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import {OnDateFilterChange} from '@Redux/Actions/searchDataActions'
import CloseIcon from '@material-ui/icons/Close';
import { IDateFilter } from '@/Interfaces/ModelsTypes';
import { DateFilterChangeType } from '@/Interfaces/DataTypes';
import { displayDrugValidDateAs_MMYYYY_Formate } from '@/Commons/Services';
const useStyles = makeStyles((theme) => ({
    root:{
        border:`2px solid ${theme.palette.primary.main}`,
        padding:theme.spacing(1,2)
    },
    container:{
        
    },
    textField: {
        background:'#fff !important'
    },
    divider:{
        margin:theme.spacing(2,5)
    },
    chip:{
        margin:"0 1px",
        background:'#fff',
        color:theme.palette.primary.main,
        opacity:.8,
        border:'1px solid #e0e0e0'
    }
}));


interface IDateFieldProps extends OutlinedTextFieldProps{
   onDateChange:(date:Date|null)=>void
}
const DateField=(props:IDateFieldProps)=>{
    const handleChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      let val=e.target.value.trim();
      let date=val?new Date(new Date(val).setDate(1)):null;
      props.onDateChange(date);
    }
    return (
        <TextField 
          onChange={handleChange}         
          {...props}/>
    )
}
interface IProps {
    OnDateFilterChange:typeof OnDateFilterChange
    dateFilter:IDateFilter
}
const DateFilter=(props:IProps)=>{
    const classes=useStyles();
    const {dateFilter,OnDateFilterChange}=props;
    const handleBeforeDateChange = (date:Date|null) => {
    OnDateFilterChange({
        before:date,
        after:dateFilter.after
    },DateFilterChangeType.Before);
    };
    const handleOnBeforeDateDelete = () => {
        OnDateFilterChange({
            before:null,
            after:dateFilter.after
        },DateFilterChangeType.Before);
    };
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle1" color="primary">حدد البحث بتاريخ صلاحية الراكد</Typography>
            <Box mt={1.5}>
              {dateFilter.before && 
               <Chip
                    label={`صالح قبل ${displayDrugValidDateAs_MMYYYY_Formate(dateFilter.before)}`}
                    onDelete={handleOnBeforeDateDelete}
                    deleteIcon={<CloseIcon />}
                    className={classes.chip}
                    variant="default"
               />
              }
            </Box>
            <Box className={classes.container} mt={2}>
                <DateField
                    id="beforeSpecifiedDate"
                    label="قبل تاريخ"
                    variant="outlined"
                    type="date"
                    className={classes.textField}
                    fullWidth                   
                    onDateChange={handleBeforeDateChange}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
          </Box>
        </Box>
    )
}

const mapStateToProps = (state:{searchData:ISearchDataState}) => ({
    dateFilter:state.searchData.dateFilter
})

const mapDispatchToProps = {
    OnDateFilterChange
}

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter as any)
