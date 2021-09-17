import { fetchAppMetaMock } from '../../mock-api';

export const APP_META_ACTION_TYPE = {
  SET: 'appMeta/SET',
};

// Store actions
export const setAppMeta = ({ appMeta }) => ({
  type: APP_META_ACTION_TYPE.SET,
  appMeta,
});

// API actions
export function fetchAppMeta() {
  return (dispatch, getState) => {
    fetchAppMetaMock().then((response) => {
      dispatch(setAppMeta({ appMeta: response }));
    });
  };
}
