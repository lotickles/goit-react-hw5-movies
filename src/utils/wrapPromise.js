export default function wrapPromise(promise) {
  let status = 'pending';
  let response;
  promise.then(
    res => {
      status = 'success';
      response = res;
    },
    err => {
      status = 'error';
      response = err;
    }
  );

  return () => {
    switch (status) {
      case 'pending':
        throw promise;
      case 'error':
        throw response;
      default:
        return response;
    }
  };
}
