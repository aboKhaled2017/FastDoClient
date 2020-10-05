import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownCircleRounded'
import { connect } from 'react-redux';
import {Set_DrugsReq_PageSize} from '../../../../../Redux/Actions/DataActions'
import { IDataState } from '../../../../../Interfaces/States';
import { I_Drug_Pagination } from '../../../../../Interfaces/DrugsTypes';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: theme.spacing(2),
  },
}));
interface IProps{
  Set_DrugsReq_PageSize:(val:number)=>void 
    pagingData:I_Drug_Pagination
}
const  SelectPageSize_Menu=(props:IProps)=> {
    const classes = useStyles();
    const {pagingData,Set_DrugsReq_PageSize}=props;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<any>(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClick = (e:any,val:number=0) => {      
      if (anchorRef.current && anchorRef.current.contains(e.target)) {
        return;
      }
      if(val){
        Set_DrugsReq_PageSize(val);
      }
      setOpen(false);
    };
  
    function handleListKeyDown(e:any) {
      if (e.key === 'Tab') {
        e.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
    return (
      <>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleToggle}
            startIcon={
                <ArrowDropDownIcon color="primary"/>
            }
          >
          حجم الصفحة ({pagingData.pageSize})
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={e=>handleClick(e)}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {[2,4,5,7,9,10,15,20].map(el=>(
                        <MenuItem  onClick={e=>handleClick(e,el)}>{el}</MenuItem>
                    ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
      </>
    );
}
  
export default connect((state:{data:IDataState})=>({
    pagingData:state.data.DrgsReq_I_recieved_Data.pagination
    }),{Set_DrugsReq_PageSize})(SelectPageSize_Menu) as any;