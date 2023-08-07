import { getCookie } from '@/utils/auth/getCookie';

import { fetchByGET, fetchByPOST } from './base';

export const upload = async (formData: any) => {
  const url = `${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/skiptrace/upload`;
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: getCookie().access_token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return { status: 500 };
    });
  return response;
};

export const getCSVData = async ({ fileName }: { fileName: string }) => {
  const data = { fileName };
  return fetchByPOST('skiptrace/getCSVData', data);
};

export const createEpxortFile = async ({
  fileName,
  dest,
}: {
  fileName: string;
  dest: any;
}) => {
  const data = { fileName, dest };
  return fetchByPOST('skiptrace/createExportFile', data);
};

export const addSkiptrace = async ({
  fileName,
  hashName,
  totalRecords,
  totalHits,
  hit,
  matches,
  savings,
  totalCost,
}: {
  fileName: string;
  hashName: string;
  totalRecords: number;
  totalHits: number;
  hit: number;
  matches: number;
  savings: number;
  totalCost: number;
}) => {
  const data = {
    fileName,
    hashName,
    totalRecords,
    totalHits,
    hit,
    matches,
    savings,
    totalCost,
  };
  return fetchByPOST('skiptrace/addSkiptrace', data);
};

export const getSkiptrace = async ({
  from,
  size,
  selectedDays,
}: {
  from: number;
  size: number;
  selectedDays: number;
}) => {
  const data = { from, size, selectedDays };

  return fetchByPOST('skiptrace/getSkiptrace', data);
};

export const downloadOriginFile = async ({ id }: { id: string }) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/skiptrace/downloadOriginFile/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie().access_token,
      },
    }
  );
};

export const downloadExportFile = async ({ id }: { id: string }) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/skiptrace/downloadExportFile/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie().access_token,
      },
    }
  );
};

export const getBalance = async () => {
  return fetchByGET('skiptrace/getBalance');
};
