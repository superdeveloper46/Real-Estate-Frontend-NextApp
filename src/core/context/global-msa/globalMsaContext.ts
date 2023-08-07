import { noop } from 'lodash';
import { createContext, useContext } from 'react';

export const DEFAULT_MSA = 'Los Angeles-Long Beach-Anaheim, CA';

const context = createContext<{
  value: string | null;
  change: (value: string | null) => void;
}>({
  value: DEFAULT_MSA,
  change: noop,
});

export const useGlobalMsa = () => useContext(context).value;

export const useGlobalMsaContext = () => useContext(context);

export const GlobalMsaContextProvider = context.Provider;
