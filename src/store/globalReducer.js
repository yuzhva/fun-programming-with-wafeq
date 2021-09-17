import { combineReducers } from 'redux';

import { appMetaReducer } from './appMeta';

export default combineReducers({
  appMeta: appMetaReducer,
});
