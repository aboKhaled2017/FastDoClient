import { makeStyles, TableCell, IconButton, TableRow, Collapse, Box, Typography, Theme, createStyles} from "@material-ui/core";
import React, { ReactElement } from "react";
import StyledTableRow from "./StyledTableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/EditRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { connect } from "react-redux";
import {Set_Loading_Stock_Data,Stop_Loading_Stock_Data,GetMyStockProdsData_Page} from '../../../../Redux/Actions/StockDataActions'
import theme from "../../../../Utils/theme";
import Alert from "@material-ui/lab/Alert";
import { I_StockProd_DataModel } from "../../../../Interfaces/DataStoreTypes";

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
  },
}));


function DataCollapsedRow(props: { row: I_StockProd_DataModel,open:boolean}){
    const { row ,open} = props;
    return <TableRow>
              <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                       details here
                      </Typography>

                    </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
}

interface IProps{
  row: I_StockProd_DataModel 
  Stop_Loading_Stock_Data:()=>void
  GetMyStockProdsData_Page:()=>void
  Set_Loading_Stock_Data:()=>void
}
function CustomizedTableRow(props:IProps) {
    const classes = useRowStyles();
    const {row,GetMyStockProdsData_Page,Set_Loading_Stock_Data,Stop_Loading_Stock_Data}=props;
    //const initOpen=row.name=="antinal"?true:false;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <TableCell className={classes.collapseCell}>
            <IconButton title="التفاصيل" aria-label="expand row" size="small" onClick={() => setOpen(false)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">{row.price}</TableCell>
          <TableCell align="center">{JSON.parse(row.discount)[0].item2}</TableCell>
        </StyledTableRow>
        <DataCollapsedRow row={row} open={open}/>
        </React.Fragment>
    );
}

export default connect(null, {Set_Loading_Stock_Data,GetMyStockProdsData_Page,Stop_Loading_Stock_Data}
  )(CustomizedTableRow) as any as (props:{row:I_StockProd_DataModel})=>ReactElement;