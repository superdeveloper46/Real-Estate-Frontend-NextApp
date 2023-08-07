import Cookies from 'js-cookie';

export const getCookie = () => {
  return JSON.parse(
    Cookies.get('currentUser') ??
      '{"access_token": "", "refresh_token": "", "email": "", "userName": ""}'
  );
};
