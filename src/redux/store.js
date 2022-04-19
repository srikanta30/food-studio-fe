import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as userReducer } from './user/reducer';
import { reducer as restaurantReducer } from './restaurant/reducer';


const rootReducer = combineReducers({
    user: userReducer,
    restaurant: restaurantReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;