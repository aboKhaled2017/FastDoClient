import { makeStyles, TableCell, IconButton, TableRow, Collapse, Box, Typography, Theme, createStyles, Badge, Divider, Dialog, Backdrop, Button, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import React, { ReactElement } from "react";
import StyledTableRow from "./StyledTableRow";
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { connect } from "react-redux";
import {Set_Loading_Stock_Data,Stop_Loading_Stock_Data,GetMyStockProdsData_Page} from '../../../../../Redux/Actions/StockDataActions'
import theme from "../../../../../Utils/theme";
import axios from 'axios';
import Alert from "@material-ui/lab/Alert";
import { I_StockProd_DataModel } from "../../../../../Interfaces/DataStoreTypes";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/EditRounded'
import { IStockUser } from "@/Interfaces/AccountTypes";
import store from "@/Redux/store";

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
  discountColumn:{
    width:'100%',
    margin:'2px auto',
       '& span':{
        padding:' 2px 7px',
        width: '40%',
        display: 'inline-block',
        borderRadius:12
       },
       '& span:first-of-type':{
        background:' #ff9800',
        
       },
       '& span:nth-of-type(3)':{
        background:theme.palette.primary.main,
        color:'#fff'
       },
       '& span:nth-of-type(2)':{
        width:0,
       },

  }
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
  handleDelete:(e:any)=>void
  setSelectedRow: React.Dispatch<React.SetStateAction<I_StockProd_DataModel>>
}
type discountPerClass={Item1:string,Item2:number}[];
function CustomizedTableRow(props:IProps) {
    const classes = useRowStyles();
    const { row,handleDelete,setSelectedRow}=props;
    //const initOpen=row.name=="antinal"?true:false;
    const [open, setOpen] = React.useState(false);
    const discounts=JSON.parse(row.discount) as discountPerClass;
    const StockClasses=(store.getState().user.userIdentity.user as IStockUser).pharmasClasses;
    const GetStockClassName=(id:string)=>{
      return StockClasses.find(el=>el.id==id)?.name??"غير معروف";
    }
    return (
      <React.Fragment>
           <StyledTableRow className={classes.root}>
          <TableCell align="center" component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">{row.price}</TableCell>
          <TableCell align="center">
          {discounts.map((d,i)=>(<Box key={i}>
                
                <div className={classes.discountColumn}>
                  <span>{`خصم ${d.Item2} %`}</span>
                  <span>
                  <Divider variant="middle" orientation="vertical"/>
                  </span>
                  <span>{`تصنيف: ${GetStockClassName(d.Item1)}`}</span>
                </div>
          </Box>))}
          </TableCell>
          <TableCell align="center">
             <div>
             <IconButton  title="حذف المنتج" onClick={
               (e:any)=>{
                 setSelectedRow(row);
                 handleDelete(e);
               }
             }>
              <DeleteForeverRoundedIcon color="secondary"/>
             </IconButton>
             </div>
          </TableCell>
        </StyledTableRow>
           <DataCollapsedRow row={row} open={open}/>
        </React.Fragment>
    );
}

export default connect(null, {Set_Loading_Stock_Data,GetMyStockProdsData_Page,Stop_Loading_Stock_Data}
  )(CustomizedTableRow) as any as (props:{
    row:I_StockProd_DataModel,
    handleDelete:(e:any)=>void
    setSelectedRow: React.Dispatch<React.SetStateAction<I_StockProd_DataModel>>
  })=>ReactElement;