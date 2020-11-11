import { IStkDrugsPackage, IStkDrugsPackage_FromStock, IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { createStyles, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { Fragment } from 'react';
import TableRowView from './Components/TableRow'
const useStyles =  makeStyles((theme: Theme) =>createStyles({
   thead:{
     '& th':{
       background:theme.palette.info.light,
       fontSize:20,
       color:'#fff',
       border: '2px solid rgba(206, 206, 206, 0.56)',
       textAlign: 'center'
     }
   },
   MainTitle:{
     color:theme.palette.info.dark
   },
   backdrop: {
     zIndex: theme.zIndex.drawer + 1,
     color: '#fff',
   },
   table:{
     background:'transparent',
     width:'100%'
   },
   tbody:{
     background:'#fff',
     '& tr':{
       marginTop:3
     }
   }
}));


interface IViewProps {
    pack:IStkDrugsPackage
    OnDeleteRow: (row: IStkDrugsPackage_FromStock) => void
    onSaveQuantityChange: (drugRowId: string, stockId: string, newVal: number) => void
    onRemoveDrugsRow: (drugRow: IStkDrugsPackage_FromStock_DrugData, stockId: string) => void
}

const View: React.FC<IViewProps> =props => {
  const classes=useStyles();
  const {pack,onRemoveDrugsRow,onSaveQuantityChange,OnDeleteRow}=props;
   
  if(!pack)
  return <Fragment/>
  return (
    <Fragment>
        <Table className={classes.table} aria-label="collapsible table">
            <TableHead className={classes.thead}>
                <TableRow>
                    <TableCell colSpan={2}>اسم المخزن</TableCell>
                    <TableCell>العنوان</TableCell>
                    <TableCell>اجمالى عدد الرواكد</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className={classes.tbody}>
                {pack.fromStocks.length===0&&
                <TableCell colSpan={5}>
                    <Alert severity="info">
                    الطلبية لا يوجد بها عناصر مضافة
                    </Alert>
                </TableCell>
                } 
                {pack.fromStocks.map((row,i)=> (
                <TableRowView key={i} 
                        row={row} 
                        OnDeleteRow={OnDeleteRow} 
                        onSaveQuantityChange={onSaveQuantityChange}                                           
                        onRemoveDrugsRow={onRemoveDrugsRow}/>
                ))}
            </TableBody>
        </Table> 
    </Fragment>
  );
};

export default View;
