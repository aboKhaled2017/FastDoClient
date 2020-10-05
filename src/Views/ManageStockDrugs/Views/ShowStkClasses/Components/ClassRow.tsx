import { makeStyles, TableCell, IconButton, TableRow, Collapse, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Backdrop, Theme, createStyles} from "@material-ui/core";
import React, { ReactElement } from "react";

import EditIcon from '@material-ui/icons/EditRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import StyledTableRow from '../../../Components/StyleTableRow';
import { IPharmasStockClass } from "@/Interfaces/AccountTypes";
const useRowStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      }
    },
    collapseCell:{
      padding: 2,
    width: 50,
    textAlign: 'center'
    },
    iconButton:{
      '&.Mui-disabled':{
        pointerEvents:'auto !important',
        cursor:'not-allowed'
      }
    },
    disabledIcon:{
      opacity:.5
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
  },
}));

interface IProps{
  ClassModel:IPharmasStockClass
  OnDeletePharmaClass:(model:IPharmasStockClass)=>void
  OnRenamePharmaClass:(model:IPharmasStockClass)=>void
  ClassesCount:number
}
const ShowCount=(count:number)=>{
  return count>0?count :"لا يوجد";
}
export default (props:IProps)=>{

    const classes = useRowStyles();
    const {ClassModel,OnDeletePharmaClass,OnRenamePharmaClass,ClassesCount}=props;
    
    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <TableCell align="center" component="th" scope="row">
            {ClassModel.name}
          </TableCell>
          <TableCell align="center">{ShowCount(ClassModel.count)}</TableCell>
          <TableCell align="center">
             <div>
             <IconButton  title="اعادة تسمية التصنيف"  onClick={e=>OnRenamePharmaClass(ClassModel)}>
              <EditIcon color="primary"/>
              </IconButton>
             <IconButton disabled={ClassesCount==1}  
                         className={classes.iconButton}
                         title={ClassesCount==1?"لا يمكن حذف التصنيف الوحيد لديك":"حذف التصنيف"} 
                         onClick={e=>OnDeletePharmaClass(ClassModel)}>
               <DeleteForeverRoundedIcon 
                     className={ClassesCount==1?classes.disabledIcon:""} 
                     color="secondary"/>
             </IconButton>
             </div>
          </TableCell>
        </StyledTableRow>
        </React.Fragment>
    );
}
