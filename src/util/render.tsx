import dynamic from 'next/dynamic';
import React from 'react';
import { getEnvVar } from './env';

const Wrapper = (props: { children: React.ReactNode }) => <>{props.children}</>;

const url = getEnvVar('CUSTOM_SERVER_ENDPOINT');
const isCustom = url !== 's-staging.widgetbot.io';

export default dynamic(() => Promise.resolve(Wrapper), {
  ssr: isCustom
});
