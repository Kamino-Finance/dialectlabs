import { ThreadMessage, useNotificationThreadMessages } from '@dialectlabs/react-sdk';
import { PropsWithChildren, useEffect } from 'react';
import { NoNotifications } from './NoNotifications';
import { NotificationsList } from './NotificationsList';
import { NotificationsLoading } from './NotificationsLoading';

export const NotificationsFeed = ({
  children,
  isEmpty,
  isLoading,
}: PropsWithChildren<{ isLoading: boolean; isEmpty: boolean }>) => {
  if (isLoading) {
    return <NotificationsLoading />;
  }

  if (isEmpty) {
    return <NoNotifications />;
  }

  return children;
};

NotificationsFeed.Container = function NotificationsFeeContainer({
  renderMessage,
}: {
  renderMessage?: (message: ThreadMessage, index: number) => JSX.Element;
}) {
  const { messages, isMessagesLoading, markAsRead } =
    useNotificationThreadMessages();

  useEffect(() => {
    if (messages.length > 0) {
      markAsRead();
    }
  }, [messages.length, markAsRead]);

  return (
    <NotificationsFeed
      isEmpty={messages.length === 0}
      isLoading={isMessagesLoading}
    >
      <NotificationsList.Container messages={messages} renderMessage={renderMessage} />
    </NotificationsFeed>
  );
};
