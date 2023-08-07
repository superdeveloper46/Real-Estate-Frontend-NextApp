import { fetchByPOST } from './base';

export const login = async (email: string, password: string) => {
  const data = {
    email,
    password,
  };

  return fetchByPOST('auth/login', data);
};

export const signup = async (email: string, name: string, password: string) => {
  const data = {
    email,
    name,
    password,
  };

  return fetchByPOST('auth/signup', data);
};

export const requestResetPassword = async (email: string) => {
  const data = {
    email,
  };

  return fetchByPOST('auth/request_reset_password', data);
};

export const resetPassword = async (
  password: string,
  token: string | undefined
) => {
  const data = {
    password,
    token,
  };

  return fetchByPOST('auth/reset_password', data);
};

export const authValidate = async (req: any, res: any) => {
  const { cookie } = req.headers;

  if (!cookie) {
    if (req.url.search('auth') === -1) {
      res.writeHead(302, { Location: '/auth/login' });
      res.end();
      return;
    }
    return;
  }

  let realCookie = '';
  cookie.split('; ').forEach((e: any) => {
    if (e.split('=')[0] === 'currentUser') {
      realCookie = e.split('=')[1].toString();
    }
  });

  if (realCookie === '') {
    if (req.url.search('auth') === -1) {
      res.writeHead(302, { Location: '/auth/login' });
      res.end();
      return;
    }
    return;
  }

  const token = JSON.parse(decodeURIComponent(realCookie));

  const url = `${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/auth/validate`;

  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token.refresh_token,
    },
  }).then((response) => {
    if (response.status === 401) {
      if (req.url.search('auth') === -1) {
        res.writeHead(302, { Location: '/auth/login' });
        res.end();
      }
    } else if (req.url.search('auth') !== -1) {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
  });
};
