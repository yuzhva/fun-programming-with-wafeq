import { APP_META } from './mock-constant';

const initMockPromise = (promisedResponse) => () =>
  new Promise((res) => {
    console.log('processing fetch mock request...');
    setTimeout(() => res(promisedResponse), 5000);
  });

const initPatchPromise = (initialState) => (nextObj) =>
  new Promise((res, rej) => {
    console.log('processing patch mock request...');

    const isValid =
      Object.values(nextObj).filter((value) => Boolean(value)).length ===
      Object.values(nextObj).length;

    const pathObj = initialState.find((invoice) => invoice.id === nextObj.id);

    if (!isValid || !pathObj) {
      const error = {
        isValid,
        id: pathObj?.id,
      };

      setTimeout(() => rej(error), 3000);
    } else {
      const response = {
        ...initialState,
        ...nextObj,
      };

      setTimeout(() => res(response), 3000);
    }
  });

// fetch
export const fetchAppMetaMock = initMockPromise(APP_META);
