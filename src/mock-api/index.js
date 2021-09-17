const initMockPromise = (promisedResponse) => () =>
  new Promise((res) => {
    setTimeout(() => res(promisedResponse), 2000);
  });

export const fetchAppMetaMock = initMockPromise({
  version: '1.0.0',
});
