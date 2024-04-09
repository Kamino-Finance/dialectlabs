import type {
  BlockchainSdk,
  BlockchainSdkFactory,
  ConfigProps,
} from '@dialectlabs/sdk';
import React from 'react';
import { LocalMessages } from './LocalMessages';
import { DialectSdk } from './Sdk';

interface DialectContextValue {
  dappAddress: string;
}

export const DialectContext = React.createContext<DialectContextValue>(
  {} as DialectContextValue,
);

export type DialectContextProviderProps<ChainSdk extends BlockchainSdk> = {
  dappAddress: string;
  config?: ConfigProps;
  blockchainSdkFactory?: BlockchainSdkFactory<ChainSdk> | null;
  // gate?: Gate;
  children: React.ReactNode;
};

export const DialectContextProvider: React.FC<
  DialectContextProviderProps<BlockchainSdk>
> = ({ config, blockchainSdkFactory, children, dappAddress }) => {
  return (
    <DialectContext.Provider value={{ dappAddress }}>
      <DialectSdk.Provider initialState={{ config, blockchainSdkFactory }}>
        {/* <DialectGate.Provider initialState={gate}> */}
        <LocalMessages.Provider>{children}</LocalMessages.Provider>
        {/* </DialectGate.Provider> */}
      </DialectSdk.Provider>
    </DialectContext.Provider>
  );
};
