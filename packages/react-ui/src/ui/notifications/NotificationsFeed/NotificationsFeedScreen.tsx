import { ThreadMessage } from '@dialectlabs/react-sdk';
import { NotificationsFeed } from './NotificationsFeed';
import { NotificationsFeedHeader } from './NotificationsFeedHeader';

export const NotificationsFeedScreen = ({
  renderMessage,
}: {
  renderMessage?: (message: ThreadMessage, index: number) => JSX.Element;
}) => {
  return (
    <div className="dt-flex dt-h-full dt-flex-col">
      <NotificationsFeedHeader />
      <section className="dt-h-full dt-overflow-y-auto">
        <NotificationsFeed.Container renderMessage={renderMessage} />
      </section>
    </div>
  );
};
