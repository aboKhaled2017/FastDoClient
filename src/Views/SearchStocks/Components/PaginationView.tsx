import React, { Component, useState } from 'react'
import { connect } from 'react-redux'


import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles, Grid, Box, Typography, Button, Badge, Chip, Avatar, TextField } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/RefreshRounded'
import SelectPsMenu from './Select_PS_Menu'
import { IPagination } from '../Interfaces';
import { InputFieldProcessor } from '../../../Commons/Services';



interface IProps {    
    pagingData:IPagination
    Set_Drugs_PageSize:(val:number)=>void 
    HandleRefresh:()=>void   
    OnPageNumebrSelected:(pageNumber:number)=>void
    UserSearch?:boolean
    OnSearchByNameChange?:(s:string)=>void
}

const useStyles=makeStyles((theme:Theme)=>createStyles({
    pagination:{
      margin:theme.spacing(2,1)
    },
    searchInp: {   
        '& .MuiOutlinedInput-root input':{
            padding: 10
        }
    },
}));
export default (props:IProps)=>{
    const classes=useStyles();
    const {
        pagingData:{pageSize,currentPage,totalCount,totalPages,nextPageLink,prevPageLink},
        Set_Drugs_PageSize,HandleRefresh,OnPageNumebrSelected,UserSearch,OnSearchByNameChange}=props;
    const handleChanage=(e: React.ChangeEvent<unknown>, selectedPageNumber: number) => {
        OnPageNumebrSelected(selectedPageNumber);
    };
    return (<Box className={classes.pagination}>
                <Grid container>
                <Grid item md={5}>
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
                <Grid item md={7}>
                    <Box>
                        <Box display="inline-block">
                        <Button size="small" variant="contained" color="primary"
                            endIcon={<RefreshIcon/>}
                            onClick={HandleRefresh}
                        >
                                <Box px={1}>
                                تحديث
                                </Box>
                        </Button>
                        
                        </Box>
                        <Box display="inline-block" mx={1}>
                      <SelectPsMenu 
                            pagingData={props.pagingData}                         
                            Set_Drugs_PageSize={Set_Drugs_PageSize} />
                    </Box>
                    </Box>
                    {UserSearch &&
                    <Box mt={1} alignItems="center" alignContent="center">
                       <TextField
                         placeholder="ابحث باسم المخزن"
                         type="text"
                         variant="outlined"
                         className={classes.searchInp}
                         onChange={InputFieldProcessor.delay(function (this:HTMLInputElement,e: any) {
                            if(OnSearchByNameChange) OnSearchByNameChange(e.target.value);
                        }, 700)}
                       />
                    </Box>}
                </Grid>
                </Grid>
            </Box>)
}


