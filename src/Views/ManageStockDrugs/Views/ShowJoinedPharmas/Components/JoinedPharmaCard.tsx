import React, { ReactElement, useCallback } from 'react'
import { makeStyles, Theme, createStyles, Box, Card, CardHeader, Avatar, CardContent, Typography, Chip, Divider, CardActions, IconButton, Collapse, Badge, ButtonGroup, Button, CircularProgress } from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import { E_PharmaRequestStkStatus, IStkJoinedPharma } from '../../../Interfaces';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    root: {
        maxWidth: 600,
        background:'#fafafa'
      },
      cardHeader:{
        '& .MuiCardHeader-title':{
          color:theme.palette.primary.main,
          fontSize:20,
        }
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      cardContentOnLoading:{
        opacity:.5
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
        marginLeft:16,
        marginRight:-16
      },
      table:{
        width:'100%'
      },
      tr:{
        background:'#748fa5f5',
        borderRadius:5,
        display:'block',
        '&>td':{
            padding:'8px 10px',
            borderRadius:5,
            color:'#fff',
            margin:'5px auto',
            display:'block'
        }
      },
      btnWithIcon:{
        '& .MuiButton-startIcon':{
          marginRight:-8
        }
      },
      buttonIcon:{
        marginLeft:7
      }
}));
interface IProps {
    model:IStkJoinedPharma
    handlePharmaRequest:(
      
      executeBeforeReq:Function,
      executeAfterReq:Function,
      data:{
          id:string,
          body:any
      })=>void
}
export default (props: IProps) => {
    const classes=useStyles();
    const {model,handlePharmaRequest}=props;
    const [loading,setLoading]=React.useState(false);
 
    const respondeToPharmaRequest=(s:E_PharmaRequestStkStatus)=>{
      const reqBody=[       
        {
          "op":"replace",
          "value":s,
          "path":"/Status"
        }
      ];
        handlePharmaRequest(
          ()=>{
            setLoading(true);
          },
          ()=>{
            setLoading(false);
          },
          {
            id:model.pharma.id,
            body:reqBody
          }
        )
    }

    const status=model.status??E_PharmaRequestStkStatus.Accepted;
    return (
        <Card className={classes.root}>
            <CardHeader 
                className={classes.cardHeader}
                title={`صيدلية ${model.pharma.name}`}
                //subheader={`${model.quantity} ${getDrugUnitType(model.unitType)} بخصم ${model.discount} %`}
            />
            <CardContent className={loading?classes.cardContentOnLoading:""}>
              {loading &&
                <div>
                 <CircularProgress color="primary"/>
              </div>}
              <Box>
                <Chip color="default" variant="default"  label="حالة الصيدلية"/>
                {status==E_PharmaRequestStkStatus.Accepted &&
                <Chip style={{margin:'auto 2px'}} 
                      color="primary" 
                      variant="default" 
                      label={`نشطة`}/>} 
                {status==E_PharmaRequestStkStatus.Disabled &&
                <Chip style={{margin:'auto 2px'}} 
                      color="secondary" 
                      variant="default" 
                      label={`معطلة`}/>}                 
              </Box>
                 
              <table>
                  <tbody>
                    <tr>
                      <td>العنوان:</td>
                      <td>{model.pharma.address}</td>
                    </tr>
                    <tr>
                      <td>العنوان التفصيلى:</td>
                      <td>{model.pharma.addressInDetails??"غير محدد"}</td>
                    </tr>
                    <tr>
                      <td>الهاتف المحمول:</td>
                      <td>{model.pharma.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>التليفون الارضى:</td>
                      <td>{model.pharma.landlinePhone}</td>
                    </tr>
                  </tbody>
                </table>           
                  
              <Box my={1}>
                <Typography variant="h6">تحديد حالة طلب الانضمام</Typography>
                <Box>
                    <ButtonGroup variant="outlined" color="primary" aria-label="تحديد حالة الطلب">
                        <Button color={status==E_PharmaRequestStkStatus.Accepted?'secondary':'primary'}
                                onClick={()=>{
                                  respondeToPharmaRequest(
                                    status==E_PharmaRequestStkStatus.Accepted
                                    ?E_PharmaRequestStkStatus.Disabled
                                    :E_PharmaRequestStkStatus.Accepted)}}>
                                  {status==E_PharmaRequestStkStatus.Accepted?'تعطيل':'تفعيل'}
                        </Button>
                        <Button 
                            color="secondary"
                            onClick={()=>{respondeToPharmaRequest(E_PharmaRequestStkStatus.Rejected)}}>ازالة الصيدلية
                        </Button>
                    </ButtonGroup>

                </Box>
              </Box>
            
            </CardContent>
        </Card>
    );
}
