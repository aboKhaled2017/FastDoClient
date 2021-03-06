import React from 'react'
import { connect } from 'react-redux'


import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles, Box, Typography, Button, Chip, Avatar, TextField, IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/RefreshRounded'
import {IPagination } from '@/Interfaces/General';
import { InputFieldProcessor } from '@/Commons/Services';
import SelectButtonList from './SelectButtonList';
import { IPharmasStockClass, IStockUser } from '@/Interfaces/AccountTypes';
import { IUserState } from '@/Interfaces/States';
import { AutocompleteCompForStocks } from '../SearshingDrugsView/Components';
import { IStockGData } from '@/Interfaces/ModelsTypes';
import  RemoveIcon  from '@material-ui/icons/CloseOutlined';


interface IProps {    
    pagingData:IPagination
    setPageSize:(val:number)=>void 
    handleRefresh:()=>void   
    onPageNumebrSelected:(pageNumber:number)=>void
    onSearchByNameChange?:(s:string)=>void
    onSelectStockName?:(s:IStockGData)=>void 
    selectedStkName?:string 
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

const PV= (props:IProps&{pharmasClasses:IPharmasStockClass[]})=>{
    const classes=useStyles();
    const {
        pagingData:{pageSize,currentPage,totalCount,
        totalPages,nextPageLink,prevPageLink},
        setPageSize,handleRefresh,onPageNumebrSelected,selectedStkName,
        onSearchByNameChange,onSelectStockName}=props;
    const handleChanage=(e: React.ChangeEvent<unknown>, selectedPageNumber: number) => {
        onPageNumebrSelected(selectedPageNumber);
    };
    return (<Box className={classes.pagination}  display="flex">
                <Box>
                    <Pagination                              
                            count={totalPages}
                            page={currentPage}
                            hideNextButton={nextPageLink==null}
                            hidePrevButton={prevPageLink==null}
                            onChange={handleChanage}
                            color="primary" /> 
                    <Box mt={1} display="flex">
                        <Chip style={{margin:'auto 1px'}} 
                            avatar={<Avatar style={{color:'red'}}>{totalCount}</Avatar>}
                            label={`اجمالى العناصر`}/>
                        <Chip label={`اجمالى الصفحات`}
                            avatar={<Avatar style={{color:'red'}}>{totalPages}</Avatar>}/>         
                    </Box>
                </Box>
                <Box mx={2}>
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
                                        <SelectButtonList<number> 
                                                    setSelectedVal={setPageSize}
                                                    btnText={"حجم الصفحة"}
                                                    listItems={[2,4,6,8,10]}/>
                                    </Box>
                                </Box>
                                
                                <Box mt={1} alignItems="center" alignContent="center">
                                    <TextField
                                        placeholder="ابحث باسم الدواء"
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
                            <Box ml={2} alignSelf="center">
                                {onSelectStockName &&
                                <Box>
                                    {selectedStkName &&
                                    <Box display="flex">
                                        <Typography align="center" variant="h6" color="primary">
                                        مخزن {selectedStkName}
                                        </Typography>
                                        <IconButton size="small" onClick={e=>{onSelectStockName(undefined as any)}}>
                                            <RemoveIcon color="secondary"/>
                                        </IconButton>
                                    </Box>
                                    }
                                    <AutocompleteCompForStocks  OnSelectedStock={onSelectStockName}/>                                    
                                </Box>
                                }
                            </Box>
                        </Box>
                    </Box>
            </Box>)
}

export default connect((state:{user:IUserState})=>({
    pharmasClasses:(state.user.userIdentity.user as IStockUser).pharmasClasses
}),{})(PV as (props:IProps)=>JSX.Element)

