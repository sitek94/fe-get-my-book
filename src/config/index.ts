import envVars from './env-variables';

const config = {
  ...envVars,
  isProd: envVars.env === 'production',
  isDev: envVars.env === 'development',
};

export default config;
