import { ILazDrugModel } from "../../../../Interfaces/ModelsTypes";
import { LazDrugConsumeType } from "../../../../Interfaces/DataTypes";
import { makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import LzDrgTableRow from './LzDrgTableRow'

const myData:ILazDrugModel[]=[
    {
      id:'Aaaa-bbbb-ff', name: 'antinal500', type: 'حقن', quantity: 63,
      price:20,consumeType:LazDrugConsumeType.burning,discount:10,
      validDate:new Date(),priceType:1,unitType:0,
      desc:'حقن انتينال 500 تاريخ جديد ,المنتج متوفر الى يوم الثلاثاء القادم, استبدال جمهور بجمهور'
    },
    {
      id:'Aaaa-bbbb-bb', name: 'antinal', type: 'اقراص', desc:'', quantity: 18,
      price:25,consumeType:LazDrugConsumeType.exchange,discount:77,validDate:new Date(),priceType:1,unitType:1
    },
    {
      id:'Aaaa-bbbb-tt', name: 'bros15', type: 'مستلزمات طبية', desc:'', quantity: 16,
      price:10,consumeType:LazDrugConsumeType.burning,discount:20,validDate:new Date(),priceType:0,unitType:0
    },
    {
      id:'Aaaa-bbbb-rr', name: 'koncat', type: 'شراب', desc:'', quantity: 44,
      price:105,consumeType:LazDrugConsumeType.exchange,discount:50,validDate:new Date(),priceType:0,unitType:0
    },
    {
      id:'Aaaa-bbbb-ee', name: 'abimole', type: 'نقط', desc:'', quantity: 51,
      price:44,consumeType:LazDrugConsumeType.burning,discount:10,validDate:new Date(),priceType:1,unitType:2
    },
    {
      id:'Aaaa-bbbb-po', name: 'capsol', type: 'مرهم دهان', desc:'', quantity: 98,
      price:17,consumeType:LazDrugConsumeType.burning,discount:10,validDate:new Date(),priceType:0,unitType:1
    },
    {
      id:'Aaaa-bbbb-cv', name: 'voltareen', type: 'حقن', desc:'', quantity: 15,
      price:19,consumeType:LazDrugConsumeType.burning,discount:10,validDate:new Date(),priceType:1,unitType:2
    },
]
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 880,
    },
    thead:{
      '& th':{
        background:'#008394',
        fontSize:20,
        color:'#fff',
        border: '2px solid rgba(206, 206, 206, 0.56)',
        textAlign: 'center'
      }
    }
});
function CollapsibleTable() {
    const classes=useStyles();
    return (
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell colSpan={2}>الاسم</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>الكمية</TableCell>
              <TableCell>التحم</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myData.map((row:ILazDrugModel)=> (
              <LzDrgTableRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default CollapsibleTable;