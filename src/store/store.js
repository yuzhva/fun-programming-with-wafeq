import { configureStore } from '@reduxjs/toolkit';

import { appMetaReducer } from './appMeta';

const store = configureStore({
  reducer: {
    appMeta: appMetaReducer,
  },
});

export default store;
