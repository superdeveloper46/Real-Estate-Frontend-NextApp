import { fetchByPOST } from './base';

export const changePassword = async (currentPass: string, newPass: string) => {
  const data = {
    currentPass,
    newPass,
  };

  return fetchByPOST('profile/changePass', data);
};

export const changeMyInfo = async (
  email: string,
  fullName: string,
  phone1: string,
  phone2: string,
  city: string,
  state: string,
  zipCode: string,
  timeZone: string,
  picture: string
) => {
  const data = {
    email,
    fullName,
    phone1,
    phone2,
    city,
    state,
    zipCode,
    timeZone,
    picture,
  };

  return fetchByPOST('profile/updateMyInfo', data);
};

export const getMyInfo = async () => {
  return fetchByPOST('profile/getMyInfo', {});
};
