import { makeStyles, TableContainer, Paper, Table, TableHead, TableRow,
   TableCell, TableBody, createStyles, Theme, Backdrop, CircularProgress,
    Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, withStyles } from "@material-ui/core";
import React from "react";
import DataRowTable from './DataRow'
import { connect } from "react-redux";
import PaginationView from './PaginationView'
import UpdateStock from './UpdateStock'
import Alert from "@material-ui/lab/Alert";
import RemoveIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import {Set_Loading_Stock_Data,Stop_Loading_Stock_Data,GetMyStockProdsData_Page} from '../../../../../Redux/Actions/StockDataActions'
import { I_StockProd_DataModel, I_StockProds_Pagination } from "../../../../../Interfaces/DataStoreTypes";
import { IStocksDataState } from "../../../../../Interfaces/States";
import {App_BackDrop } from "@Comps/Customs";
import store from "@/Redux/store";
import { IStockUser } from "@/Interfaces/AccountTypes";


const useStyles =  makeStyles((theme: Theme) =>
createStyles({
    root: {
      width: '100%',
      background:'transparent',
      boxShadow:'none',
      position:'relative'
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
  Stop_Loading_Stock_Data:()=>void
  GetMyStockProdsData_Page:()=>void
  Set_Loading_Stock_Data:()=>void
}
const CollapsibleTable=(props:IProps)=>{
    const classes=useStyles();   
    const {loading,GetMyStockProdsData_Page,Set_Loading_Stock_Data,Stop_Loading_Stock_Data}=props;
    const [openDeleteDialog,setOpenDeleteDialoge]=React.useState<{
      open:boolean,message:string|'',type:'All'|'One'
    }>({
      open:false,
      message:'',
      type:"One"
    });
    const [deleteDescision,setDeleteDescision]=React.useState({
      isAgreed:false,
      madeDescision:false
    });
    const [selectedRow,setSelectedRow]=React.useState<I_StockProd_DataModel>({} as I_StockProd_DataModel);
    const [openAlter,setOpenAlter]=React.useState(false);
    React.useEffect(()=>{
      if(deleteDescision.madeDescision&&deleteDescision.isAgreed){
        Set_Loading_Stock_Data();
        let url=selectedRow.id?`/stk/prods/${selectedRow.id}`:`/stk/prods`;
        axios.delete(url)
        .then(res=>{           
            setOpenAlter(true);
            setTimeout(() => {
              setOpenAlter(false);
              GetMyStockProdsData_Page();
            }, 3000);
        })
        .catch(err=>{
        if(err.status==404){
          alert('حدث خطأ اثناء المعالجة'); 
            return;
        }
        if(!err.response) 
        {
            alert("خطأ فى الاتصال بالسيرفر");
            return;
        }
        var errorsResult=err.response.data.errors;
        alert('حدث خطأ اثناء المعالجة'); 
       })
       .finally(()=>{
        Stop_Loading_Stock_Data();
        setSelectedRow({} as any);
       })
       }
    },[deleteDescision])
    const handleDelete=(e:any)=>{
      setOpenDeleteDialoge({open:true,type:'One',message:''});
    }
    const deleteAll=React.useCallback((e:any)=>{      
      setOpenDeleteDialoge({open:true,type:'All',message:'هل انت متأكد من حذف جميع المنتجات'});
    },[]);
    const FlyableComponents=React.forwardRef((props,ref)=>(
      <div>
          <Dialog
              open={openDeleteDialog.open}
              onClose={()=>{setOpenDeleteDialoge({open:false,type:'One',message:''})}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {openDeleteDialog.message.trim()?openDeleteDialog.message:`هل انت متأكد من حذف هذا المنتج`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>{
                  setDeleteDescision({
                    isAgreed:false,
                    madeDescision:true
                  })
                  setOpenDeleteDialoge({open:false,type:'One',message:''});}} color="primary">
                  لست متأكد
                </Button>
                <Button onClick={()=>{
                  setDeleteDescision({
                  isAgreed:true,
                  madeDescision:true
                });setOpenDeleteDialoge({open:false,type:'One',message:''});}} color="primary" autoFocus>
                  نعم متأكد
                </Button>
              </DialogActions>
          </Dialog>
           <Backdrop className={classes.backdrop}
                          open={openAlter} 
                          onClick={e=>{setOpenAlter(false)}}>
                    <Alert severity="success">
                        لقد تم الحذف بنجاح
                    </Alert>
          </Backdrop>
      </div>
    ))
    return (
      <TableContainer component={Paper} className={classes.root}>
        <FlyableComponents/>
        <App_BackDrop className={classes.backdrop}
                  open={loading}>
              <Box mx={2}>
              <span>جارى تحميل البييانات</span>
              </Box>
              <CircularProgress color="inherit" />
        </App_BackDrop>
        <Grid container>
           <Grid item sm={8}>
              <Box m={1}>
                  <PaginationView/>
              </Box>
           </Grid>
           <Grid item sm={4}>
              <Box m={1} display="flex">
                <UpdateStock/>
                <Box mx={.3}>
                  <Button variant="contained" 
                          startIcon={<RemoveIcon/>}
                          onClick={deleteAll}
                          color="secondary">حذف الكل
                  </Button>
                </Box>
              </Box>
           </Grid>
        </Grid>
       
        <Box>
        <Table className={classes.table} aria-label="collapsible table">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell colSpan={1}>الاسم</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>الخصم</TableCell>
              <TableCell>التحكم</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {props.dataRows.length==0 && 
            <TableRow>
               <TableCell colSpan={5}>
                <Alert severity="warning">
                  لايوجد بيانات للعرض
                </Alert>
               </TableCell>
            </TableRow>
            }
            {props.dataRows.map((row:I_StockProd_DataModel)=> (
              <DataRowTable key={row.name}                           
                            handleDelete={handleDelete} 
                            setSelectedRow={setSelectedRow}
                            row={row} />
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
}),{Set_Loading_Stock_Data,GetMyStockProdsData_Page,Stop_Loading_Stock_Data})(CollapsibleTable)