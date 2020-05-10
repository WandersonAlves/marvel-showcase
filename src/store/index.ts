import { combineReducers, createStore } from 'redux';
import editedHeroesReducer from './hero-detail/reducer';
import heroesReducer from './heroes-list/reducer';

const reducers = combineReducers({
  heroes: heroesReducer,
  editedHeroes: editedHeroesReducer
});

// @ts-ignore
export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
