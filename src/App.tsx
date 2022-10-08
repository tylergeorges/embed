import { useState } from 'react';
import { useQuery } from '@apollo/client';
import reactLogo from './assets/react.svg';
import './App.css';
import { graphql } from '@/graphql/generated';
import { getEnvVar } from '@/util/env';

export const test = graphql(/* GraphQL */ `
  query Guild {
    guild(id: "585454996800405509") {
      id
    }
  }
`);

function App() {
  const [count, setCount] = useState(0);

  const { data } = useQuery(test);


  const apiUrl = getEnvVar('CUSTOM_SERVER_ENDPOINT');

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
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
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
