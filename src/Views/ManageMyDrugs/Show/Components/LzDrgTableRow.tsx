import { makeStyles, TableCell, IconButton, TableRow, Collapse, Box, Typography} from "@material-ui/core";
import { ILazDrugModel } from "../../../../Interfaces/ModelsTypes";
import React from "react";
import StyledTableRow from "./StyledTableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/EditRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import DrgTabs from './../Tabs';
const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      }
    },
    collapseCell:{
      padding: 2,
    width: 50,
    textAlign: 'center'
    }
});


function LzDrgCollapsedRow(props: { row: ILazDrugModel,open:boolean}){
    const { row ,open} = props;
    return <TableRow>
              <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        كل ما يتعلق بالراكد
                      </Typography>
                      <DrgTabs model={row}/>
                    </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
}
function LzDrugTableRow(props: { row: ILazDrugModel }) {
    const classes = useRowStyles();
    const {row}=props;
    //const initOpen=row.name=="antinal"?true:false;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <TableCell className={classes.collapseCell}>
            <IconButton title="التفاصيل" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">{row.type}</TableCell>
          <TableCell align="center">{row.price}</TableCell>
          <TableCell align="center">{row.quantity}</TableCell>
          <TableCell align="center">
             <div>
             <IconButton  title="تعديل بيانات الراكد">
              <EditIcon color="primary"/>
             </IconButton>
             <IconButton  title="حذف الراكد">
              <DeleteForeverRoundedIcon color="secondary"/>
             </IconButton>
             </div>
          </TableCell>
        </StyledTableRow>
        <LzDrgCollapsedRow row={row} open={open}/>
        </React.Fragment>
    );
}

export default LzDrugTableRow;