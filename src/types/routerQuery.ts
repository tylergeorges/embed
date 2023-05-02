import { ParsedUrlQuery } from 'querystring';

/** Types for next router's query params to get rid of type error. */
export interface RouterQuery extends ParsedUrlQuery {
  /** The current channel's id */
  channel: string;
  /** The current guild's id */
  guild: string;
}
