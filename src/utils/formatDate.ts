export default (date: string | number) => {
  const _date = new Date(date).toLocaleDateString();
  return _date;
};
