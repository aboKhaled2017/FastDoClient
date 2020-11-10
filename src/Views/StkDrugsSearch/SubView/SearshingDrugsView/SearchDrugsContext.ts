import { createContext } from 'react';
import { ISearchDrugsContext } from '../../Interfaces.d';

const context = createContext<ISearchDrugsContext>({} as any);
export default context;