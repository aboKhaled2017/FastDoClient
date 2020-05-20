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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DrugTabs from './DrugTabs';
import { ILzDrugsTableRow } from '../../Interfaces/ModelsTypes';

interface TableState {
  columns: Array<Column<ILzDrugsTableRow>>;
  data: ILzDrugsTableRow[];
}
const myData:ILzDrugsTableRow[]=[
  {
    id:'Aaaa-bbbb-ff', name: 'antinal500', type: 'حقن', desc:'', quantity: 63,
    price:20,consumeType:0,discount:10,validDate:new Date(),priceType:1
  },
  {
    id:'Aaaa-bbbb-bb', name: 'antinal', type: 'اقراص', desc:'', quantity: 18,
    price:25,consumeType:0,discount:77,validDate:new Date(),priceType:1
  },
  {
    id:'Aaaa-bbbb-tt', name: 'bros15', type: 'مستلزمات طبية', desc:'', quantity: 16,
    price:10,consumeType:1,discount:20,validDate:new Date(),priceType:0
  },
  {
    id:'Aaaa-bbbb-rr', name: 'koncat', type: 'شراب', desc:'', quantity: 44,
    price:105,consumeType:1,discount:50,validDate:new Date(),priceType:0
  },
  {
    id:'Aaaa-bbbb-ee', name: 'abimole', type: 'نقط', desc:'', quantity: 51,
    price:44,consumeType:0,discount:10,validDate:new Date(),priceType:1
  },
  {
    id:'Aaaa-bbbb-po', name: 'capsol', type: 'مرهم دهان', desc:'', quantity: 98,
    price:17,consumeType:0,discount:10,validDate:new Date(),priceType:0
  },
  {
    id:'Aaaa-bbbb-cv', name: 'voltareen', type: 'حقن', desc:'', quantity: 15,
    price:19,consumeType:0,discount:10,validDate:new Date(),priceType:1
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
      background:'#000',
      fontSize:20,
      color:'#fff',
      border: '2px solid rgba(206, 206, 206, 0.56)',
      textAlign: 'center'
    }
  }
});
function LzDrugCollapsedRow(props: { row: ILzDrugsTableRow,open:boolean}){
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
function LzDrugTableRow(props: { row: ILzDrugsTableRow }) {
  const classes = useRowStyles();
  const {row}=props;
  const initOpen=row.name=="antinal500"?true:false;
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
          </TableRow>
        </TableHead>
        <TableBody>
          {myData.map((row:ILzDrugsTableRow)=> (
            <LzDrugTableRow key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function LzDrugsTable() {
    const [state, setState] = React.useState<TableState>({
      columns: [
        { title: 'id', field: 'id',hidden:true},
        { title: 'الاسم', field: 'name' },
        { title: 'النوع', field: 'type'},
        {
          title: 'الوصف',
          field: 'desc',
          lookup: { 34: 'Istanbul', 63: 'Sanliurfa' },
        },
        { title: 'الكمية', field: 'quantity', type:'numeric'},
        { title: 'السعر للوحدة', field: 'price',type:'numeric' },
        {
          title: 'طريقة الاستهلاك',
          field: 'consumeType',
          lookup: { 
            0: 'تبادل جمهور مع جمهور',
            1: 'البيع بالخصم',
            2:'اى منهما' },
        },
        { title: 'نسبة الخصم', field: 'discount',type:'numeric',render:(data,type)=>{
          return `${data.discount} %`;
        }},
        { title: 'تاريخ الصلاحية', field: 'validDate',type:'date'},
        { title: 'نوع السعر', field: 'priceType', lookup:{
          0:'سعر جديد',
          1:'سعر قديم'
        } },
      ],
      data: myData
    });
  
    return (
      <MaterialTable
        title="الرواكد خاصتى"
        columns={state.columns}
        data={state.data}
        
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
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
