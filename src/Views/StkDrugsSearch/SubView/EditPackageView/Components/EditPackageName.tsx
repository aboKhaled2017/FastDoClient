import { Box, Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    editNameBtn:{
        background:theme.palette.info.main,
        color:'#fff'
    }
}))

interface IEditPackageNameProps {
    val:string
    onSaveNameChange:(name:string)=>void
}

const EditPackageName: React.FC<IEditPackageNameProps> = props => {
  const {val,onSaveNameChange}=props;
  const classes=useStyles();
  const [name,setName]=React.useState(val);
  const onSaveEdit=()=>{
    if(name.trim()) onSaveNameChange(name.trim());
    setName(!name?val:name.trim());
  }
  const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value);
  }
  return (
    <Box aria-orientation="horizontal" display="flex">
        <Box>
           <TextField value={name}
                      onChange={onChange}
                      fullWidth
                       />
        </Box>
        <Box mx={1}>
          <Button variant="contained"
                  className={classes.editNameBtn}
                  onClick={onSaveEdit}
                  endIcon={<EditIcon/>}>
               تعديل
          </Button>
        </Box>
    </Box>
  );
};

export default EditPackageName;
