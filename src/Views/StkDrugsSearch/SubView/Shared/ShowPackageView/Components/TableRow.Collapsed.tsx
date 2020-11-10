import { IStkDrugsPackage_FromStock, IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { Box, Collapse, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import TableRow_Collapsed_InnerTable from './TableRow.Collapsed.InnerTable'

interface ITableRow_CollapsedProps {
    stock:IStkDrugsPackage_FromStock,
    open:boolean
    onRemoveDrugsRow:(drugRow:IStkDrugsPackage_FromStock_DrugData,stockId:string)=>void
    onSaveQuantityChange:(drugRowId:string,stockId:string,val:number)=>void
}

const TableRow_Collapsed: React.FC<ITableRow_CollapsedProps> =props => {
    const { stock:{drugs,id},onRemoveDrugsRow,open,onSaveQuantityChange} = props;
    return <TableRow>
              <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                      <Box>
                        <TableRow_Collapsed_InnerTable drugs={drugs} 
                                stockId={id} 
                                onSaveQuantityChange={onSaveQuantityChange}
                                onRemoveDrugsRow={onRemoveDrugsRow}/>
                      </Box>
                      </Typography>
                    </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
};

export default TableRow_Collapsed;
