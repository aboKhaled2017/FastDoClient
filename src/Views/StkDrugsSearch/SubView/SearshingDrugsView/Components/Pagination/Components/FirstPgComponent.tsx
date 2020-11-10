
import { Box, Chip, Avatar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useContext } from 'react';
import context from '../../../SearchDrugsContext';

interface IFirstPgComponentProps {}

const FirstPgComponent: React.FC<IFirstPgComponentProps> = props => {
     
    const {pagingObj:{
        totalCount,currentPage,nextPageLink,prevPageLink,totalPages}
        ,onPageNumberSelected
    }=useContext(context);
    const handleChanage=(e: React.ChangeEvent<unknown>, selectedPageNumber: number) => {
        onPageNumberSelected(selectedPageNumber);
    };
  return (
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
  );
};

export default FirstPgComponent;
