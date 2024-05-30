import { ThreadMessage } from '@dialectlabs/react-sdk';
import { ReactNode, useMemo } from 'react';
import { NotificationMessage } from './NotificationMessage';
import {
  NotificationsItemsContext,
  NotificationsItemsProviderValue,
} from './context';

export const NotificationsList = ({ children }: { children?: ReactNode }) => {
  return <div className="dt-flex dt-flex-col">{children}</div>;
};

NotificationsList.Container = function NotificationListContainer({
  messages,
  renderMessage,
}: {
  messages: ThreadMessage[];
  renderMessage?: (message: ThreadMessage, index: number) => JSX.Element;
}) {
  // potentially move to useSWR, since messages will change on every new fetch
  const context: NotificationsItemsProviderValue = useMemo(() => {
    return {
      list: messages.map((it) => it.id),
      map: Object.fromEntries(messages.map((it) => [it.id, it])),
    };
  }, [messages]);

  return (
    <NotificationsItemsContext.Provider value={context}>
      <NotificationsList>
        {messages.map((it, index) => (
          <NotificationMessage.Container key={it.id} id={it.id} index={index} renderMessage={renderMessage} />
        ))}
      </NotificationsList>
    </NotificationsItemsContext.Provider>
  );
};
