import { APP_META_ACTION_TYPE } from './appMetaActions';

const APP_META_INITIAL_STATE = {
  version: null,
};

export default function appMetaReducer(state = APP_META_INITIAL_STATE, action) {
  switch (action.type) {
    case APP_META_ACTION_TYPE.SET:
      return {
        ...action.appMeta,
      };
    default:
      return state;
  }
}
