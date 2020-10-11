import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownCircleRounded'

import { IPagination } from '@/Interfaces/General';

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    marginRight: theme.spacing(2)
  },
}));

type TOptionValue=string|number;

interface IProps<T extends TOptionValue>{
    setSelectedVal:(val:T)=>void 
    pagingData:IPagination
    listItems:T[]
    btnText:string
    style?:React.CSSProperties | undefined
    listItemsMap?:(el:T)=>string
}
function SelectButton<T extends TOptionValue>(props:IProps<T>){
    const classes = useStyles();
    const {pagingData,setSelectedVal,listItems,btnText,style,listItemsMap}=props;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<any>(null);
    const [btnValue,setBtnValue]=React.useState('');
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClick = (e:any,val?:T) => {      
      if (anchorRef.current && anchorRef.current.contains(e.target)) {
        return;
      }

      setSelectedVal(val as T);
      setBtnValue(`(${listItemsMap?listItemsMap(val as T):val})`);

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
            style={style}
            onClick={handleToggle}
            startIcon={
                <ArrowDropDownIcon color="primary"/>
            }
          >
          {`${btnText} ${btnValue}`}
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} 
                  role={undefined} transition 
                  >
            {({ TransitionProps, placement }) => (
              <Grow 
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={e=>handleClick(e)}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {listItems.map(el=>(
                        <MenuItem  onClick={e=>handleClick(e,el)}>{listItemsMap?listItemsMap(el):el}</MenuItem>
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

export default SelectButton;