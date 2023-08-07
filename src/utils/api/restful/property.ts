import { getCookie } from '@/utils/auth/getCookie';

import { fetchByGET, fetchByPOST } from './base';

// get property overview data
export const getOverviewData = async (propertyId: string) => {
  const url = `search/property/overview/${propertyId}`;
  return fetchByGET(url);
};

// get property property data
export const getPropertyData = async (propertyId: string) => {
  const url = `search/property/property/${propertyId}`;
  return fetchByGET(url);
};

// get property current mortgages data
export const getCurrentMortgagesData = async (propertyId: string) => {
  const url = `search/property/current-mortgages/${propertyId}`;
  return fetchByGET(url);
};

// get property mortgage & transaction history data
export const getTransactionAndMortgageHistoryData = async (
  propertyId: string
) => {
  const url = `search/property/transaction_mortgage-history/${propertyId}`;
  return fetchByGET(url);
};

// get property owner demographics data
export const getOwnerDemographicsData = async (propertyId: string) => {
  const url = `search/property/owner-demographics/${propertyId}`;
  return fetchByGET(url);
};

// Notes
export const addNote = async ({
  propertyId,
  note,
  archived,
}: {
  propertyId: string;
  note: string;
  archived: boolean;
}) => {
  const data = { propertyId, note, archived };
  return fetchByPOST('property/addNote', data);
};

export const editNote = async ({
  id,
  note,
  archived,
}: {
  id: string;
  note: string;
  archived: boolean;
}) => {
  const data = { id, note, archived };
  return fetchByPOST('property/editNote', data);
};

export const getNotes = async ({
  propertyId,
  createAt,
  archived,
}: {
  propertyId: string;
  createAt: string;
  archived: boolean;
}) => {
  const data = { propertyId, createAt, archived };

  return fetchByPOST('property/getnotes', data);
};

export const deleteNote = async ({ id }: { id: string }) => {
  const data = { id };
  return fetchByPOST('property/deletenote', data);
};

export const archiveNote = async ({
  id,
  archived,
}: {
  id: string;
  archived: boolean;
}) => {
  const data = { id, archived };
  return fetchByPOST('property/archivenote', data);
};

// Files & Photos
export const addFiles = async (formData: any) => {
  const url = `${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/property/addFiles`;
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

export const getFiles = async ({
  propertyId,
  searchKey,
  type,
}: {
  propertyId: string;
  searchKey: string;
  type: string;
}) => {
  const data = { propertyId, searchKey, type };

  return fetchByPOST('property/getfiles', data);
};

export const deleteFile = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const data = { id, type };
  return fetchByPOST('property/deletefile', data);
};

export const downloadFile = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/property/downloadFile/${id}/${type}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie().access_token,
      },
    }
  );
};
