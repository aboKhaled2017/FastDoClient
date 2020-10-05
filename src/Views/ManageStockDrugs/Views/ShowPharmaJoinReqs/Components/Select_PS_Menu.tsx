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

import { IPagination } from '../../../Interfaces';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: theme.spacing(2),
  },
}));

interface IProps{
    setPageSize:(val:number)=>void 
    pagingData:IPagination
}
export default (props:IProps)=> {
    const classes = useStyles();
    const {pagingData,setPageSize}=props;
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
          setPageSize(val);
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
