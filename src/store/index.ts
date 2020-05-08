import { combineReducers, createStore } from 'redux';
import heroesReducer from './heroes-list/reducer';

const reducers = combineReducers({
  heroes: heroesReducer,
});

// @ts-ignore
export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
