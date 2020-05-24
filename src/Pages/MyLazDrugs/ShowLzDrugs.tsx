import React, { ReactElement } from 'react'
import { Theme, withStyles } from '@material-ui/core'
import MaterialTable, { Column } from 'material-table';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/EditRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DrugTabs from './DrugTabs';
import {  ILazDrugModel } from '../../Interfaces/ModelsTypes';
import { LazDrugConsumeType } from '../../Interfaces/DataTypes';

interface TableState {
  columns: Array<Column<ILazDrugModel>>;
  data: ILazDrugModel[];
}
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
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
  },
  collapseCell:{
    padding: 2,
  width: 50,
  textAlign: 'center'
  }
});
const StyledTableRow = withStyles((theme: Theme) =>createStyles({
    root: {
      background:'rgba(0, 0, 0, 0.04)',
      '&:nth-of-type(4n+3)': {
        backgroundColor:'#647484',
        '&> td,> th':{
          color:'#fff',
          '&> button':{
            color:'#fff'
          }
        }
      },
    }
}),
)(TableRow);
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
function LzDrugCollapsedRow(props: { row: ILazDrugModel,open:boolean}){
  const { row ,open} = props;
  return <TableRow>
            <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      كل ما يتعلق بالراكد
                    </Typography>
                    <DrugTabs model={row}/>
                  </Box>
                </Collapse>
            </TableCell>
          </TableRow>
}
function LzDrugTableRow(props: { row: ILazDrugModel }) {
  const classes = useRowStyles();
  const {row}=props;
  const initOpen=row.name=="antinal"?true:false;
  const [open, setOpen] = React.useState(initOpen);
  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell className={classes.collapseCell}>
          <IconButton title="التفاصيل" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.type}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center">{row.quantity}</TableCell>
        <TableCell align="center">
           <div>
           <IconButton  title="تعديل بيانات الراكد">
            <EditIcon color="primary"/>
           </IconButton>
           <IconButton  title="حذف الراكد">
            <DeleteForeverRoundedIcon color="secondary"/>
           </IconButton>
           </div>
        </TableCell>
      </StyledTableRow>
      <LzDrugCollapsedRow row={row} open={open}/>
      </React.Fragment>
  );
}
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
            <LzDrugTableRow key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
interface Props {
    
}
const styles=(theme:Theme)=>({

})
export default withStyles(styles)(({}: Props): ReactElement=> {
    return (
           <CollapsibleTable/>
    )
})
