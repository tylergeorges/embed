import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/tracing';
import pkg from './package.json';

const SENTRY_DSN = 'https://ba886140cbbf46d1b8c5a9c7f6d55267@bugs.widgetbot.io/6';

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  release: pkg.version
});
