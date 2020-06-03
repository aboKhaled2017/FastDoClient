import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ISearchDataState } from '../../../Interfaces/States'
import { Box, makeStyles, Theme } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    } from '@material-ui/pickers';
const useStyles=makeStyles((theme:Theme)=>({
    root:{

    }
}))
interface IProps {
    
}

const DateFilter=(props:IProps)=>{
    const classes=useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date:Date) => {
    setSelectedDate(date);
    };
    return (
        <Box className={classes.root}>
          <MuiPickersUtilsProvider utils={{}}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
            'aria-label': 'change date',
            }}
            />
            </MuiPickersUtilsProvider>
        </Box>
    )
}

const mapStateToProps = (state:{searchData:ISearchDataState}) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter)
