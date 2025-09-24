import {useLocalStorage} from '@solana/wallet-adapter-react'
import { createContext,FC, ReactNode, useContext } from 'react';

export interface NetworkConfigurationContextState {
   networkConfiguration: string;
   setNetworkConfiguration: (networkConfiguration: string) => void;
}

export const NetworkConfigurationContext = createContext<NetworkConfigurationContextState>({} as NetworkConfigurationContextState);

export function useNetworkConfiguration(): NetworkConfigurationContextState {
  return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [networkConfiguration, setNetworkConfiguration] = useLocalStorage('networkConfiguration', 'devnet');
  return (
    <NetworkConfigurationContext.Provider value={{ networkConfiguration, setNetworkConfiguration }}>
      {children}
    </NetworkConfigurationContext.Provider>
  );
};