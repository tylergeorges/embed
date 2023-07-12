import React from 'react';
import { useAppRouter } from '@hooks/useAppRouter';
import { getEnvVar } from '@util/env';
import { NextPage } from 'next';

const GuildIndex: NextPage = () => {
  const { guildId } = useAppRouter();

  const apiUrl = getEnvVar('CUSTOM_SERVER_ENDPOINT');

  if (apiUrl) {
    return (
      <div>
        <p>Guild - {guildId}</p>

        <p>apiUrl - {apiUrl}</p>
      </div>
    );
  }
  return <div>ERROR - api url returned undefined</div>;
};

export default GuildIndex;
