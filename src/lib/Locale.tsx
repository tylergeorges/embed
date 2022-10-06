import { createContext, Dispatch, useContext, useReducer } from "react";
import * as React from "react";
import {authStore, AuthStore} from "../stores/auth";
import {inject} from "mobx-react";

interface Props {
    cache?: { [key: string]: { [key: string]: string; } }
}

export interface LocaleContextState {
    cur: string;
    cache: { [key: string]: { [key: string]: string; } };
}

export const LocaleContext = createContext({});

const reducer = (state: LocaleContextState, action: { type: string; body: any }) => {
    if (action.type === "SET_LOCALE") {
        return { ...state, cur: action.body };
    } else {
        return state;
    }
};

const Init = ({ children, cur, cache }) => {
    const [state, dispatch] = useReducer(reducer, { cur, cache });
    Locale.staticContext = { state, dispatch };
    return <LocaleContext.Provider value={{ state, dispatch }}>{children}</LocaleContext.Provider>;
};

export class Locale extends React.PureComponent<Props, { cache: { [key: string]: { [key: string]: string; } } }> {

    static staticContext: { state: LocaleContextState, dispatch: React.Dispatch<any> };

    constructor(props) {
        super(props);
        this.state = { cache: {} };
    }

    async componentDidMount() {
        // this.setState({
        //     cache: {
        //         en: (await import("../locales/embed/en-US.json")) as any
        //     }
        // });
    }

    static translate(key: keyof typeof import("../locales/embed/en-US.json"), replacements?: { [key: string]: string; }) {
        const { state: { cur, cache } }: any = Locale.staticContext;
        let lang: any = cache[cur], content: string;
        if (!lang) {
            if (cache.en?.[key]) {
                lang = cache.en;
            } else {
                return key;
            }
        }
        if (!lang[key]) return key;
        if (!replacements) return lang[key];
        content = lang[key];
        for (const replace in replacements) {
            const use: any = replacements[replace];
            content = content.replace(new RegExp(`{${replace}}`, "g"), use);
        }
        return content;
    };

    static allKeys(): string[] {
        const { state } = Locale.staticContext;
        return Object.keys(state.cache);
    }

    render() {
        if (Object.keys(this.state.cache).length < 1) return null;
        return <Init cur={authStore.locale} cache={this.state.cache}>{this.props.children}</Init>;
    }
}
