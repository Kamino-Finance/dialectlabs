import clsx from 'clsx';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import IconButton from '../IconButton';
import { useTheme } from './providers/DialectThemeProvider';

interface ToastMessageProps {
  error?: Error | null;
  message?: string | JSX.Element;
  isSuccess?: boolean;
  onClose?: () => void;
}

function ToastMessage({
  error,
  message,
  isSuccess,
  onClose,
}: ToastMessageProps) {
  const [hide, setHide] = useState(false);
  const { icons, toast, animations } = useTheme();

  let icon = null;
  if (isSuccess) {
    icon = <icons.checkmark className="dt-w-3 dt-h-3" />;
  }
  if (error) {
    icon = <icons.error className="dt-w-3 dt-h-3 dt-text-red-500" />;
  }
  const content = message ? message : error?.message;
  const timeout = 150;

  return (
    <CSSTransition
      in={Boolean(message || error) && !hide}
      classNames={{
        enter: animations.toast.enterFrom,
        enterActive: clsx(animations.toast.enter, animations.toast.enterTo),
        enterDone: clsx(animations.toast.enterTo, 'dt-pointer-events-auto'),
        exit: animations.toast.leaveFrom,
        exitActive: clsx(animations.toast.leave, animations.toast.leaveTo),
        exitDone: clsx(animations.toast.leaveTo, 'dt-pointer-events-none'),
      }}
      timeout={timeout}
    >
      <div
        className={clsx(
          'dt-pointer-events-none dt-flex dt-justify-center dt-fixed dt-bottom-4 dt-left-0 dt-right-0 dt-mx-auto',
          animations.toast.enterFrom
        )}
      >
        <div
          className={clsx(toast, 'dt-flex dt-items-center dt-space-between')}
        >
          <div className="dt-flex dt-items-center dt-space-x-1">
            {icon}
            <span>{content}</span>
          </div>
          {onClose ? (
            <IconButton
              className="dt-text-current dt-ml-4 -dt-mr-2"
              onClick={() => {
                setHide(true);
                setTimeout(() => {
                  onClose();
                  setHide(false);
                }, timeout);
              }}
              icon={<icons.cancel className="dt-w-4 dt-h-4 dt-opacity-60" />}
            />
          ) : null}
        </div>
      </div>
    </CSSTransition>
  );
}

export default ToastMessage;
