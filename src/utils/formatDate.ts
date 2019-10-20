export default (date: string | number) => {
  if (!date) return;
  const _date = new Date(date).toLocaleDateString();
  console.log(date);
  console.log(_date);
  return _date;
};
