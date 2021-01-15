import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles, Grid, Box, Typography, Button, Badge, Chip, Avatar, TextField } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/RefreshRounded'

import {ButtonList} from '@/components/Buttons';
import { IPagination } from '@/Interfaces/General';
import {FuncsService} from '@Views/StockDrugsRequests/Services'
import { EStockDrugsPackgStatus } from '@/Interfaces/StockDrgsRequestsTypes';

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

interface IProps {    
    pagingData:IPagination
    setPageSize:(val:number)=>void 
    handleRefresh:()=>void   
    onPageNumebrSelected:(pageNumber:number)=>void
    onSetReqStatus:(status:EStockDrugsPackgStatus|"all")=>void   
}


const PV:React.FC<IProps>= props=>{
    const classes=useStyles();
    const {
        pagingData:{pageSize,currentPage,totalCount,
        totalPages,nextPageLink,prevPageLink},
        setPageSize,handleRefresh,onPageNumebrSelected,
        onSetReqStatus}=props;

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
                        <Box>
                            <Box width="fit-content">
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
                                    <ButtonList<number>                                                  
                                                setSelectedVal={setPageSize}
                                                btnText={"حجم الصفحة"}                                                 
                                                listItems={[2,4,6,8,10]}/>
                                </Box>
                                <Box mt={1}>
                                   <ButtonList<EStockDrugsPackgStatus|'all'>                                        
                                        setSelectedVal={onSetReqStatus}
                                        btnText={"حالة الطلب"}
                                        listItems={FuncsService.getStockDrugsRequestsStatuses()}
                                        listItemsMap={FuncsService.RequestStatusMapping}
                                        style={{width:'100%'} as any}
                                    />
                                </Box>  
                            </Box> 
                                                                                                                      
                        </Box>
                    </Grid>
                </Grid>
            </Box>)
}

export default PV;

