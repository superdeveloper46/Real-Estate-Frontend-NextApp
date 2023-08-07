import React from 'react';
import { useSelector } from 'react-redux';

import SkipTraceContentCollapse from './SkipTraceContentView/SkipTraceContentCollapse';
import SkipTraceContentHeader from './SkipTraceContentView/SkipTraceContentHeader';
import SkipTraceContentTable from './SkipTraceContentView/SkipTraceContentTable';

const SkipTraceView = () => {
  const { selectedDays } = useSelector((state: any) => state.skipTrace);

  return (
    <div className='p-5'>
      <SkipTraceContentHeader />
      {selectedDays === -1 ? (
        <SkipTraceContentCollapse />
      ) : (
        <SkipTraceContentTable />
      )}
    </div>
  );
};

export default SkipTraceView;
