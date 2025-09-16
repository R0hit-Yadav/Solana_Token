import {WalletAdapterNetwork, WalletError} from "@solana/wallet-adapter-base";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider as ReactUIWalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {PhantomWalletAdapter, SolflareWalletAdapter, SolletWalletAdapter,SolletExtensionWalletAdapter,TorusWalletAdapter} from "@solana/wallet-adapter-wallets";
import {Cluster, clusterApiUrl} from "@solana/web3.js";
import React, {FC, ReactNode, useCallback, useMemo} from "react";
import {AutoConnectProvider, useAutoConnect} from './AutoConnectProvider';
import {notify} from "../utils/notifications";
import {NetworkConfigurationProvider, useNetworkConfiguration} from "./NetworkConfigurationProvider";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const { autoConnect } = useAutoConnect();
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;
  const originalEndpoint = useMemo(() => clusterApiUrl(network), [network]);

  let endpoint;

  if (network === "mainnet-beta") {
    endpoint = "https://solana-mainnet.g.alchemy.com/v2/H6YKx_o5-SJZ2-qtYeYDA"
  } else if (network === "devnet") {
    endpoint = originalEndpoint;
  } else {
    endpoint = originalEndpoint;
  }


  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new SolletWalletAdapter(),
      new SolletExtensionWalletAdapter(),
    ],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    notify({
      type: "error",
      message : error.message ? `${error.name}: ${error.message}` : error.name,
    });
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
          <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
