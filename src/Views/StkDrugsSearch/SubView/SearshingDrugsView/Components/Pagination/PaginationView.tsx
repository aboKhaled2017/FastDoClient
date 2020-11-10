import   React from 'react'
import { connect } from 'react-redux'
import { makeStyles, Theme, createStyles, Box} from '@material-ui/core'
import { IPagination } from '@/Interfaces/General';
import { IPharmasStockClass, IStockUser } from '@/Interfaces/AccountTypes';
import { IUserState } from '@/Interfaces/States';
import { IStockGData } from '@/Interfaces/ModelsTypes';
import { PgFirstComponent,PgSecondComponent,PgThirdComponent} from './Components';



const useStyles=makeStyles((theme:Theme)=>createStyles({
    pagination:{
      margin:theme.spacing(2,1)
    },
    searchInp: {   
        '& .MuiOutlinedInput-root input':{
            padding: 10
        }
    },
}));
interface IProps { }
const PV= (props:IProps&{pharmasClasses:IPharmasStockClass[]})=>{
    const classes=useStyles();
     
    
    return (<Box className={classes.pagination}  display="flex">
                <Box>
                    <PgFirstComponent/>
                </Box>
                <Box mx={2}>
                    <PgSecondComponent/>
                </Box>
                <Box mr={1} alignSelf="center">
                    <PgThirdComponent/>
                </Box>
            </Box>
    )
}

export default connect((state:{user:IUserState})=>({
    pharmasClasses:(state.user.userIdentity.user as IStockUser).pharmasClasses
}),{})(PV as (props:IProps)=>JSX.Element)

