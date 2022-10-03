import {
  NotificationContext
} from "@ui/Overlays/Notification/NotificationContext";
import {
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";
import { Notification as INotification } from "@ui/Overlays/Notification/NotificationContext";
import {
  NotificationBase,
  NotificationContentBase,
  NotificationProgressBar, NotificationProgressBarContainer, SlideIn,
  SlideOut,
  slideOutAnimDurationMs
} from "@ui/Overlays/Notification/elements";

interface NotificationProps {
  children: ReactNode;
}

const progressBarIntervalMs = 200;

function Notification(props: NotificationProps) {
  const [queue, setQueue] = useState<INotification[]>([]);
  const notifRef = useRef<INotification | null>(null);
  const queueRef = useRef<INotification[] | null>(null);
  const notifElementRef = useRef(null);
  const [timeToHide, setTimeToHide] = useState(0);
  queueRef.current = queue;
  notifRef.current = queueRef.current[0];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!notifRef.current)
        return;

      const progress = (notifRef.current.shownAt.getTime() + notifRef.current.hideAfter) - Date.now();

      if (progress < 1) {
        const [nextUp, ...rest] = queueRef.current.slice(1);
        setQueue(nextUp ? [{...nextUp, shownAt: new Date()}, ...rest] : []);
      }

      setTimeToHide(progress);
    }, progressBarIntervalMs)

    return () => clearInterval(interval);
  }, [notifRef.current, queue]);

  function spawn(notification: Omit<INotification, "shownAt">) {
    const notif = {...notification, hideAfter: notification.hideAfter + slideOutAnimDurationMs, shownAt: new Date()};

    if (queue.length === 0)
      setTimeToHide(notif.hideAfter);

    setQueue([...queue, notif]);
  }

  function clearKey(key: string) {
    setQueue([...queue.filter(r => r.key !== key)]);
  }

  return (
    <NotificationContext.Provider
      value={{ spawn, clearKey }}
    >
      {Boolean(notifRef.current) && (
        <NotificationBase
          hideAfterMs={notifRef.current.hideAfter}
          ref={notifElementRef}
          className={timeToHide < slideOutAnimDurationMs ? SlideOut.name : SlideIn.name} // TODO[E]: See other TODO
        >
          <NotificationContentBase>
            {notifRef.current.content}
          </NotificationContentBase>
          <NotificationProgressBarContainer>
            <NotificationProgressBar
              style={{
                width: (timeToHide / notifRef.current.hideAfter * 100) + "%"
              }}
            />
          </NotificationProgressBarContainer>
        </NotificationBase>
      )}
      {props.children}
    </NotificationContext.Provider>
  );
}

export default Notification;
