import React, { ReactElement, useCallback } from 'react'
import { makeStyles, Theme, createStyles, Box, Card, CardHeader, Avatar, CardContent, Typography, Chip, Divider, CardActions, IconButton, Collapse, Badge, ButtonGroup, Button, CircularProgress } from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import { E_PharmaRequestStkStatus, IRequestedStocDataModel } from '../Interfaces';
import  RemoveIcon from '@material-ui/icons/CancelRounded'

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
    model:IRequestedStocDataModel
    cancelRequest:(executeBeforeReq:Function,executeAfterReq:Function,modelId:string)=>void
}
export default (props: IProps) => {
    const classes=useStyles();
    const {model,cancelRequest}=props;
    const [loading,setLoading]=React.useState(false);
  
    return (
        <Card className={classes.root}>
            <CardHeader 
                className={classes.cardHeader}
                title={`مخزن ${model.name}`}
                //subheader={`${model.quantity} ${getDrugUnitType(model.unitType)} بخصم ${model.discount} %`}
            />
            <CardContent className={loading?classes.cardContentOnLoading:""}>
              {loading &&
                <div>
                 <CircularProgress color="primary"/>
              </div>}
              <Box>
                <Chip color="primary" variant="outlined" className="notArabicFont" label="حالة الطلب"/>
                {model.status==E_PharmaRequestStkStatus.Pending &&
                <Chip style={{margin:'auto 2px'}} 
                      variant="default" 
                      label={`لم يتم الرد على طلبك حتى الان`}/>}
                {model.status==E_PharmaRequestStkStatus.Rejected &&
                <Chip style={{margin:'auto 2px'}} 
                      color="secondary" 
                      variant="default" 
                      label={`لقد تم رفض طلبك`}/>} 
                {model.status==E_PharmaRequestStkStatus.Accepted &&
                <Chip style={{margin:'auto 2px'}} 
                      color="primary" 
                      variant="default" 
                      label={`لقد تم قبول طلبك`}/>} 
                {model.status==E_PharmaRequestStkStatus.Disabled &&
                <Chip style={{margin:'auto 2px'}} 
                      color="secondary" 
                      variant="default" 
                      label={`تم تعطيلك مؤقتا`}/>}                  
              </Box>
              <Box my={1}>
              <Chip color="primary"  
                    className="notArabicFont" 
                    label={model.seen?"لقد تم رؤية طلبك":"لم يتم رؤية طلبك بعد"}/> 
              </Box>
              <Box>   
                <table>
                  <tbody>
                    <tr>
                      <td>العنوان:</td>
                      <td>{model.address}</td>
                    </tr>
                    <tr>
                      <td>العنوان التفصيلى:</td>
                      <td>{model.addressInDetails??"غير محدد"}</td>
                    </tr>
                    <tr>
                      <td>الهاتف المحمول:</td>
                      <td>{model.persPhone}</td>
                    </tr>
                    <tr>
                      <td>التليفون الارضى:</td>
                      <td>{model.landLinePhone}</td>
                    </tr>
                  </tbody>
                </table>           
                  
                <Box mt={2}>
                  <Button variant="contained" 
                          color="secondary" 
                          onClick={()=>{
                            cancelRequest(
                              ()=>{setLoading(true);},
                              ()=>{setLoading(false);},
                              model.stockId
                            )
                          }}
                          startIcon={<RemoveIcon/> }>
                      الغاء طلب انضمام
                  </Button>
                </Box>
              </Box> 
            </CardContent>
        </Card>
    );
}
