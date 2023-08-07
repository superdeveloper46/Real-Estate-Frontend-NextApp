import type { GridHeaderFilterCellProps } from '@mui/x-data-grid-pro';
import {
  DataGridPro,
  gridFilterModelSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-pro';
import React from 'react';

const TablePanel = (props: { data: any }) => {
  const getDefaultFilter = (field: string) => ({ field, operator: 'contains' });

  const Filter = (propsFilter: GridHeaderFilterCellProps) => {
    const { colDef } = propsFilter;
    const apiRef = useGridApiContext();
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
    const currentFieldFilters = React.useMemo(
      () => filterModel.items?.filter(({ field }) => field === colDef.field),
      [colDef.field, filterModel.items]
    );

    const handleChange = React.useCallback(
      (event: any) => {
        if (!event.target.value) {
          if (currentFieldFilters[0]) {
            apiRef.current.deleteFilterItem(currentFieldFilters[0]);
          }
          return;
        }
        apiRef.current.upsertFilterItem({
          ...(currentFieldFilters[0] || getDefaultFilter(colDef.field)),
          value: event.target.value,
        });
      },
      [apiRef, colDef.field, currentFieldFilters]
    );

    return (
      <input
        className='h-[30px] w-full border text-sfra-gray-600 outline-none'
        type='text'
        onChange={handleChange}
      />
    );
  };

  const columns = [
    {
      field: 'property_type',
      headerName: 'TYPE',
      width: 130,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
    {
      field: 'situsfullstreetaddress',
      headerName: 'ADDRESS',
      width: 250,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
    {
      field: 'situscity',
      headerName: 'CITY',
      width: 250,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
    {
      field: 'sumbuildingsqft',
      headerName: 'SQFT',
      width: 150,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
    {
      field: 'bedrooms',
      headerName: 'BEDS',
      width: 150,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
    {
      field: 'bathtotalcalc',
      headerName: 'BATHS',
      width: 150,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
    {
      field: 'currentavmvalue',
      headerName: 'EST VALUE',
      width: 250,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
    {
      field: 'equity',
      headerName: 'EST EQUITY',
      width: 250,
      renderHeaderFilter: (params: GridHeaderFilterCellProps) => (
        <Filter {...params} />
      ),
    },
  ];

  return (
    <div className='px-3'>
      <DataGridPro
        loading={props?.data.length === 0}
        rowHeight={30}
        checkboxSelection
        rows={props?.data}
        columns={columns}
        disableColumnFilter
        unstable_headerFilters
        slots={{
          headerFilterMenu: null,
        }}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        columnHeaderHeight={40}
      />
    </div>
  );
};

export default TablePanel;
