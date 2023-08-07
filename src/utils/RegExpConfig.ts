/* eslint-disable prefer-regex-literals */
export const strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

export const mediumRegex = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);

export const emailRegex = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$');
