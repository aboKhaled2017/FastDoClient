import { createContext } from 'react';
import { IGViewContext } from './Interfaces.d';

const context = createContext<IGViewContext>({} as any);
export default context;