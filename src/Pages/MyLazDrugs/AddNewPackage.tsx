import React, { ReactElement, useState } from 'react'
import { Theme, withStyles, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography, Snackbar, Grid, Chip } from '@material-ui/core'
import PlusIcon from '@material-ui/icons/PlusOneRounded'
import { IDrugPagesValues, LazDrugTypes, DrugPagesValuesTypes } from '../../Interfaces/DataTypes'
import { IAddNewPackage } from '../../Interfaces/ModelsTypes'
import { ISelectInputChange } from '../../Interfaces/EventTypes'
import { DrugsPackges } from '../../Commons/Services'
import MuiAlert from '@material-ui/lab/Alert';
interface IProps {
    classes:any
}
const styles=(theme:Theme)=>({
    form:{
        marginRight:theme.spacing(3),
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
    chip:{
        margin:'5px auto'
    }
})
function Alert(props:any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default withStyles(styles as any)(({classes}: IProps)=> {
    const [newPackage,setNewPackage]=useState<IAddNewPackage>({
        name:'',
        packgType:0,
        errors:{}
    });
    const [packages,setPackages]=useState(DrugsPackges.get());
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (e:any, reason:any) => {
        if (reason === 'clickaway') {
        return;
        setOpen(false);
         }
    }
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const {name,packgType,errors}=newPackage;
        let hasErrors=false;
        if(!name ||name.length<2){
            errors.name="الاسم غير صالح";
            hasErrors=true;
        }
        if(!packgType ||packgType==0){
            errors.packgType="من فضلك اختار الباكج/الباقة";
            hasErrors=true;
        }        
        if(hasErrors){
            setNewPackage(prev=>({...prev,errors}));
            return;
        }
        else{
            setNewPackage(prev=>({...prev,name:'',packgType:0,errors:{}}));
        }
        DrugsPackges.addNew(name,packgType);
        setPackages(DrugsPackges.get())
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000);
    }
    const handleChange:ISelectInputChange=(e,child)=>{
      setNewPackage(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
    }
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.persist();
        setNewPackage(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
    }
    const handleChipDelete = () => {
        console.info('You clicked the delete icon.');
      };

    return (
        <Box mt={3}>
            <Grid container>
              <Grid item md={7} xs>
                <Box paddingX={5}>
                    <Alert severity="warning">اسم الباقة  يجب ان يعبر عن ما يحتوية من ادوية وان يعبر عن ما بداخلة</Alert>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField 
                            id="name"
                            name="name"
                            label="اسم الباكج الخاصة بك"
                            type="text"
                            variant="outlined"                                    
                            className={classes.textField}
                            margin="dense"
                            size="medium"
                            fullWidth
                            helperText={newPackage.errors?.name}
                            error={newPackage.errors?.name?true:false}  
                            value={newPackage.name}                     
                            onChange={handleInputChange}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="ConsumeTypeSelect" 
                                        className={classes.inputLabel}>
                                            اختر الباكج/الباقة
                            </InputLabel>       
                            <Select
                                variant="outlined"
                                id="packgTypeSelect"   
                                name="packgType"                                         
                                //open={open}
                                //onClose={handleClose}
                                //onOpen={handleOpen}
                                value={newPackage.packgType}
                                onChange={handleChange}
                                >
                                <MenuItem  className={classes.menuItem}  value={0}>اختر الباكج/الباقة</MenuItem>
                                {DrugPagesValuesTypes.map((item,i)=>(
                                <MenuItem  className={classes.menuItem} key={i} value={item}>{`باقة ${item} جنية`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {newPackage.errors && newPackage.errors.packgType &&
                        <Typography variant="body2" color="secondary">{newPackage.errors.packgType}</Typography>
                        }
                        <Button className={classes.formButton} color="primary"
                                type="submit"
                                startIcon={<PlusIcon color="primary"/>}
                                variant="contained">
                            اضافة باكج/باقة جديدة
                        </Button>
                        </form>
                        <Snackbar open={open} autoHideDuration={400} onClose={handleClose}>
                        <Alert  onClose={handleClose} severity="success">
                        تم اضافة الباكج /الباقة بنجاح
                        </Alert>
                    </Snackbar>
                </Box>
              </Grid>
              <Grid item md={5} xs alignContent="center">
               <Box textAlign="center" mt={2}>
                    <Typography variant="subtitle1" color="primary">كل الباكجز الخاصة بى</Typography>
                    <Box mt={1}>
                    {packages.length==0 && 
                    <Alert severity="info">لايوجد لديك اى باكجز/باقات حتى الان</Alert>
                    }
                    {packages.map((pack,i)=>(
                    <div key={i} className={classes.chip}>
                            <Chip label={pack.name} onDelete={handleChipDelete} color="secondary"/> 
                    </div>
                    
                    ))}                 
                    </Box>
               </Box>
              </Grid>
            </Grid>
        </Box>
    )
})
