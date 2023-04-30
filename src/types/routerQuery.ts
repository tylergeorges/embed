import { ParsedUrlQuery } from 'querystring';

/** Types for next router's query params to get rid of type error. */
export interface RouterQuery extends ParsedUrlQuery {
  /** The current channels id */
  channel: string;
  /** The current guilds id */
  guild: string;
}
