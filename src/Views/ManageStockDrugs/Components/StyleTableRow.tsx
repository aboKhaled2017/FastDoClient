import { withStyles, Theme, createStyles, TableRow } from "@material-ui/core";

const StyledTableRow = withStyles((theme: Theme) =>createStyles({
    root: {
      background:'rgba(0, 0, 0, 0.04)',
      '&:nth-of-type(4n+3)': {
        backgroundColor:'#647484',
        '&> td,> th':{
          color:'#fff',
          '&> button':{
            color:'#fff'
          }
        }
      },
    }
}),
)(TableRow);

export default StyledTableRow;