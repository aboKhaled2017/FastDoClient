import React, { ReactElement, useCallback } from 'react'
import { makeStyles, Theme, createStyles, Box, Card, CardHeader, Avatar, CardContent,
   Typography, Chip, Divider, CardActions, IconButton, Collapse,
    Badge, ButtonGroup, Button, CircularProgress } from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/SendRounded'
import axios from 'axios';

import { ISearchStockModel } from '../Interfaces';
import store from '../../../Redux/store';
import { MessageAlerter } from '../../../Commons/Services';
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
    model:ISearchStockModel
    sendJoinRequest:(executeBeforeReq:Function,executeAfterReq:Function,modelId:string)=>void
}
const getAddress=(areaId:number)=>{
  const Areas=store.getState().data.areas;
  const this_SubArea=Areas.destricts.find(a=>a.id==areaId);
  const this_CityArea=Areas.cities.find(a=>a.id==this_SubArea?.superAreaId);
  return `${this_CityArea?.name} / ${this_SubArea?.name}`;
}
export default (props: IProps) => {
    const classes=useStyles();
    const {model,sendJoinRequest}=props;
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
                      <td>{model.landlinePhone}</td>
                    </tr>
                  </tbody>
                </table>           
                  
                <Box mt={2}>
                  <Button variant="contained" 
                          color="primary" 
                          onClick={()=>{
                            sendJoinRequest(
                              ()=>{setLoading(true);},
                              ()=>{setLoading(false);},
                              model.id
                            )
                          }}
                          startIcon={ <SendIcon/> }>
                      ارسل طلب انضمام
                  </Button>
                </Box>
              </Box>             
            </CardContent>
        </Card>
    );
}
