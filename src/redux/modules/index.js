import { combineReducers } from 'redux';
import planetsReducer from './planets';

const rootReducer = combineReducers({
  planets: planetsReducer,
});

export default rootReducer;
