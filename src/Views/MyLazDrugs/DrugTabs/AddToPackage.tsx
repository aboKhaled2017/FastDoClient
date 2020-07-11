import React, { ReactElement, useState, useRef, Fragment } from 'react'
import { ILazDrugModel } from '../../../Interfaces/ModelsTypes'
import { getLzDrugStateFormate, getDrugValidDate, getDrugPriceType, getDrugConsumeType, getDrugDesc, DrugsPackges } from '../../../Commons/Services'
import { makeStyles, Typography, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField, InputProps, Badge, Chip, FormHelperText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditRounded'
import { ISelectInputChange } from '../../../Interfaces/EventTypes';
import AddIcon from '@material-ui/icons/AddRounded'
import RemoveIcon from '@material-ui/icons/CloseRounded' 
import Alert from '@material-ui/lab/Alert';
import { IDrugPackage } from '../../../Interfaces/DataTypes';
const useStyles = makeStyles((theme) => ({
        form:{
            width:'100%',
        },
        textField:{   
            marginTop:'8px',     
            background:'#fff',
            '& .MuiFormLabel-root':{
                fontSize:'1.2rem'
            },
            '& label':{
                color:'#666'
            }
        },
        formControl: {   
            marginTop:'8px', 
            background:'#fff',
            width:'100%',
            minWidth: 120,
        },
        formButton:{
         marginTop:theme.spacing(1)
        },
        formButtonIcon:{
            marginLeft:theme.spacing(1.5)
        },
        inputLabel:{

        },
        menuItem:{},
        packTable:{
            margin:'auto',
            borderCollapse: 'separate',
            borderSpacing:'6px 5px',
            '& tr':{
                '&>td':{
                   background:'#9e190f',
                   padding:'3px 6px',
                   color: '#fff',
                   borderRadius:3,                  
                   '&:first-of-type':{
                    borderRadius: 7,
                    background: '#2d3e50',                
                    display: 'inline-block'
                   }
                },
            }
        },
        chip:{
            height:'auto',
            background:'#fff',
            color:'#000'
        },
        removeIcon:{
            color:'#fff',
            marginLeft:5
        },
        divider:{
            margin:'10px auto'
        }
}));
interface IProps {
    model:ILazDrugModel
}
interface IAddLzDrugToPackage{
    packName:string 
    quantity:number
}
const getAvaialableQuantity=(drugModel:ILazDrugModel,connectedPackgs:IDrugPackage[])=>{
    return drugModel.quantity-connectedPackgs.reduce((prevValue,currentPackg,i)=>{
        let item=currentPackg.items.find(d=>d.id===drugModel.id);
        if(!item)return prevValue;
        return prevValue+item.quantity;
    },0)
}
export default ({model}: IProps)=> {
    const classes=useStyles();
    const [formModel,setFormModel]=useState<IAddLzDrugToPackage>({
        packName:'',
        quantity:'' as any as number
    })
    const [connectdPackgs,setconnectdPackgs]=useState(DrugsPackges.associatedPackages(model.id))
    const [errors,setErrors]=useState<{packName:string|null,quantity:string|null}>({
        packName:null,
        quantity:null
    });
    const [selectedPackgNameToRemoved,setSlectedPackgNameToRemoved]=useState('')
    const [selectedPackg,setSelectedPackg]=useState(DrugsPackges.getPackageByName(''))
    const [openConfirmDialog,setOpenConfirmDialog]=useState(false)
    const [availableQuantity,setAailableQuantity]=useState(getAvaialableQuantity(model,connectdPackgs))
    const ResetForm=()=>{
        setFormModel({
            packName:'',
            quantity:'' as any as number
        })
    }
    const handleDialogeClose = (isAgree:boolean) => {
        setOpenConfirmDialog(false);
    };
    const onConformToRemove=()=>{
        setOpenConfirmDialog(false);
        DrugsPackges.removeDrugFromPackage(selectedPackgNameToRemoved,model.id);
        setconnectdPackgs(prev=>{
            let currentPackgs= DrugsPackges.associatedPackages(model.id)
            setAailableQuantity(getAvaialableQuantity(model,currentPackgs))
            return currentPackgs;
        });
        setSelectedPackg(DrugsPackges.getPackageByName(formModel.packName))
        
    }
    const handleOnAddPackg=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        let {packName,quantity}=formModel;
        packName=packName.trim();
        let hasErrors=false;
        if(!quantity ||quantity<0 ||!Number.isInteger(quantity)){
            errors.quantity="من فضلك ادخل رقم صحيح";
            hasErrors=true;
        }
        if(quantity>availableQuantity){
            errors.quantity=`الكمية لا يجب تتجاوز ${availableQuantity}`;
            hasErrors=true;
        }
        if(!packName){
            errors.packName="من فضلك اختار الباكج/الباقة";
            hasErrors=true;
        }      
        if(hasErrors){
            setErrors({...errors});
            return;
        }
        ResetForm()
        const res=DrugsPackges.addDrugToPackage(packName,model,quantity);
        if(res.done){
            setSelectedPackg(DrugsPackges.getPackageByName(packName))
            setconnectdPackgs(DrugsPackges.associatedPackages(model.id))  
            setAailableQuantity(availableQuantity-quantity) 
        }  
        else{
            alert(res.error)
        }
    }
    const handleChange:ISelectInputChange=(e,child)=>{
        setFormModel(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
        setSelectedPackg(DrugsPackges.getPackageByName(e.target.value as string))
        setErrors(prev=>({...prev,packName:null}))
    }
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.persist();
        setFormModel(prev=>({...prev,[e.target.name as string]: parseInt(e.target.value)}))
        setErrors(prev=>({...prev,quantity:null}))
    }
    const handleOnDrugRemoveFromPackage=(packgName:string)=>{
     setSlectedPackgNameToRemoved(packgName)
     setOpenConfirmDialog(true);
    }
    const myPackages=DrugsPackges.get();
    return (
    <Grid container>
        <Grid item md={4} xs={12}>
            <Box pl={2}>
                {connectdPackgs.length>0&& 
                <Alert variant="outlined" severity="info">
                    {connectdPackgs.map(packg=>
                    <Fragment>
                     <Box>
                         <div>هذا الراكد موجود حاليا فى باكج /{packg.name}</div>
                         <Button variant="contained"
                                onClick={()=>handleOnDrugRemoveFromPackage(packg.name)}
                                startIcon={<RemoveIcon className={classes.removeIcon}/>}
                                color="secondary">ازالة الراكد من هذه الباقة</Button>                        
                     </Box>
                     <Divider variant="middle" className={classes.divider}/>
                    </Fragment>
                    )}
                </Alert>                                   
                }
                <form className={classes.form}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="packNameSelect" 
                                        className={classes.inputLabel}>
                                            اختر نوع الراكد
                            </InputLabel>       
                            <Select
                                error={errors?.packName?true:false}   
                                variant="outlined"                            
                                id="packNameSelect"   
                                name="packName"     
                                disabled={availableQuantity<1?true:false}                                    
                                //open={open}
                                //onClose={handleClose}
                                //onOpen={handleOpen}
                                value={formModel.packName}
                                onChange={handleChange}
                                >
                                {!myPackages.length && 
                                <MenuItem  className={classes.menuItem}  value={''}>لا يوجد لديك اى باكجز مضافة حتى الان</MenuItem>
                                }
                                {myPackages.map((item,i)=>(
                                <MenuItem  className={classes.menuItem} key={i} value={item.name}>{item.name}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error={errors?.packName?true:false} >{errors?.packName}</FormHelperText>
                            {/**<FormHelperText>Required</FormHelperText> */}
                        </FormControl>
                        
                        <TextField 
                        id="quantity"
                        name="quantity"
                        label="الكمية"
                        type="number"
                        variant="outlined"    
                        placeholder={`اقصى  كمية هى ${availableQuantity}`}              
                        className={classes.textField}
                        margin="dense"
                        size="medium"
                        fullWidth
                        disabled={availableQuantity<1?true:false} 
                        inputProps={{min:'1', max:'50'}}
                        helperText={errors?.quantity}
                        error={errors?.quantity?true:false}                       
                        onChange={handleInputChange}
                        value={formModel.quantity}  
                    />
                    <Button 
                                variant="contained" color="primary" 
                                className={classes.formButton} 
                                type="submit"   
                                disabled={availableQuantity<1?true:false}
                                onClick={handleOnAddPackg}                            
                                startIcon={
                                    <AddIcon className={classes.formButtonIcon}/>
                                }> 
                                اضف الى الباكج
                    </Button>
                    </form>
            </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          {selectedPackg &&
          <Box>
              <Typography align="center" variant="h6" color="primary">اضافة الراكد الى باقة  {formModel.packName}</Typography>
              <table className={classes.packTable}>
                  <tbody>
                      <tr>
                          <td>قيمة الباقة</td>
                          <td>{selectedPackg.value}</td>
                      </tr>
                      <tr>
                          <td>عدد الرواكد داخل الباقة حتى الان</td>
                          {selectedPackg.items.length>0
                          ?<td>{selectedPackg.items.length}</td>
                          :<td>لا يتم اضافة اى راكد للباكج من قبل</td>
                          }
                          
                      </tr>
                      <tr>
                          <td>سعر محتوى الباقة الفعلى</td>
                          <td>{selectedPackg.totalPrice}</td>
                      </tr>
                      <tr>
                          <td>الرواكد المضافة</td>
                          <td>
                             <div>
                             {selectedPackg.items.map(p=>(
                                <Chip className={classes.chip} label={p.name}  color="default"/> 
                             ))}
                             </div>
                          </td>
                      </tr>
                      <tr>
                          <td>حالة الباقة</td>
                          {selectedPackg.totalPrice===selectedPackg.value &&
                          <td>مكتملة</td>
                          }
                          {selectedPackg.totalPrice!==selectedPackg.value &&
                          <td>{`لم تكتمل يوجد فرق ${selectedPackg.value-selectedPackg.totalPrice} جنية`}</td>
                          }
                      </tr>
                  </tbody>
              </table>
          </Box>
          }
        </Grid>
        <Dialog
          open={openConfirmDialog}
          onClose={handleDialogeClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              هل انت متأكد من ازلة الراكد من هذه الباكج/الباقة
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{handleDialogeClose(false)}} color="primary">
              لا
            </Button>
            <Button onClick={()=>onConformToRemove()} color="primary" autoFocus>
              نعم
            </Button>
          </DialogActions>
        </Dialog>
    </Grid>
    )
}
