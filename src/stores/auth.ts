import { action, computed, observable } from "mobx";
import axios from 'axios';
import * as Sentry from '@sentry/browser';
import { APIRequest, Endpoints } from "../api";
import {API_URL, url} from "@lib/env";
import { ICategory } from "@ui/Sidebar/Channels/categorise";
import { useRouter } from "@hooks";
import CHANNELS from "@ui/Sidebar/Channels/Channels.graphql";
import { addNotification } from 'notify';
import {act} from "react-dom/test-utils";
import {Locale} from "@lib/Locale";
import {generalStore} from "@store/general";
import api from "@lib/embed-api";

interface DiscordUser {
  _id: string;
  username: string;
  avatar: string;
  discriminator: string | null;
  blockedUsers: string[];
}

interface GuestUser {
  avatarUrl: string
  id: string
  provider: 'Guest'
  username: string;
  blockedUsers?: string[];
}

interface GuildUser {
  _id: string
  provider: 'Guild'
  username: string
  avatarUrl: string | null
  blockedUsers?: string[]
}

type User = DiscordUser | GuestUser | GuildUser;

const queryParams = new URLSearchParams(location.search)

const loginError = (msg: string) => addNotification({
  level: 'error',
  title: Locale.translate('notif.login.unsuccessful'),
  message: msg.replace('GraphQL error: ', ''),
  autoDismiss: 0,
});

export class AuthStore {
  @observable token: string;
  @observable locale: string;

  @observable inProgress: boolean = false;
  @observable errors: string | undefined = undefined;
  @observable user: User | null;

  constructor() {
    try {
      this.token = window.localStorage.getItem('token');
      this.locale = window.localStorage.getItem("locale") || "en";
      try {
        this.user = JSON.parse(window.localStorage.getItem('user'));
        Sentry.setUser(this.sentryUser);
      } catch (e) {
        this.logout();
        Sentry.setUser(null);
        generalStore.needsUpdate = true;
      }

      if (!this.token || !this.user) {
        this.logout();
        Sentry.setUser(null);
        generalStore.needsUpdate = true;
        // localStorage.setItem('lastUpdate', version)
      }
    } catch (e) {
      console.log('WidgetBot: localStorage is inaccessible so auth is disabled')
    }
  }

  private get sentryUser() {
    return {
      id: 'id' in this.user ? this.user.id : this.user._id,
      username: this.user.username
    }
  }

  get userID() {
    return this.user && ('id' in this.user && this.user.id || '_id' in this.user && this.user._id)
  }

  get blockedUsers() {
    return this.user?.blockedUsers || [];
  }

  @action setBlockedUsers(blockedUsers: string[]) {
    if (!this.user) return;

    this.user.blockedUsers = blockedUsers;
    window.localStorage.setItem('user', JSON.stringify(this.user));
  }

  @action setLocale(locale: string) {
    const keys = Locale.allKeys();
    if (!keys.includes(locale)) return; // Temp fix
    window.localStorage.setItem("locale", locale);
    this.locale = locale;
  }

  @action async fetchDiscordUser() {
    const { data } = await APIRequest(Endpoints.auth.fetchLatestProfile);

    window.localStorage.setItem('user', JSON.stringify(data));
    this.user = data;
    Sentry.setUser(this.sentryUser);

    api.emit('signIn', data)

    return data;
  }

  @action logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');

    this.user = undefined;
    this.token = undefined;

    Sentry.setUser(null);
  }

  @action discordLogin() {
    return new Promise<void>((resolve, reject) => {
      this.inProgress = true;
      this.errors = undefined;

      const x: number = screen.width / 2 - 840 / 2;
      const y: number = screen.height / 2 - 700 / 2;

      const newWindow = window.open(`${API_URL}${Endpoints.auth.discord.split(' ')[1]}`, 'Login to WidgetBot with Discord!', `menubar=no,width=905,height=752,location=no,resizable=no,scrollbars=yes,status=no,left=${x},top=${y}`);

      const timer = setInterval(() => {
        if ((newWindow as Window).closed) {
          cleanup();
          this.inProgress = false;
          reject('Window was closed during authentication');
        }
      }, 500);

      const receiveMessage = ({ data, source }: MessageEvent) => {
        source = source as Window;

        switch (data.type) {
          case 'AUTH_SUCCESS': {
            source.close();
            if (!data.token) {
              this.inProgress = false;
              return reject(new Error('No token given in response'));
            }

            localStorage.setItem('token', data.token);

            this.token = data.token;
            this.inProgress = false;
            return resolve();
          }
          case 'AUTH_FAIL': {
            source.close();
            cleanup();
            console.log(data.error);
            return reject(new Error(data.error))
            // return reject(loginError("You pressed cancel on the authentication window"));
          }
        }
      };
      window.addEventListener('message', receiveMessage);

      const cleanup = () =>  {
        clearInterval(timer);
        window.removeEventListener('message', receiveMessage);
      }
    })
  }

  @action guestLogin(username: string) {
    return new Promise<void>(async (resolve, reject) => {
      this.inProgress = true;
      this.errors = undefined;

      const { data } = await APIRequest(Endpoints.auth.guest, { payload: {
        username,
        avatar: queryParams.get('avatar')
      } }).catch(error => error.response)

      switch (data.type) {
        case 'AUTH_SUCCESS': {
          if (!data.token) {
            this.inProgress = false;
            return reject(new Error('No token given in response'));
          }

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          this.token = data.token;
          this.user = data.user;
          this.inProgress = false;
          Sentry.setUser(this.sentryUser);

          api.emit('signIn', data.user)

          return resolve();
        }
        case 'AUTH_ERROR': {
          loginError(data.message)
          return reject(new Error(data.message))
        }
      }
    })
  }

  @action guildLogin(guild: string, token: string) {
    return new Promise<void>(async (resolve, reject) => {
      this.inProgress = true;
      this.errors = undefined;

      const { data } = await APIRequest(Endpoints.auth.guild, {
        payload: {
          guild, token
        }
      }).catch(error => error.response)

      switch (data.type) {
        case 'AUTH_SUCCESS': {
          if (!data.token) {
            this.inProgress = false;
            return reject(new Error('No token given in response'));
          }

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          this.token = data.token;
          this.user = data.user;
          this.inProgress = false;
          Sentry.setUser(this.sentryUser);

          api.emit('signIn', data.user)

          return resolve();
        }
        case 'AUTH_ERROR': {
          loginError(data.message)
          return reject(new Error(data.message));
        }
      }
    })
  }
}

export const authStore = new AuthStore();
