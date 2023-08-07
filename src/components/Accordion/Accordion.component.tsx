import React, { useEffect, useReducer, useRef } from 'react';
import { RiFilter2Fill, RiFilter2Line } from 'react-icons/ri';

export declare interface AccordionProps {
  title?: string;
  show?: boolean;
  children?: React.ReactNode;
}

type State = {
  collapse: boolean;
};

type Action = { type: 'collapse' } | { type: 'show' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'collapse':
      return {
        collapse: !state.collapse,
      };
    case 'show':
      return {
        collapse: true,
      };
    default:
      return {
        collapse: false,
      };
  }
}

const Accordion = ({
  title = 'Accordion Title',
  show = false,
  children,
}: AccordionProps) => {
  const accordionBodyRef = useRef<HTMLDivElement>(null);
  const [{ collapse }, dispatch] = useReducer(reducer, {
    collapse: show,
  });

  const randomId = useRef(
    window.crypto.getRandomValues(new Uint32Array(1))[0]?.toString(36)
  );

  useEffect(() => {
    if (show) dispatch({ type: 'show' });
  }, [show]);

  return (
    <div className='border-b border-b-gray-300'>
      <h2 id={`heading-${randomId.current}`}>
        <button
          className={`flex w-full items-center justify-between py-6 font-inter text-base font-medium text-gray-700 ${
            collapse ? '' : ' collapsed'
          }`}
          type='button'
          aria-expanded={collapse}
          aria-controls={`collapse-${randomId.current}`}
          onClick={() => dispatch({ type: 'collapse' })}
        >
          {title}
          {collapse ? (
            <RiFilter2Fill className='h-5 w-5' aria-hidden='true' />
          ) : (
            <RiFilter2Line className='h-5 w-5' aria-hidden='true' />
          )}
        </button>
      </h2>

      <div
        id={`collapse-${randomId.current}`}
        aria-labelledby={`heading-${randomId.current}`}
        style={
          collapse
            ? {
                height: accordionBodyRef.current?.clientHeight,
                transition: 'height 0.2s ease',
                overflow: 'hidden',
              }
            : {
                height: 0,
                transition: 'height 0.2s ease',
                overflow: 'hidden',
              }
        }
      >
        <div
          className='space-y-6 px-4 pt-2 pb-8 font-inter text-base font-normal text-gray-700'
          ref={accordionBodyRef}
        >
          {children || null}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
