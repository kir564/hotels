export const getDateFormat = () =>
  new Date().toISOString().substring(0, 16).replace('T', ' ');
