import React, { Component } from 'react'
import { connect } from 'react-redux'
import { I_PaginationReq_To_GetDrugs } from '../../../../Interfaces/DrugsTypes'
import {GetMyStockProdsData_Page} from '../../../../Redux/Actions/StockDataActions'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles, Grid, Box, Typography, Button, Badge, Chip, Avatar } from '@material-ui/core'
import {IStocksDataState } from '../../../../Interfaces/States';
import RefreshIcon from '@material-ui/icons/RefreshRounded'
import SelectPsMenu from './Select_PS_Menu'
import { I_StockProds_Pagination } from '../../../../Interfaces/DataStoreTypes';
interface IProps {
    GetMyStockProdsData_Page:(pageData:I_PaginationReq_To_GetDrugs)=>void
    pagingData:I_StockProds_Pagination
}

const useStyles=makeStyles((theme:Theme)=>createStyles({
    pagination:{
      margin:theme.spacing(2,1)
    },
    formControl: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,
    },
}));
const PaginationView =(props:IProps)=>{
    const classes=useStyles();
    const {pagingData:{pageSize,currentPage,totalCount,totalPages,nextPageLink,prevPageLink}}=props;
    const handleChanage=(e: React.ChangeEvent<unknown>, page: number) => {
        props.GetMyStockProdsData_Page({
            pageSize:pageSize,
            pageNumber:page
        });
    };
    const handleRefresh=(e:any)=>{
        props.GetMyStockProdsData_Page({
            pageSize:pageSize,
            pageNumber:currentPage
        });
    }
    return (<Box className={classes.pagination}>
                <Grid container>
                <Grid item sm={5}>
                    <Pagination   
                            
                            count={totalPages}
                            page={currentPage}
                            hideNextButton={nextPageLink==null}
                            hidePrevButton={prevPageLink==null}
                            onChange={handleChanage}
                            color="primary" /> 
                    <Box mt={1}>
                        <Chip style={{margin:'auto 1px'}} 
                              avatar={<Avatar style={{color:'red'}}>{totalCount}</Avatar>}
                              label={`اجمالى العناصر`}/>
                        <Chip label={`اجمالى الصفحات`}
                              avatar={<Avatar style={{color:'red'}}>{totalPages}</Avatar>}/>         
                    </Box>
                </Grid>
                <Grid item sm={7}>
                    <Box display="inline-block">
                       <Button size="small" variant="contained" color="primary"
                        endIcon={<RefreshIcon/>}
                        onClick={handleRefresh}
                       >
                            <Box px={1}>
                            تحديث
                            </Box>
                       </Button>
                       
                    </Box>
                    <Box display="inline-block" mx={1}>
                      <SelectPsMenu/>
                    </Box>
                </Grid>
                </Grid>
            </Box>)
}

const mapStateToProps = (state:{data:IStocksDataState}) => ({
    
})

export default connect((state:{stockData:IStocksDataState})=>({
pagingData:state.stockData.DataStore.pagination
}),{GetMyStockProdsData_Page})(PaginationView) as any;
