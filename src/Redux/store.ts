import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'

import searchDataReducer from './Reducers/searchDataReducer'
import uiReducer from './Reducers/uiReducer'

const initialState={}
const middleware=[thunk]

const reducers=combineReducers({
    searchData:searchDataReducer,
    UI:uiReducer
})

const store=createStore(reducers,initialState,compose(
            applyMiddleware(...middleware)
             
            ));

export default store;            