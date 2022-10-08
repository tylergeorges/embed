const VARIABLES: Record<string, [string, string]> = {
  CUSTOM_SERVER_ENDPOINT: ['{{CUSTOM_SERVER_ENDPOINT}}', 's-staging.widgetbot.io']
};

export function getEnvVar(key: string): string | undefined {
  if (!VARIABLES[key]) return;

  const [replaced, defaultValue] = VARIABLES[key];
  if (replaced === `{{${key}}}`) return defaultValue;

  return replaced.substring(2, replaced.length - 2);
}
