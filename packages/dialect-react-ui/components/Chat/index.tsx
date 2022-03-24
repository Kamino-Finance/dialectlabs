import React, { useCallback, useEffect, useState } from 'react';
import { useDialect } from '@dialectlabs/react';
import { Centered, Divider, Footer } from '../common';
import { useTheme } from '../common/ThemeProvider';
import cs from '../../utils/classNames';
import MessagePreview from './MessagePreview';
import CreateThread from './CreateThread';
import Header from './Header';
import Thread from './Thread';
import ThreadSettings from './ThreadSettings';

export default function Chat(): JSX.Element {
  const {
    disconnectedFromChain,
    isWalletConnected,
    dialectAddress,
    dialects,
    setDialectAddress,
  } = useDialect();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isNoSubscriptions, setIsNoSubscriptions] = useState(false);

  useEffect(() => {
    setSubscriptions(dialects || []);
    setIsNoSubscriptions(dialects.length < 1);
  }, [dialects]);

  const toggleCreate = useCallback(
    () => setCreateOpen(!isCreateOpen),
    [isCreateOpen, setCreateOpen]
  );

  const toggleSettings = useCallback(
    () => setSettingsOpen(!isSettingsOpen),
    [isSettingsOpen, setSettingsOpen]
  );

  const { colors, modal, icons } = useTheme();

  let content: JSX.Element;

  if (disconnectedFromChain) {
    content = (
      <Centered>
        <icons.offline className="dt-w-10 dt-mb-6 dt-opacity-60" />
        <span className="dt-opacity-60">
          Lost connection to Solana dt-blockchain
        </span>
      </Centered>
    );
  } else if (!isWalletConnected) {
    content = (
      <Centered>
        <icons.notConnected className="dt-mb-6 dt-opacity-60" />
        <span className="dt-opacity-60">Wallet not connected</span>
      </Centered>
    );
  } else if (isCreateOpen) {
    content = <CreateThread toggleCreate={toggleCreate} />;
  } else if (isSettingsOpen) {
    content = <ThreadSettings toggleSettings={toggleSettings} />;
  } else if (isNoSubscriptions) {
    content = (
      <Centered>
        <span className="dt-opacity-60">No messages yet</span>
      </Centered>
    );
  } else if (dialectAddress) {
    content = <Thread />;
  } else {
    content = (
      <div className="dt-flex dt-flex-col dt-space-y-2">
        {subscriptions.map((subscription: any) => (
          <MessagePreview
            key={subscription.publicKey.toBase58()}
            dialect={subscription}
            onClick={() => {
              console.log(
                'setting dialect address',
                subscription.publicKey.toBase58()
              );
              setDialectAddress(subscription.publicKey.toBase58());
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="dialect dt-h-full">
      <div
        className={cs(
          'dt-flex dt-flex-col dt-h-full dt-shadow-md dt-overflow-hidden',
          colors.primary,
          colors.bg,
          modal
        )}
      >
        <Header
          isReady={isWalletConnected}
          isCreateOpen={isCreateOpen}
          toggleCreate={toggleCreate}
          isSettingsOpen={isSettingsOpen}
          toggleSettings={toggleSettings}
        />
        <Divider className="dt-mx-2" />
        <div className="dt-h-full dt-py-2 dt-px-4 dt-overflow-y-scroll">
          {content}
        </div>
        <Footer
          showBackground={Boolean(dialects?.length && dialects?.length > 4)}
        />
      </div>
    </div>
  );
}
