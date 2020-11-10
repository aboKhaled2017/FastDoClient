import { ISearchStkDrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { Box, Collapse, TableCell, Typography } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import TableView_InnerTable from "./TableView.InnerTable";


const TableView_Row_Collapsed:React.FC<{drugData:ISearchStkDrugData,open:boolean}>=props=>{
    const { drugData ,open} = props;
    return <TableRow>
              <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                      <Box>
                         <TableView_InnerTable rowData={drugData}/>
                      </Box>
                      </Typography>
                    </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
}

export default TableView_Row_Collapsed;