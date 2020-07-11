import React, { ReactElement, useState, ChangeEvent } from 'react'
import { Theme, withStyles, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendOutlined'
import { ILazDrugModel } from '../../Interfaces/ModelsTypes';
import { LazDrugConsumeType, LazDrugPriceType, LazDrugUnitType, LazDrugsUnitTypes, LazDrugPricesTypes, LazDrugTypes } from '../../Interfaces/DataTypes';
import { getLzDrugStateFormate } from '../../Commons/Services';
import { ISelectInputChange } from '../../Interfaces/EventTypes';
interface IProps {
    classes:{[key:string]:any}
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
    formButton:{
     marginTop:theme.spacing(2)
    },
    formButtonIcon:{
        marginLeft:theme.spacing(1.5)
    },
    
})
export default withStyles(styles as any)((props: IProps): ReactElement=> {
    const {classes}=props;
    const [lzDrugModel,setLzDrugModel]=useState<ILazDrugModel>({
        id:'',
        name:'',
        quantity:0,
        consumeType:LazDrugConsumeType.burning,
        discount:0,
        type:'اقراص',
        desc:'',
        price:0,
        priceType:LazDrugPriceType.new,
        unitType:LazDrugUnitType.elba,
        validDate:null as any as Date
    })
    const [errors,setErrors]=useState<any>({});
    const handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        alert('added')
    }
    const handleChange:ISelectInputChange=(e,child)=>{
      setLzDrugModel(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
    }
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.persist();
        setLzDrugModel(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
    }
    return (
        <div>
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
                   helperText={errors?.name}
                   error={errors?.name?true:false}  
                   value={lzDrugModel.name}                     
                   onChange={handleInputChange}
               />
                <FormControl className={classes.formControl}>
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
                        value={lzDrugModel.type}
                        onChange={handleChange}
                        >
                        {LazDrugTypes.map((item,i)=>(
                         <MenuItem  className={classes.menuItem} key={i} value={item.value}>{item.title}</MenuItem>
                        ))}
                    </Select>
                    {/**<FormHelperText>Required</FormHelperText> */}
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
                   helperText={errors?.quantity}
                   error={errors?.quantity?true:false}                       
                   onChange={handleInputChange}
                   value={lzDrugModel.quantity}  
               />

                <FormControl className={classes.formControl}>
                    <InputLabel id="ConsumeTypeSelect" className={classes.inputLabel}>نوع الوحدة (شريط,علبة,كرتونة,كبسولة, ... وحدة اخرى)</InputLabel>       
                    <Select
                        variant="outlined"
                        id="unitTypeSelect"
                        name="unitType"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={lzDrugModel.unitType}
                        onChange={handleChange}
                        >
                        {LazDrugsUnitTypes.map((item,i)=>(
                         <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                        ))}
                    </Select>
                    {/**<FormHelperText>Required</FormHelperText> */}
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
                   helperText={errors?.price}
                   error={errors?.price?true:false}                       
                   onChange={handleInputChange}
                   value={lzDrugModel.price}  
                />

                <Chip size="small" 
                      style={{marginTop:2}}
                      label={getLzDrugStateFormate(lzDrugModel)}/>

                <FormControl className={classes.formControl}>
                    <InputLabel id="priceTypeSelect" className={classes.inputLabel}>نوع السعر</InputLabel>       
                    <Select
                        variant="outlined"
                        id="priceTypeSelect"
                        name="priceType"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={lzDrugModel.priceType}
                        onChange={handleChange}
                        >
                        {LazDrugPricesTypes.map((item,i)=>(
                         <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                        ))}
                    </Select>
                    {/**<FormHelperText>Required</FormHelperText> */}
                </FormControl>
               <TextField 
                   id="validDate"
                   name="validDate"
                   label="تاريخ صلاحية الراكد"
                   type="date"
                   variant="outlined"       
                   fullWidth                             
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   helperText={errors?.validDate}
                   error={errors?.validDate?true:false} 
                   value={lzDrugModel.validDate}  
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
                   helperText={errors?.discount}
                   error={errors?.discount?true:false}                       
                   onChange={handleInputChange}
                   value={lzDrugModel.discount}  
               />
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="consumeTypeSelect" className={classes.inputLabel}>كيفية استهلاك الراكد</InputLabel>       
                    <Select
                        name="consumeType"
                        variant="outlined"
                        id="selectConsumeType"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={lzDrugModel.consumeType}
                        onChange={handleChange}
                        >
                        <MenuItem value={0}>استبدال جمهور مع جمهور</MenuItem>
                        <MenuItem value={1}>بيع (الحرق بالخصم) </MenuItem>
                    </Select>
                    {/**<FormHelperText>Required</FormHelperText> */}
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
                   helperText={errors?.desc}
                   error={errors?.desc?true:false} 
                   onChange={handleInputChange}
                   value={lzDrugModel.desc}  
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
        </div>
    )
})
