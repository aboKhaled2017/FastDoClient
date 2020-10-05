import { IPharmasStockClass } from "@/Interfaces/AccountTypes";
import { setUserIdentity } from "@/Redux/Actions/userActions";
import store from "@/Redux/store";
import axios from 'axios';
interface IHandlePharmaClassDelete{
    deleteDescision:{
        isAgreed: boolean;
        madeDescision: boolean;
        replacedClass: IPharmasStockClass;
    }
    setErrors: React.Dispatch<React.SetStateAction<{
        replaceClassId?: string[] | undefined;
        G?: string | undefined;
    }>>
    setDeleteDescision: React.Dispatch<React.SetStateAction<{
        isAgreed: boolean;
        madeDescision: boolean;
        replacedClass: IPharmasStockClass;
    }>>
    selectedClass: IPharmasStockClass
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setOpenDeleteDialoge: React.Dispatch<React.SetStateAction<boolean>>
    setOpenAlter: React.Dispatch<React.SetStateAction<boolean>>
}

const handlePharmaClassDelete=(props:IHandlePharmaClassDelete)=>{
    const {deleteDescision,setErrors,selectedClass,setLoading,
           setOpenDeleteDialoge,setOpenAlter,setDeleteDescision}=props;
    if(!deleteDescision.replacedClass){
        setErrors(p=>({...p,ReplaceClassId:["من فضلك اختر التصنيف البديل"]}))
        return;
      }
      if(deleteDescision.madeDescision&&deleteDescision.isAgreed){
        const body={
          deletedClassId:selectedClass.id,
          replaceClassId:selectedClass.count==0
          ?""
          :deleteDescision.replacedClass.id
        }
        setLoading(true);
         axios.delete(`stk/phclasses`,{data:body})
        .then(res=>{  
          setOpenDeleteDialoge(false);
          setOpenAlter(true);
            setTimeout(() => {
              setOpenAlter(false);
              store.dispatch(setUserIdentity(res.data) as any); 
            }, 3000);        
            setErrors({} as any);  
            setDeleteDescision({
              isAgreed:false,
              madeDescision:false,
              replacedClass:null as any as IPharmasStockClass
            });                   
        })
        .catch(err=>{
        if(err.status==404){
          //Stop_Loading_Data();
          alert('لا يمكن حذف هذا العنصر'); 
            return;
        }
        if(!err.response) 
        {
            alert("خطأ فى الاتصال بالسيرفر");
            return;
        }
        setDeleteDescision(p=>({...p,isAgreed:false,madeDescision:false}))
        setErrors({...err.response.data.errors});
       })
       .finally(()=>{
            setLoading(false);
       })
       }
}
const handlePharmaClassRemname=()=>{

}
const handlePharmaClassAdd=()=>{

}
export {
handlePharmaClassDelete,
handlePharmaClassRemname,
handlePharmaClassAdd
}