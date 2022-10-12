import {GRAPHQL_URL, url} from "@lib/env";
import {authStore} from '@store';
import {ApolloLink} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {BatchHttpLink} from "@apollo/client/link/batch-http";

const httpLink = ApolloLink.from([
	onError(({graphQLErrors, networkError}) => {
		if (graphQLErrors)
			graphQLErrors.map(({message, locations, path}) =>
				message === 'Please logout and login again.' ?
					authStore.logout()
					:
					console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
			);
		if (networkError) console.error(`[Network error]: ${networkError}`)
	}),
	new BatchHttpLink({
		uri: GRAPHQL_URL,
		batchInterval: 20,
		batchMax: 1
	})
].filter(Boolean) as any);

export default httpLink
