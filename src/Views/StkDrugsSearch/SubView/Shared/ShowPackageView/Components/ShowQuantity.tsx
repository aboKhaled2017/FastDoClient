import { makeStyles, Theme, createStyles, Box, IconButton, TextField } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import EditIcon from '@material-ui/icons/EditRounded'
import SaveBtn from '@material-ui/icons/CheckCircleRounded';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    EditIcon:{
        color:theme.palette.info.main,
        fontSize:15
    },
  }));
  

interface IShowQuantityProps {
    val:number 
    stockId:string 
    drugId:string
    SaveQuantityChange:(drugRowId:string,stockId:string,val:number)=>void
}

const ShowQuantity: React.FC<IShowQuantityProps> =props => {
    const classes=useStyles();
    const {val,SaveQuantityChange,stockId,drugId}=props;
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState(val);
    const onEdit=()=>{
        setOpen(true);
    }
    const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setValue(e.target.value as any);
    }
    const onSave=()=>{
        SaveQuantityChange(drugId,stockId,value);
        setValue((!value || isNaN(value))?val:value);
        setOpen(false);
    }
    return (
        <Box display="flex" aria-orientation="horizontal">
            {!open&&
            <Fragment>
               <Box alignSelf="center">
               {val}
               </Box>
               <Box>
                   <IconButton size="small" onClick={onEdit}>
                       <EditIcon  className={classes.EditIcon}/>
                   </IconButton>
               </Box>
            </Fragment>
            }
            {open&&
            <Box>
                <TextField value={value}
                           onChange={onChange}/>
                <IconButton size="small" onClick={onSave}>
                  <SaveBtn  color="primary"/>
                </IconButton>
            </Box>
            }
        </Box>
    )
};

export default ShowQuantity;
