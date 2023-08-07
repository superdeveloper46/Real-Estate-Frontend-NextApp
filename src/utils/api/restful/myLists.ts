import { fetchByPOST } from './base';

export const getMyListsByListName = async ({ listId }: { listId: number }) => {
  const data = { listId };

  return fetchByPOST('mylist/getMyListsByName', data);
};

export const getMyLists = async ({
  searchKey,
  sort,
  from,
  size,
}: {
  searchKey: string;
  sort: number;
  from: number;
  size: number;
}) => {
  const data = { searchKey, sort, from, size };

  return fetchByPOST('mylist/getlists', data);
};

export const makeList = async ({
  listName,
  dmi,
  totalCount,
  newCount,
  filters,
  options,
}: {
  listName: string;
  dmi: boolean;
  totalCount: number;
  newCount: number;
  filters: any;
  options: any;
}) => {
  const data = { listName, dmi, totalCount, newCount, filters, options };
  return fetchByPOST('mylist/makelist', data);
};

export const addToList = async ({
  listId,
  propertyId,
}: {
  listId: number;
  propertyId: number;
}) => {
  const data = {
    listId,
    options: {
      _source: [],
      query: {
        bool: {
          must: [
            {
              match: {
                propertyid: propertyId,
              },
            },
          ],
        },
      },
      from: 0,
      size: 10000,
    },
  };

  return fetchByPOST('mylist/addToList', data);
};
