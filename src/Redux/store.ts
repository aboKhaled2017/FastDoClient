import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'

import searchDataReducer from './Reducers/searchDataReducer'
import uiReducer from './Reducers/uiReducer'
import userReducer from './Reducers/userReducer'
import dataReducer from './Reducers/DataReducer'

import StocksDataReducer from './Reducers/StocksDataReducer';
import { User } from 'oidc-client';

const initialState={}
const middleware=[thunk]

interface OidcState {
  isLoadingUser: boolean;
  user: User;
}

const reducers=combineReducers({
    data:dataReducer,
    searchData:searchDataReducer,
    user:userReducer,
    UI:uiReducer,
    stockData:StocksDataReducer
})

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store=createStore(reducers,initialState,enhancer);
export default store;            