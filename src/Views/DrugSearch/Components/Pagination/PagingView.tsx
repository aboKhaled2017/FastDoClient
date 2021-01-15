import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Set_DrgsSearch_PageNumber_And_PageSize} from '@Redux/Actions/searchDataActions'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles, Grid, Box, Typography, Button, Badge, Chip, Avatar } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/RefreshRounded'
import SelectBtnMenu from '@/components/Buttons/ButtonList/Button'
import { ISearchDataState } from '@/Interfaces/States';
import { I_Drgs_SearchPaging, I_Drgs_SearchPaging_Parmas } from '@/Interfaces/SearchDrugsTypes';
interface IProps {
    Set_DrgsSearch_PageNumber_And_PageSize:(pageNumber:number,pageSize:number)=>void
    pagingData:  I_Drgs_SearchPaging 
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
        props.Set_DrgsSearch_PageNumber_And_PageSize(page,pageSize);
    };
    const handleRefresh=(e:any)=>{
        props.Set_DrgsSearch_PageNumber_And_PageSize(currentPage,pageSize);
    }
    return (<Box className={classes.pagination}>
                <Grid container>
                    <Grid item sm={5} xs={12}>
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
                    <Grid item  sm={7} xs={12}>
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
                      <SelectBtnMenu<number> btnText="حجم الصفحة"
                        listItems={[2,4,6,8,10]}
                        setSelectedVal={num=>{props.Set_DrgsSearch_PageNumber_And_PageSize(1,num)}}/>
                    </Box>
                </Grid>
                </Grid>
            </Box>)
}

export default connect((state:{searchData:ISearchDataState})=>({
pagingData:state.searchData.searchDataTable.pagination
}),{Set_DrgsSearch_PageNumber_And_PageSize})(PaginationView) as any;
