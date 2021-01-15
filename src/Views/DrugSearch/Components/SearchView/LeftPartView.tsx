import { Box } from '@material-ui/core';
import React from 'react';
import {SearchFilterInp,AddressFilterInp,DateFilterInp} from '../FiltersControls'
interface ILeftPartViewProps {}

const LeftPartView: React.FC<ILeftPartViewProps> = () => {
  return (
    <Box m={'2px 8px'}>
        <Box>
        <SearchFilterInp/>
        </Box>
        <Box mt={3}>
        <AddressFilterInp/>
        </Box>
        <Box mt={5} display="none">
        <DateFilterInp/>
        </Box>
    </Box>
  );
};

export default LeftPartView;
