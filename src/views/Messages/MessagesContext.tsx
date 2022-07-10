import {createContext, SetStateAction, useState} from "react";

export const MessagesContext = createContext({
  messages: [],
  setMessages: (_: SetStateAction<any[]>) => {},
});
export function MessagesContextProvider(props: {children: React.ReactNode}) {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={{messages, setMessages}}>
      {props.children}
    </MessagesContext.Provider>
  );
}
