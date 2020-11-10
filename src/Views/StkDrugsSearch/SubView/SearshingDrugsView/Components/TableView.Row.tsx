import { makeStyles, TableCell, Theme, createStyles, Button, IconButton, Chip} from "@material-ui/core";
import React, { Fragment, useContext } from "react";
import StyledTableRow from "../../Components/Tables/StyledTableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ISearchStkDrugData } from '../../../Interfaces';
import TableView_Row_Collapsed from './TableView.Row.Collapsed';

import context from "../SearchDrugsContext";

const useStyles = makeStyles((theme: Theme) =>createStyles({
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


interface IRowViewProps{
  row: ISearchStkDrugData 
}

const GetStockCount_Chip=(props:{count:Number})=>{
  return (
    <Fragment>
      <Chip style={{marginLeft:2}} label={props.count} color="primary"/>
      <span style={{marginLeft:5}}>من المخازن</span>    
    </Fragment>
  )
}

const TableView_TableRow:React.FC<IRowViewProps>=props=>{
    const classes = useStyles();
    const { row}=props;
    const {onSelectedStock,selectedStock}=useContext(context);
    const isStockSelcted=(selectedStock && selectedStock.id)?true:false;
    let hieghestDiscount=Math.max(...row.stocks.map(r=>r.discount));
    let stockWithHeighestDisc=row.stocks.find(s=>s.discount==hieghestDiscount)||row.stocks[0];
   
    const [open, setOpen] = React.useState(false);   
    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <TableCell className={classes.collapseCell}>
              <IconButton title="التفاصيل" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
          </TableCell>
          <TableCell className="notArabicFont" align="center" 
                     colSpan={isStockSelcted?3:1}
                     component="th" scope="row">
            {row.name}
          </TableCell>
          {!isStockSelcted &&
          <Fragment>
            <TableCell align="center">
              <GetStockCount_Chip count={row.stockCount}/>
            </TableCell>
            <TableCell align="center">
              <Chip color="secondary" label={hieghestDiscount +" %"}/>
              <Button  color="primary" 
                      style={{marginRight:3}}
                      onClick={()=>{onSelectedStock({id:stockWithHeighestDisc.stockId,name:stockWithHeighestDisc.stockName})}}
                      variant="outlined">
                {`مخزن ${stockWithHeighestDisc.stockName}`}
              </Button>
            </TableCell>
          </Fragment>
          }
          
        </StyledTableRow>
           <TableView_Row_Collapsed drugData={row} open={open}/>
        </React.Fragment>
    );
}

export default TableView_TableRow;