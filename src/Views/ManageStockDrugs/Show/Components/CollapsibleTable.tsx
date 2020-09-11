import { makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createStyles, Theme, Backdrop, CircularProgress, Box, Button } from "@material-ui/core";
import React from "react";
import DataRowTable from './DataRow'
import { connect } from "react-redux";
import { IStocksDataState } from "../../../../Interfaces/States";
import PaginationView from './PaginationView'
import UpdateStock from './UpdateStock'
import Alert from "@material-ui/lab/Alert";
import { I_StockProd_DataModel, I_StockProds_Pagination } from "../../../../Interfaces/DataStoreTypes";
const useStyles =  makeStyles((theme: Theme) =>
createStyles({
    root: {
      width: '100%',
      background:'transparent',
      boxShadow:'none'
    },
    container: {
      maxHeight: 880,
    },
    thead:{
      '& th':{
        background:'#008394',
        fontSize:20,
        color:'#fff',
        border: '2px solid rgba(206, 206, 206, 0.56)',
        textAlign: 'center'
      }
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    table:{
      background:'transparent'
    },
    tbody:{
      background:'#fff'
    }
}));
interface IProps{
  dataRows:I_StockProd_DataModel[]
  pagination:I_StockProds_Pagination
  loading:boolean
}
const CollapsibleTable=(props:IProps)=>{
    const classes=useStyles();
    const {loading}=props;
    return (
      <TableContainer component={Paper} className={classes.root}>
        <Backdrop className={classes.backdrop}
                  open={loading}>
              <Box mx={2}>
              <span>جارى تحميل البييانات</span>
              </Box>
              <CircularProgress color="inherit" />
        </Backdrop>
        <Box my={1} display="flex">
           <Box style={{width:'60%'}}>
              <PaginationView/>
           </Box>
           <Box>
            <UpdateStock/>
          </Box>
        </Box>
       
        <Box>
        <Table className={classes.table} aria-label="collapsible table">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell colSpan={2}>الاسم</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>الخصم</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {props.dataRows.length==0 && 
            <TableRow>
               <TableCell colSpan={4}>
                <Alert severity="warning">
                  لايوجد بيانات للعرض
                </Alert>
               </TableCell>
            </TableRow>
            }
            {props.dataRows.map((row:I_StockProd_DataModel)=> (
              <DataRowTable key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
        </Box>
      </TableContainer>
    );
}

export default connect((state:{stockData:IStocksDataState})=>({
  loading:state.stockData.loading,
  dataRows:state.stockData.DataStore.rows,
  pagination:state.stockData.DataStore.pagination
}),{})(CollapsibleTable)