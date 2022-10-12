import React from 'react';
import { useSubscription } from "@apollo/client";
import { Action, ActionVariables, Chats_getChats_DirectGroupChat } from "@generated";
import ACTION from './Action.graphql';
import { useNavigate, useParams } from "react-router-dom";
import { authStore, generalStore } from "@store";
import { observer } from "mobx-react";

const Actions =  observer(() => {
  const { guild, user } = useParams();
  const navigate = useNavigate();

  useSubscription<Action, ActionVariables>(ACTION, {
    variables: { guild },
    onSubscriptionData({ subscriptionData }) {
      if (!subscriptionData.data) return;

      const data = subscriptionData.data.action;

      switch(data.__typename) {
        case 'JoinMember': {
          if (authStore.userID === data.user.id) { // Current user added
            if (generalStore.chats.find(x => x.id === data.group.id)) return;

            generalStore.chats.unshift(data.group)
          } else { // Other user Added
            const chat = generalStore.chats.find(r => r.id === data.group.id) as Chats_getChats_DirectGroupChat;
            if (!chat || chat.recipients.find(r => r.id === data.user.id)) return;

            chat.recipients.push(data.user);
          }

          break;
        }

        case 'KickMember': {
          if (authStore.userID === data.user.id) { // Current user kicked
            if (data.group.id === user) {
              navigate(`/channels/${generalStore.guild.id}`)
            }

            const newChats = generalStore.chats.filter(r => r.id !== data.group.id);
            generalStore.setChats(newChats);
          } else { // Other user kicked
            const chat = generalStore.chats.find(r => r.id === data.group.id) as Chats_getChats_DirectGroupChat;

            chat.recipients = chat.recipients.filter(r => r.id !== data.user.id);
          }

          break;
        }
      }
    }
  });

  return null;
});

export default Actions;
