import React, { Component, useState } from 'react'
import { connect } from 'react-redux'


import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles, Grid, Box, Typography, Button, Badge, Chip, Avatar, TextField } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/RefreshRounded'
import { E_PharmaRequestStkStatus, IPagination } from '../../../Interfaces';
import { InputFieldProcessor } from '@/Commons/Services';
import SelectButtonList from './SelectButtonList';
import { IPharmasStockClass, IStockUser } from '@/Interfaces/AccountTypes';
import { IUserState } from '@/Interfaces/States';
import { RequestStatusMapping } from '@/Views/ManageStockDrugs/Services';


interface IProps {    
    pagingData:IPagination
    setPageSize:(val:number)=>void 
    handleRefresh:()=>void   
    onPageNumebrSelected:(pageNumber:number)=>void
    onSearchByNameChange?:(s:string)=>void
    onSetPharmaClass:(pharmaClass:string)=>void
    onSetReqStatus:(status:E_PharmaRequestStkStatus|"")=>void   
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
const requestStatuses=[
    "",
    E_PharmaRequestStkStatus.Accepted+1,
    E_PharmaRequestStkStatus.Disabled+1
] as (number|"")[];

const PV= (props:IProps&{pharmasClasses:IPharmasStockClass[]})=>{
    const classes=useStyles();
    const {
        pagingData:{pageSize,currentPage,totalCount,
        totalPages,nextPageLink,prevPageLink},
        setPageSize,handleRefresh,onPageNumebrSelected,pharmasClasses,
        onSearchByNameChange,onSetPharmaClass,onSetReqStatus}=props;
    const handleChanage=(e: React.ChangeEvent<unknown>, selectedPageNumber: number) => {
        onPageNumebrSelected(selectedPageNumber);
    };
    return (<Box className={classes.pagination}>
                <Grid container>
                    <Grid item md={3} sm={4} xs={12}>
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
                    <Grid item md={9} sm={8} xs={12}>
                        <Box display="flex">
                            <Box>
                                <Box>
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
                                    <Box display="inline-block" ml={1}>
                                        <SelectButtonList<number> pagingData={props.pagingData}
                                                          setSelectedVal={setPageSize}
                                                          btnText={"حجم الصفحة"}
                                                          listItems={[2,4,6,8,10]}/>
                                    </Box>
                                </Box>
                                
                                <Box mt={1} alignItems="center" alignContent="center">
                                    <TextField
                                        placeholder="ابحث باسم الصيدلية"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        className={classes.searchInp}
                                        onChange={InputFieldProcessor.delay(function (this:HTMLInputElement,e: any) {
                                            if(onSearchByNameChange) onSearchByNameChange(e.target.value);
                                        }, 700)}
                                    />
                                </Box>
                            </Box>
                            <Box ml={2}>
                                <Box>
                                    <SelectButtonList<string> pagingData={props.pagingData}
                                                              setSelectedVal={onSetPharmaClass}
                                                              btnText={"نوع التصنيف"}
                                                              listItems={pharmasClasses.map(e=>e.name)}
                                                              style={{width:'100%'} as any}/>
                                </Box>
                                <Box mt={1}>
                                    <SelectButtonList<E_PharmaRequestStkStatus|""> pagingData={props.pagingData}
                                                              setSelectedVal={onSetReqStatus}
                                                              btnText={"حالة الطلب"}
                                                              listItems={requestStatuses}
                                                              listItemsMap={RequestStatusMapping}
                                                              style={{width:'100%'} as any}
                                                              />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>)
}

export default connect((state:{user:IUserState})=>({
    pharmasClasses:(state.user.userIdentity.user as IStockUser).pharmasClasses
}),{})(PV as (props:IProps)=>JSX.Element)

