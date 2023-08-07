import { useRef } from 'react';

const useLatest = <T>(value: T) => {
  const valueRef = useRef(value);

  valueRef.current = value;

  return valueRef;
};

export default useLatest;
