import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownCircleRounded'
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => createStyles({
  paper: {
    marginRight: theme.spacing(2),
    zIndex:2
  },
}));

 
interface IProps<T>{
    setSelectedVal:(val:T)=>void 
    listItems:T[]
    btnText:string
    style?:React.CSSProperties | undefined
    listItemsMap?:(el:T)=>string
    hasEdit?:boolean
    defaulttext?:string
    loading?:boolean
}
function SelectButton<T>(props:IProps<T>){
    const classes = useStyles();
    const {setSelectedVal,listItems,btnText,style,listItemsMap,hasEdit,defaulttext,loading}=props;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<any>(null);   
    const [btnValue,setBtnValue]=React.useState(defaulttext?defaulttext:'');
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClick = (e:any,val?:T) => {      
  
      if (anchorRef.current && anchorRef.current.contains(e.target)) {
        return;
      }
      if(typeof val==="number" || val){
        if(!hasEdit)
        setBtnValue(`(${listItemsMap?listItemsMap(val as T):val})`);     
        setSelectedVal(val as T);       
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
            style={style}
            onClick={handleToggle}
            startIcon={
              loading ?<CircularProgress size={15} color="inherit"/>
                      :<ArrowDropDownIcon color="primary"/>
            }
          >
          {`${btnText} ${btnValue}`}
          </Button>
          <Popper open={open} 
                  anchorEl={anchorRef.current} 
                  role={undefined} transition 
                  className={classes.paper}
                  >
            {({ TransitionProps, placement }) => (
              <Grow 
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={e=>handleClick(e)}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {listItems.map((el,i)=>(
                        <MenuItem key={i}  onClick={e=>handleClick(e,el)}>{listItemsMap?listItemsMap(el):el}</MenuItem>
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