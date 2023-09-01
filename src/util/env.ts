/*
 * This file is for runtime variables which are set on the Docker container and replaced on boot.
 * To add a new variable, add a key with an array value of ['{{KEY}}', 'default value']
 * KEY **MUST** be the same as the actual object key.
 */
const VARIABLES: Record<string, [string, string]> = {
  CUSTOM_SERVER_ENDPOINT: ['{{CUSTOM_SERVER_ENDPOINT}}', 's-e.widgetbot.io']
};

export function getEnvVar(key: string): string | undefined {
  if (!VARIABLES[key]) return;

  const [replaced, defaultValue] = VARIABLES[key];
  if (replaced === `{{${key}}}`) return defaultValue;

  return replaced.substring(2, replaced.length - 2);
}
