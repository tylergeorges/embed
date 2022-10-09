import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { graphql } from '@/graphql/generated';
import { getEnvVar } from '@/util/env';
import { usePageContext } from '@/renderer/usePageContext';

export const test = graphql(/* GraphQL */ `
  query Guild {
    guild(id: "585454996800405509") {
      id
    }
  }
`);

export function Page() {
  const [count, setCount] = useState(0);
  const pageContext = usePageContext();

  console.log(pageContext);

  const { data } = useQuery(test);

  const apiUrl = getEnvVar('CUSTOM_SERVER_ENDPOINT');

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          vite logo deyer
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          react logo deyer
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>{data?.guild.id ?? 'NO ID'}</h1>
      <h1>{apiUrl ?? 'no api url'}</h1>
      <div className="card">
        <button type="button" onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/IndexPage.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}
