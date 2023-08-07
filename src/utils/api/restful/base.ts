import Router from 'next/router';

const headers = {
  'Content-Type': 'application/json',
};

let token: string | null = null;

export const getToken = async (): Promise<string> => {
  const response = await fetch('/api/auth/token', {
    credentials: 'same-origin',
  });
  const { token: newToken } = await response.json();

  return newToken;
};

const doFetch = async <T>(fetcher: () => Promise<Response>) => {
  let response = await fetcher();

  if (response.status === 401) {
    token = await getToken();
    response = await fetcher();

    if (response.status === 401) {
      Router.replace('/api/auth/login');
    }
  }

  return response.json() as Promise<T>;
};

export const fetchByPOST = (
  subApiEndpoint: string,
  data: any,
  host: string = String(process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL)
) =>
  doFetch<any>(() => {
    const url = `${host}/${subApiEndpoint}`;

    return fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        ...{ Authorization: `Bearer ${token}` },
      },
      body: JSON.stringify(data),
    });
  });

export const fetchByGET = (
  subApiEndpoint: string,
  host: string = String(process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL)
) =>
  doFetch<any>(() => {
    const url = `${host}/${subApiEndpoint}`;

    return fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
        ...{ Authorization: `Bearer ${token}` },
      },
      mode: 'cors',
    });
  });

export const setAuthorizationToken = (newToken: string | null) => {
  token = newToken;
};
