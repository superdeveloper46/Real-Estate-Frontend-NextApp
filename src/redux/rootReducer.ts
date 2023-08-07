import { combineReducers } from 'redux';

// eslint-disable-next-line import/no-cycle
import globalReducer from './slices/global';
import listBuilderReducer from './slices/listBuilder';
import myLists from './slices/myLists';
import propertyReducer from './slices/property';
import skipTraceReducer from './slices/skipTrace';

const rootReducer = combineReducers({
  global: globalReducer,
  listBuilder: listBuilderReducer,
  property: propertyReducer,
  skipTrace: skipTraceReducer,
  myLists,
});

export default rootReducer;
