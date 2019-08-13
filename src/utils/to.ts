export default (promise: Promise<Object>) => {
  return promise.then((res: Object) => [null ,res]).catch((err: Error) => [err, null] )
}