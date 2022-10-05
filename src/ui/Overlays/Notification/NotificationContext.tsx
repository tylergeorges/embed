import {createContext, ReactNode} from "react";

export interface Notification {
  key: string;
  shownAt: Date;
  hideAfter?: number;
  content: ReactNode;
}



interface NotificationCtx {
  spawn: (notification: Omit<Notification, "shownAt">) => void;
  clearKey: (key: string) => void;
}

export const NotificationContext = createContext<NotificationCtx | null>(null);
