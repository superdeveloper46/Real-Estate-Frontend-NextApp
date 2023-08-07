import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { DEFAULT_MSA, GlobalMsaContextProvider } from './globalMsaContext';

interface GlobalMsaProviderProps {
  children: ReactNode;
}

const GlobalMsaProvider = ({ children }: GlobalMsaProviderProps) => {
  const [selectedMsa, setSelectedMsa] = useState<string | null>(DEFAULT_MSA);

  const contextValue = useMemo(
    () => ({
      value: selectedMsa,
      change: setSelectedMsa,
    }),
    [selectedMsa]
  );

  return (
    <GlobalMsaContextProvider value={contextValue}>
      {children}
    </GlobalMsaContextProvider>
  );
};

export default GlobalMsaProvider;
