import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { PageContextProvider } from './usePageContext';
import type { PageContext } from './types';
import { client } from '@/graphql/apollo';

export function PageShell({
  children,
  pageContext
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}
