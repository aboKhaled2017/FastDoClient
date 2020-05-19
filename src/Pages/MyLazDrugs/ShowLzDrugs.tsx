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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&.row':{
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      }
    },
  }),
)(TableRow);
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 880,
  },
});
interface ILzDrugsRow {
    id:string
    name: string
    type:string 
    desc:string
    quantity: number
    price:number
    consumeType: number
    discount: number
    validDate:Date
    priceType:number     
}
  
interface TableState {
    columns: Array<Column<ILzDrugsRow>>;
    data: ILzDrugsRow[];
}
const myData:ILzDrugsRow[]=[
  {
    id:'Aaaa-bbbb-ff', name: 'vental15', type: 'حقن', desc:'', quantity: 63,
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
function LzDrugTableRow(props: { row: ILzDrugsRow }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root +" row"}>
        <TableCell>
          <IconButton title="التفاصيل" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.discount}</TableCell>
      </StyledTableRow>
      <Box component={TableRow}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <ul>
                <li>"property"</li>
                <li>"property"</li>
                <li>"property"</li>
                <li>"property"</li>
                <li>"property"</li>
              </ul>
              </Box>
          </Collapse>
        </TableCell>
      </Box>
    </React.Fragment>
  );
}

function CollapsibleTable() {
  const classes=useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>الاسم</TableCell>
            <TableCell>النوع</TableCell>
            <TableCell>السعر</TableCell>
            <TableCell>الكمية</TableCell>
            <TableCell>الخصم</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myData.map((row:ILzDrugsRow)=> (
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
