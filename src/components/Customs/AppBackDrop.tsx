import { withStyles, Backdrop } from '@material-ui/core';
import React from 'react';
const LimitedBackdrop = withStyles({
    root: {
      position: "absolute",
      zIndex: 1
    }
  })(Backdrop);

  export default LimitedBackdrop;