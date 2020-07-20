import React, { ReactElement, useState } from 'react'
import { Theme, withStyles, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip, FormHelperText, Box, Backdrop, CircularProgress } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendOutlined'
import { Get_LiveState_For_AddLzDrug } from '../services';
import { ISelectInputChange } from '../../../Interfaces/EventTypes';
import { IAddNewLzDrg,IAddNewLzDrg_Errors, LzDrg_TypesList, LzDrg_PricesList, LzDrg_UnitTypesList } from '../Interfaces';
import { displayError } from '../../../Helpers/HelperJsxFunctions';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { E_LzDrg_ConsumeType, E_LzDrg_PriceType, E_LzDrg_UnitType, I_Drug_DataModel } from '../../../Interfaces/DrugsTypes';
import {Push_NewllyAddedDrug} from '../../../Redux/Actions/DataActions'
import { connect } from 'react-redux';
interface IProps {
    classes:{[key:string]:any}
    Push_NewllyAddedDrug:(model:I_Drug_DataModel)=>void
}
const styles=(theme:Theme)=>({
    form:{
        marginRight:theme.spacing(3),
        textAlign:'center',
        width:'50%',
        [`${theme.breakpoints.only('sm')}`]:{
            width:'80%',
        },
        [`${theme.breakpoints.down('xs')}`]:{
            width:'95%',
        }
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
    formControl_withError: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,   
        '& .MuiSelect-select.MuiSelect-selectMenu':{
            border:'1px solid red',
        }
    },
    formButton:{
     marginTop:theme.spacing(2)
    },
    formButtonIcon:{
        marginLeft:theme.spacing(1.5)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    customeErros:{
        color:'red',
        fontSize:'0.8rem'
    },
})
const Add_View= (props: IProps): ReactElement=> {
    const {classes}=props;
    const initState={
        name:'',
        consumeType:E_LzDrg_ConsumeType.burning,
        discount:''as any as number,
        price:'' as any   as number,
        quantity:''as any  as number,
        priceType:E_LzDrg_PriceType.newP,
        type:'',
        valideDate:'',
        unitType:E_LzDrg_UnitType.elba,
        desc:''
    }
    const initErrorsState={
        Name:undefined,
        ConsumeType:undefined,
        Discount:undefined,
        Price:undefined,
        Quantity:undefined,
        PriceType:undefined,
        Type:undefined,
        ValideDate:undefined,
        UnitType:undefined,
        Desc:undefined,
        G:undefined
    }
    const [lzDrgModel,setlzDrgModel]=useState<IAddNewLzDrg>({...initState})
    const [errors,setErrors]=useState<IAddNewLzDrg_Errors>({...initErrorsState});
    const [status,setStatus]=useState({
        loading:false,
        OpenAletr:false
    })
    const handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        setStatus(prev=>({...prev,loading:true}));
        let data={...lzDrgModel};
        data.discount=lzDrgModel.discount?lzDrgModel.discount:0;
        data.quantity=lzDrgModel.quantity?lzDrgModel.quantity:0;
        data.price=lzDrgModel.price?lzDrgModel.price:0;
        data.valideDate=lzDrgModel.valideDate?lzDrgModel.valideDate:new Date(0).toLocaleDateString();
        axios.post('/lzdrugs',data)
        .then(res=>{
            props.Push_NewllyAddedDrug(data as any);
            setlzDrgModel(p=>({...initState}));
            setStatus(p=>({...p,loading:false,OpenAletr:true}));
            setErrors({...initErrorsState});
        setTimeout(() => {
            setStatus(p=>({...p,OpenAletr:false}));
        }, 3000);
        })
        .catch(err=>{
        if(!err.response) 
        {
            alert("خطأ فى الاتصال بالسيرفر");
            setStatus(p=>({...p,loading:false}));
            return;
        }
        var errorsResult=err.response.data.errors;
        setErrors({...errorsResult}); 
        setStatus(p=>({...p,loading:false}));
       })
    }
    const handleChange:ISelectInputChange=(e,child)=>{
      setlzDrgModel(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
    }
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.persist();
        setlzDrgModel(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
    }
    return (
        <Box>
            <Backdrop className={classes.backdrop}
                          open={status.OpenAletr} 
                          onClick={e=>setStatus(p=>({...p,OpenAletr:false}))}>
                    <Alert severity="success">
                        لقد تم اضافة الراكد بنجاح
                    </Alert>
            </Backdrop>
            <Backdrop className={classes.backdrop}
                          open={status.loading}>
                    <CircularProgress color="inherit" />
            </Backdrop>
            <Box my={1}>
                {errors.G &&
                    <Alert severity="error">
                     {displayError(errors.G)}
                    </Alert>
                }
            </Box>
           <form className={classes.form}>
               <TextField 
                   id="name"
                   name="name"
                   label="اسم الراكد"
                   type="text"
                   variant="outlined"                                    
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   fullWidth
                   helperText={displayError(errors.Name)}
                   error={errors.Name?true:false}  
                   value={lzDrgModel.name}                     
                   onChange={handleInputChange}
               />
                <FormControl  className={errors.Type?classes.formControl_withError:classes.formControl}>
                    <InputLabel id="ConsumeTypeSelect" 
                                className={classes.inputLabel}>
                                    اختر نوع الراكد
                    </InputLabel>       
                    <Select
                        variant="outlined"
                        id="typeSelect"   
                        name="type"                                         
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={lzDrgModel.type}
                        onChange={handleChange}
                        >
                        {LzDrg_TypesList.map((item,i)=>(
                         <MenuItem  className={classes.menuItem} key={i} value={item.value}>{item.title}</MenuItem>
                        ))}
                    </Select>
                        {errors.Type && <FormHelperText className={classes.customeErros}>{displayError(errors.Type)}</FormHelperText>}
                </FormControl>
                
                <TextField 
                   id="quantity"
                   name="quantity"
                   label="الكمية"
                   type="number"
                   variant="outlined"                  
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   fullWidth
                   helperText={displayError(errors.Quantity)}
                   error={errors.Quantity?true:false}                       
                   onChange={handleInputChange}
                   value={lzDrgModel.quantity}  
               />

                <FormControl className={classes.formControl}>
                    <InputLabel id="UnitTypeSelect" className={classes.inputLabel}>نوع الوحدة (شريط,علبة,كرتونة,كبسولة, ... وحدة اخرى)</InputLabel>       
                    <Select
                        variant="outlined"
                        id="unitTypeSelect"
                        name="unitType"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={lzDrgModel.unitType}
                        onChange={handleChange}
                        >
                        {LzDrg_UnitTypesList.map((item,i)=>(
                         <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                        ))}
                    </Select>
                    {errors.UnitType && <FormHelperText className={classes.customeErros}>{displayError(errors.UnitType)}</FormHelperText>}
                </FormControl>
                     
                <TextField 
                   id="price"
                   name="price"
                   label="سعر الوحدة"
                   type="number"
                   variant="outlined"                  
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   fullWidth
                   helperText={displayError(errors.Price)}
                   error={errors.Price?true:false}                       
                   onChange={handleInputChange}
                   value={lzDrgModel.price}  
                />

                <Chip size="small" 
                      style={{marginTop:2}}
                      label={Get_LiveState_For_AddLzDrug(lzDrgModel)}/>

                <FormControl className={classes.formControl}>
                    <InputLabel id="priceTypeSelect" className={classes.inputLabel}>نوع السعر</InputLabel>       
                    <Select
                        variant="outlined"
                        id="priceTypeSelect"
                        name="priceType"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={lzDrgModel.priceType}
                        onChange={handleChange}
                        >
                        {LzDrg_PricesList.map((item,i)=>(
                         <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                        ))}
                    </Select>
                    {errors.PriceType && <FormHelperText>{displayError(errors.PriceType)}</FormHelperText>}
                </FormControl>
               <TextField 
                   id="valideDate"
                   name="valideDate"
                   label="تاريخ صلاحية الراكد"
                   type="date"
                   variant="outlined"       
                   fullWidth                             
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   onChange={handleInputChange}
                   helperText={errors.ValideDate}
                   error={errors.ValideDate?true:false} 
                   value={lzDrgModel.valideDate}  
               />

               <TextField 
                   id="discount"
                   name="discount"
                   label="نسبة الخصم فى حالة البيع مباشرة دون استبدال"
                   type="number"
                   variant="outlined"                  
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   fullWidth
                   helperText={errors.Discount}
                   error={errors.Discount?true:false}                       
                   onChange={handleInputChange}
                   value={lzDrgModel.discount}  
               />
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="consumeTypeSelect" className={classes.inputLabel}>كيفية استهلاك الراكد</InputLabel>       
                    <Select
                        name="consumeType"
                        variant="outlined"
                        disabled
                        id="selectConsumeType"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={lzDrgModel.consumeType}
                        onChange={handleChange}
                        >
                        <MenuItem value={0}>استبدال جمهور مع جمهور</MenuItem>
                        <MenuItem value={1}>بيع (الحرق بالخصم) </MenuItem>
                    </Select>
                    {errors.ConsumeType && <FormHelperText>{displayError(errors.ConsumeType)}</FormHelperText>}
                </FormControl>
            
               <TextField 
                   id="desc"
                   name="desc"
                   label="عبر عن منتجك بالتفصيل"
                   type="text"
                   rows={5}
                   rowsMax={8}
                   multiline
                   variant="outlined"
                   fullWidth
                   className={classes.textField}
                   margin="dense"                                     
                   size="medium"
                   helperText={errors.Desc}
                   error={errors.Desc?true:false} 
                   onChange={handleInputChange}
                   value={lzDrgModel.desc}  
                   inputProps={{style:{padding:8}}}
               />
               <Button 
                        variant="contained" color="primary" 
                        className={classes.formButton} 
                        type="submit"   
                        onClick={handleSubmit}                            
                        startIcon={
                            <SendIcon className={classes.formButtonIcon}/>
                        }> 
                         ارسال
               </Button>
            </form>
        </Box>
    )
}

export default connect(null, {Push_NewllyAddedDrug})(
     withStyles(styles as any)(Add_View)) as any;
