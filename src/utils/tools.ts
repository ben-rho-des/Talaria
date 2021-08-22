export const safeGet = (func: any, fallbackValue: any = null) => {
  try {
    const value = func();
    return value === null || value === undefined ? fallbackValue : value;
  } catch (e) {
    return fallbackValue;
  }
};
