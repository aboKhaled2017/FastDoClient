import { makeStyles, TableCell, TableRow, Collapse, Box, Typography, Theme, createStyles, Badge, Divider, Dialog, Backdrop, Button, DialogActions, DialogContent, DialogContentText, IconButton, Chip} from "@material-ui/core";
import React, { Fragment } from "react";
import StyledTableRow from "../../Components/Tables/StyledTableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ISearchStkDrugData } from '../../../Interfaces';
import InnerStkDrugTable from "./InnerStkDrugTable";
import { IStockGData } from "@/Interfaces/ModelsTypes";

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

const DataCollapsedRow:
React.FC<{drugData:ISearchStkDrugData,open:boolean}>=props=>{
    const { drugData ,open} = props;
    return <TableRow>
              <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                      <Box>
                         <InnerStkDrugTable rowData={drugData}/>
                      </Box>
                      </Typography>
                    </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
}

interface IRowViewProps{
  row: ISearchStkDrugData  
  isStockSelcted:boolean
  setSelectedRow?: React.Dispatch<React.SetStateAction<ISearchStkDrugData>>
  onSelectStockName:(s:IStockGData)=>void
}

const GetStockCount_Chip=(props:{count:Number})=>{
  return (
    <Fragment>
      <Chip style={{marginLeft:2}} label={props.count} color="primary"/>
      <span style={{marginLeft:5}}>من المخازن</span>    
    </Fragment>
  )
}

const RowView:React.FC<IRowViewProps>=props=>{
    const classes = useStyles();
    const { row,isStockSelcted,onSelectStockName}=props;
    let hieghestDiscount=Math.max(...row.stocks.map(r=>r.discount));
    let stockWithHeighestDisc=row.stocks.find(s=>s.discount==hieghestDiscount)||row.stocks[0];
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
                      onClick={()=>{onSelectStockName({id:stockWithHeighestDisc.stockId,name:stockWithHeighestDisc.stockName})}}
                      variant="outlined">
                {`مخزن ${stockWithHeighestDisc.stockName}`}
              </Button>
            </TableCell>
          </Fragment>
          }
          
        </StyledTableRow>
           <DataCollapsedRow drugData={row} open={open}/>
        </React.Fragment>
    );
}

export default RowView;