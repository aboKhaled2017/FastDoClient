import { makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createStyles, Theme, Backdrop, CircularProgress, Box } from "@material-ui/core";
import React from "react";
import LzDrgTableRow from './LzDrgTableRow'
import { connect } from "react-redux";
import { IDataState } from "../../../../Interfaces/States";
import { I_Drug_DataModel, I_Drug_Pagination } from "../../../../Interfaces/DrugsTypes";
import PaginationView from './PaginationView'
import Alert from "@material-ui/lab/Alert";
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
  dataRows:I_Drug_DataModel[]
  pagination:I_Drug_Pagination
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
        <Box my={1}>
           <PaginationView/>
        </Box>
        <Box>
        <Table className={classes.table} aria-label="collapsible table">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell colSpan={2}>الاسم</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>الكمية</TableCell>
              <TableCell>التحكم</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {props.dataRows.length==0 && 
            <TableRow>
               <TableCell colSpan={6}>
                <Alert severity="warning">
                  لايوجد بيانات للعرض
                </Alert>
               </TableCell>
            </TableRow>
            }
            {props.dataRows.map((row:I_Drug_DataModel)=> (
              <LzDrgTableRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
        </Box>
      </TableContainer>
    );
}

export default connect((state:{data:IDataState})=>({
  loading:state.data.loading,
  dataRows:state.data.myDrugs.rows,
  pagination:state.data.myDrugs.pagination
}),{})(CollapsibleTable)