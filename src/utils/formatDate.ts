export default (date: string | number) => {
  if (!date) return;
  const _date = new Date(date).toLocaleDateString();
  return _date;
};
