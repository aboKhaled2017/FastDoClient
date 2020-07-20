import React, { ReactElement } from 'react'
import { ILazDrugModel } from '../../../../Interfaces/ModelsTypes'
import { getLzDrugStateFormate, getDrugValidDate, getDrugPriceType, getDrugConsumeType, getDrugDesc }
 from '../../../../Commons/Services'
import { makeStyles, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditRounded'
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
    model:ILazDrugModel
}

export default ({model}: IProps)=> {
    const classes=useStyles();
    return (
    <table>
        <tbody>
            <tr className={classes.tr}>
                <td>{model.name} / {model.type}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{getLzDrugStateFormate(model)}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{`تاريخ الصلاحية - ${getDrugValidDate(model.validDate)}`}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{`نوع السعر - ${getDrugPriceType(model.priceType)}`}</td>
            </tr>
            <tr className={classes.tr}>
            <td>{`نوع الاستهلاك - ${getDrugConsumeType(model.consumeType,model.discount)}`}</td>
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
         <div>
             <Button variant="outlined" 
                     title="تعديل البيانات"
                     color="primary"
                     className={classes.editButton}
                     startIcon={<EditIcon color="primary"/>}
                     >
                تعديل البيانات  
             </Button>
         </div>
    </table>)
}
