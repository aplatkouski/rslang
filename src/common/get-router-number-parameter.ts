export default (param: string, defaultValue: number) => {
  return param ? Number.parseInt(param, 10) : defaultValue;
};
