export default (promise: Promise<any>) => {
  return promise
    .then((res: any) => [null, res])
    .catch((err: Error) => [err, null]);
};
