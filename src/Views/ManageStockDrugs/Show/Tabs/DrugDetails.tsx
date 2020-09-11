import React from 'react'
import {Get_DrgPriceType_StrFormate, Get_DrgConsumeType_StrFormate, getDrugDesc, Get_DrgValidDate }
 from '../../../../Commons/Services'
import { makeStyles, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditRounded'
import { I_Drug_DataModel } from '../../../../Interfaces/DrugsTypes';
import { Get_LzDrgStateFormate } from '../../services';
const useStyles = makeStyles((theme) => ({
    tr:{
        background:'#eee',
        borderRadius:5,
        '&>td':{
            padding:'5px 8px',
            borderRadius:5,
            color:'#0c55a2'
        }
    },
    editButton:{
        marginTop:5
    }
}));
interface IProps {
    model:I_Drug_DataModel
}

export default ({model}: IProps)=> {
    const classes=useStyles();
    return (
    <table>
        <tbody>
            <tr className={classes.tr}>
                <td><span className="notArabicFont">{model.name}</span> / {model.type}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{Get_LzDrgStateFormate(model)}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{`تاريخ الصلاحية - ${Get_DrgValidDate(model.valideDate)}`}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{`نوع السعر - ${Get_DrgPriceType_StrFormate(model.priceType)}`}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{`نوع الاستهلاك - ${Get_DrgConsumeType_StrFormate(model.consumeType,model.discount)}`}</td>
            </tr>
            <tr className={classes.tr}>
            <td>
                <div>
                    <Typography variant="subtitle2" color="secondary">وصف منتجك/راكدك</Typography>
                    <Typography variant="body2" color="initial">
                        {getDrugDesc(model.desc)}
                    </Typography>
                </div>
            </td>
            </tr>
         </tbody>
    </table>)
}
