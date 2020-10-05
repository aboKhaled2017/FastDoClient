import React, { Component } from 'react'
import { connect } from 'react-redux'
import {GetMy_DrgsReqs_IMade_Page} from '../../../../../Redux/Actions/DataActions'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles, Grid, Box, Typography, Button, Badge, Chip, Avatar } from '@material-ui/core'
import { IDataState } from '../../../../../Interfaces/States';
import RefreshIcon from '@material-ui/icons/RefreshRounded'
import SelectPsMenu from './Select_PS_Menu'
import { I_Drug_Pagination, I_PaginationReq_To_GetDrugs } from '../../../../../Interfaces/DrugsTypes';
interface IProps {
    GetMy_DrgsReqs_IMade_Page:(page:I_PaginationReq_To_GetDrugs)=>void
    pagingData:I_Drug_Pagination
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
        props.GetMy_DrgsReqs_IMade_Page({
            pageSize:pageSize,
            pageNumber:page
        });
    };
    const handleRefresh=(e:any)=>{
        props.GetMy_DrgsReqs_IMade_Page({
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

export default connect((state:{data:IDataState})=>({
pagingData:state.data.DrgsReq_I_made_Data.pagination
}),{GetMy_DrgsReqs_IMade_Page})(PaginationView) as any;
