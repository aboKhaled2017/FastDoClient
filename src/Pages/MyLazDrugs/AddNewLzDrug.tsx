import React, { ReactElement, useState } from 'react'
import { Theme, withStyles, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SendIcon from '@material-ui/icons/SendOutlined'
import { ILazDrugModel } from '../../Interfaces/ModelsTypes';
import { LazDrugContractType, LazDrugPriceType, LazDrugUnitType, LazDrugsUnitTypes, LazDrugPricesTypes, LazDrugTypes } from '../../Interfaces/DataTypes';
interface IProps {
    classes:{[key:string]:any}
}
const styles=(theme:Theme)=>({
    form:{
        margin:'auto',
        textAlign:'center',
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
    }
})
const ComboBox=(props:{id:string,className:any,label:string,options:{title:string,value:any}[]})=> {
    return (
        <Autocomplete
            id={props.id}     
            style={{marginTop:'10px'}}                
            options={props.options}
            defaultChecked
            defaultValue={props.options[0]}
            getOptionLabel={(option) => option.title}
            className={props.className}           
            renderInput={(params) => 
               <TextField {...params} 
                          label={props.label} 
                          name={props.id}
                          variant="outlined"/>}
        />
        );
}
export default withStyles(styles as any)((props: IProps): ReactElement=> {
    const {classes}=props;
    const [lzDrugModel,setl]=useState<ILazDrugModel>({
        id:'',
        name:'',
        quntity:0,
        contractType:LazDrugContractType.burning,
        discount:0,
        drugType:'',
        note:'',
        price:0,
        priceType:LazDrugPriceType.new,
        unitType:LazDrugUnitType.elba,
        validDate:null as any as Date
    })
    const [errors,setErrors]=useState<any>({});
     
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
                   //onChange={handleChange}
               />
               <ComboBox
                   id="drugType" 
                   label=""
                   options={LazDrugTypes}
                   className={classes.textField}/>
               <ComboBox
                   id="unitType" 
                   label="نوع الوحدة (شريط,علبة,كرتونة,كبسولة, ... وحدة اخرى)"
                   options={LazDrugsUnitTypes}
                   className={classes.textField}/>

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
                   //onChange={handleChange}
               />
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
                   //onChange={handleChange}
               />
                <ComboBox
                   id="priceType" 
                   label="نوع السعر"
                   options={LazDrugPricesTypes}
                   className={classes.textField}/>

               <TextField 
                   id="validDate"
                   name="validDate"
                   label="تاريخ صلاعية الراكد"
                   type="date"
                   variant="outlined"       
                   fullWidth                             
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   helperText={errors?.validDate}
                   error={errors?.validDate?true:false} 
               />

               <TextField 
                   id="discount"
                   name="discount"
                   label="نسبة الخصم فى حالة لو تريد الحرق/البيع مباشرة"
                   type="number"
                   variant="outlined"                  
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   fullWidth
                   helperText={errors?.discount}
                   error={errors?.discount?true:false}                       
                   //onChange={handleChange}
               />
                
                <FormControl className={classes.formControl}>
                <InputLabel id="contractTypeSelect" className={classes.inputLabel}>كيفية استهلاك الراكد</InputLabel>       
                    <Select
                        variant="outlined"
                        id="selectContracttype"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={0}
                        //onChange={this.handleSelectCityChange}
                        >
                        <MenuItem value={3}>
                        <em>اختر  كيفية الاستهلاك</em>
                        </MenuItem>
                        <MenuItem value={0}>الاستبدال</MenuItem>
                        <MenuItem value={1}>الحرق/البيع</MenuItem>
                    </Select>
                    {/**<FormHelperText>Required</FormHelperText> */}
                </FormControl>
            
               <TextField 
                   id="note"
                   name="note"
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
                   helperText={errors?.note}
                   error={errors?.note?true:false} 
               />
               <Button 
                        variant="contained" color="primary" 
                        className={classes.formButton} 
                        type="submit"                               
                        startIcon={
                            <SendIcon className={classes.formButtonIcon}/>
                        }> 
                         ارسال
               </Button>
            </form>
        </div>
    )
})
