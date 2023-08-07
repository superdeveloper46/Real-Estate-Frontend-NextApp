import React from 'react';
import { useSelector } from 'react-redux';

import StepContentDataMapping from './SkipTraceContentStep/StepContentDataMapping';
import StepContentEmpty from './SkipTraceContentStep/StepContentEmpty';
import StepContentFinish from './SkipTraceContentStep/StepContentFinish';
import StepContentUpload from './SkipTraceContentStep/StepContentUpload';

const STEPS = [
  {
    number: 1,
    title: 'Upload Your File',
    component: <StepContentUpload />,
  },
  {
    number: 2,
    title: 'Data Mapping',
    component: <StepContentDataMapping />,
  },
  {
    number: 3,
    title: 'Finish and Input',
    component: <StepContentFinish />,
  },
];

const SkipTraceImport = () => {
  const { importStep } = useSelector((state: any) => state.skipTrace);
  return (
    <div className='flex justify-between gap-3 px-5 py-4'>
      {STEPS.map((step, index) => (
        <div
          key={index}
          className={`space-y-3 ${
            step.number === importStep ? 'w-[calc(100vw-190px)]' : 'w-[64px]'
          }`}
          style={{
            transition: 'width 0.5s ease',
          }}
        >
          <div
            className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-[10px] ${
              step.number === importStep ? 'bg-white' : 'bg-[#E2E3EC]'
            }`}
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-sfra-blue-100 text-white'>
              {step.number}
            </div>
            {step.number === importStep ? (
              <span className='font-montserrat text-base font-medium'>
                {step.title}
              </span>
            ) : null}
          </div>
          {step.number === importStep ? step.component : <StepContentEmpty />}
        </div>
      ))}
    </div>
  );
};

export default SkipTraceImport;
